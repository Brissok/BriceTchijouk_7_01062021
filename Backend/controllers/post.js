const fs = require('fs');
const { sequelize, Post, User, Comment } = require('../models');

//Permet de créer un post
exports.createPost = (req, res, next) => {
    var regex = /^[^<>@&"()_$*€£`+=\/;?#]+$/;
    const postObject = JSON.parse(req.body.post);
        const post = new Post({
          ...postObject,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        post.save()
          .then(() => res.status(201).json({ message: 'Message enregistré !'}))
          .catch(error => res.status(400).json({ error }));
  
  };

//Permet de récupérer tous les posts
exports.getAllPosts = (req, res, next) => {
    Post.findAll({ 
      //On inclue les prénoms et noms des users qui ont créé les posts
      include: [
        { model: User, attributes: ['firstName', 'lastName'] },
        //On inclue les commentaires correspondants à chaque post
        { model: Comment,
          separate: true,
          //On inclue les prénoms et noms des users qui ont créé les commentaires classés du plus récent au plus vieux
          include: [ { model: User, attributes: ['firstName', 'lastName'] } ],
          order: [ [ 'createdAt', 'DESC' ] ]
        }
      ],
      //On classe les posts du plus récent au plus vieux
      order: [[ 'createdAt', 'DESC']]
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

//Permet de récupérer un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id },
    //On inclue le prénom et nom du user qui a créé le post et les commentaires avec les prénoms et noms des users qui les ont créé
    include: [
      { model: User, attributes: ['firstName', 'lastName'] },
      { model: Comment, 
          include: 
        { model: User, attributes: ['firstName', 'lastName'] } 
      }
    ],
    order : [[ Comment, 'createdAt', 'DESC']],
  })
  .then(post => res.status(200).json(post))
  .catch(error => res.status(404).json({ error }));
};

//Permet de modifier un post
exports.modifyPost = (req, res, next) => {
  var regex = /^[^<>@&"()_$*€£`+=\/;?#]+$/;
  const postObject = req.file ?
  {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  if (postObject.title.match(regex) && 
    postObject.content.match(regex)) {
      Post.findOne({ where: { id: req.params.id } })
      .then(post => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
        post.update({
          title: postObject.title,
          content: postObject.content,
          imageUrl: postObject.imageUrl
        })
        .then(() => res.status(200).json({ message: 'Message modifié !'}))
        .catch(error => res.status(400).json({ error }));
        });
      })
    } else {
      console.log('Wrong...!');
      res.status(400).json({ error: 'Incorrect !' });
    }
};

//Permet de supprimer un post
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
      .then(post => {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Post.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Message supprimé !'}))
                .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};