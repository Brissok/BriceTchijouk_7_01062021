require('dotenv').config({ path: '../config/.env' });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize, User } = require('../models');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

exports.signup = async (req, res, next) => {
    var emailRegex = /[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})/;
    var pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if(req.body.email.match(emailRegex)) {
        if(req.body.password.match(pwdRegex)) {
            // si les inputs correspondent aux regex, on hash le mot de passe et on crée le user
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    fonction: req.body.fonction,
                    email: req.body.email,
                    password: hash,
                    isAdmin: false
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        } else {
            res.status(404).json({ message: 'Le mot de passe doit contenir entre 8 et 15 caractères avec au moins un chiffre, une majuscule, une minuscule et un caractère spécial !' });
        }
    }
    else {
        res.status(404).json({ message: "L'email est invalide !" });
    }
};

exports.login = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if(user === null) {
        return res.status(401).json({ message: 'Utilisateur non trouvé !' });
    } else {
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ message: 'Mot de passe incorrect !' });
            }
			// on crée un token et on l'enregistre dans le localstorage
			const token = jwt.sign(
                { userId: user.id },
                process.env.TOKEN_KEY,
                { expiresIn: '24h' }
            );
            localStorage.setItem("token", token);
            localStorage.setItem("user", user.id);
            // on renvoi l'id user et le token
			res.status(200).send({
				userId: user.id,
                token: token
			});
        })
        .catch(error => res.status(500).json({ error }));
    }
};

exports.logout = (req, res, next) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    res.status(200).json({ message: "Déconnection réussie !" });
}

exports.getOneUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.modifyUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }})
        .then(user => {
            user.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                fonction: req.body.fonction
            })
            .then(() => res.status(200).json({ message: 'Profil modifié !'}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
}

exports.deleteUser = (req, res, next) => {
    User.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(400).json({ error }));
}