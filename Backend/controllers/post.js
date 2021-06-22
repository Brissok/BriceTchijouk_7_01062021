const fs = require('fs');
const { sequelize, Post } = require('../models');

exports.createPost = (req, res, next) => {
    var regex = /^[^<>@&"()_$*€£`+=\/;?#]+$/;
    if(req.body.title.match(regex) && req.body.content.match(regex)) {
        const post = new Post({
          title: req.body.title,
          content: req.body.content,
        });
        post.likes = 0;
        post.save()
          .then(() => res.status(201).json({ message: 'Message enregistré !'}))
          .catch(error => res.status(400).json({ error }));
    } else {
      res.status(400).json({ error: 'Incorrect !' });
    }
  
  };

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};