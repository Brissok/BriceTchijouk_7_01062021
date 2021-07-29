const fs = require('fs');
const { sequelize, Post, User, Comment } = require('../models');

//Permet de créer un commentaire
exports.createComment = (req, res, next) => {
    var regex = /^[^<>@&"()_$*€£`+=\/;?#]+$/;
    const commentObject = req.body;
    //On vérifie l'input avec le regex pour éviter les injections de code
    if (commentObject.text.match(regex)) {
      //on crée un nouveau Comment et on l'enregistre dans la base de donnée
        const comment = new Comment({
          ...commentObject
        });
        comment.save()
          .then(() => res.status(201).json({ message: 'Com enregistré !'}))
          .catch(error => res.status(400).json({ error }));
    } else {
        res.status(400).json({ error: 'Incorrect !' });
    }
};

//Permet de supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then(comment => {
          comment.destroy({ where: { id: req.params.id } })
              .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
              .catch(error => res.status(400).json({ error }));
      });
};