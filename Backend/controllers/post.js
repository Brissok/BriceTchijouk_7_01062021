const fs = require('fs');
const { sequelize, Post } = require('../models');

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

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then(posts => {
          let reversed = posts.reverse();
          res.status(200).json(reversed);
        })
        .catch(error => res.status(400).json({ error }));
};