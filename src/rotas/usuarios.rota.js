const express = require('express')
const router = express.Router()
const validarUsuario = require('../middleware/validarUsuario.middleware')
const { Usuario } = require('../src/db/models/usuario')

const usuarios = {}

router.post('/', validarUsuario)
router.put('/', validarUsuario)

router.get('/', async (req, res) => {
  const usuarios = await Usuario.findAll()
  res.json({ usuarios: usuarios })
})

router.get('/:id', async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id)
  if (usuario) {
    res.json({ usuario: usuario })
  } else {
    res.status(400).json({ msg: "Usuário não encontrado!" })
  }
})

router.post('/', async (req, res) => {
  const usuario = await Usuario.create(req.body)
  res.json({ msg: "Usuário adicionado com sucesso!", userId: usuario.id })
})

router.put('/', async (req, res) => {
  const id = req.query.id
  const usuario = await Usuario.findByPk(id)
  if (usuario) {
    usuario.email = req.body.email
    usuario.senha = req.body.senha
    await usuario.save()
    res.json({ msg: "Usuário atualizado com sucesso!" })
  } else {
    res.status(400).json({ msg: "Usuário não encontrado!" })
  }
})

router.delete('/', (req, res) => {
  const id = req.query.id
  const usuario = await Usuario.findByPk(id)

  if (usuario) {
    try {
      await usuario.destroy()
      res.json({ msg: "Usuário deletado com sucesso!" })
    } catch (error) {
      res.status(500).json({ msg: "Falha ao remover usuário" })
    }
  } else {
    res.status(400).json({ msg: "Usuário não encontrado!" })
  }

})

module.exports = router