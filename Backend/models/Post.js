'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      // definition des associations
      models.Post.hasMany(models.Comment, { onDelete: 'CASCADE' });
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        }, onDelete: 'CASCADE'
      })
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    likes: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};