const Post = require('../models/Post');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.newPost = (req, res, next) => {
    console.log(typeof Post); 
    console.log(Post === sequelize.models.Post); // true 
    const post = Post.create({ name: 'idUnique', text: 'Texte de base' });
    console.log(post);
    console.log("post's auto-generated ID:", post.id);
};