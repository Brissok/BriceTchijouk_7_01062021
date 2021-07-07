const fs = require('fs');
const { sequelize, Post, User, Comment } = require('../models');

exports.createComment = (req, res, next) => {
    var regex = /^[^<>@&"()_$*€£`+=\/;?#]+$/;
    const commentObject = req.body;
        const comment = new Comment({
          ...commentObject
        });
        comment.save()
          .then(() => res.status(201).json({ message: 'Com enregistré !'}))
          .catch(error => res.status(400).json({ error }));
  
};