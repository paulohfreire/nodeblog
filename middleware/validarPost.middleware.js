const Ajv = require('ajv')
const ajv = new Ajv()
const postSchema = require('../src/schemas/post.schema')

function validarPost(req, res, next) {
  const post = req.body
  if (post.userId) {
    post.userId = Number(post.userId)
  }
  const validate = ajv.compile(postSchema)
  const valid = validate(post)
  if (valid) {
    next()
  } else {
    res.status(400).json({ msg: "Postagem incompleta ou incorreta.", erros: validate.errors })
  }
}

module.exports = validarPost