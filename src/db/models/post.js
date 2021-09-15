'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      Post.belongsTo(models.Usuario, { foreignKey: 'userId' })
    }

  };
  Post.init({
    titulo: DataTypes.STRING,
    texto: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};