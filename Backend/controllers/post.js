const fs = require('fs');
const { sequelize, Post } = require('../models');

exports.createPost = (req, res, next) => {
    var regex = /^[^<>@&"()_$*€£`+=\/;?#]+$/;
        const post = new Post({
          title: req.body.title,
          content: req.body.content,
          UserId: req.body.UserId
        });
        post.likes = 0;
        post.save()
          .then(() => res.status(201).json({ message: 'Message enregistré !'}))
          .catch(error => res.status(400).json({ error }));
  
  };

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};