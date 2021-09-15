const Ajv = require('ajv')
const ajv = new Ajv()
const addFormats = require("ajv-formats")
const usuarioSchema = require('../src/schemas/usuario.schema')

addFormats(ajv)

function validarUsuario(req, res, next) {
  const usuario = req.body
  const validate = ajv.compile(usuarioSchema)
  const valid = validate(usuario)
  if (valid) {
    next()
  } else {
    res.status(400).json({ msg: "Dados inválidos", erros: validate.errors })
  }
}

module.exports = validarUsuario