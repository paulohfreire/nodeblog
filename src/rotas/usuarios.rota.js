const express = require('express')
const router = express.Router()
const validarUsuario = require('../../middleware/validarUsuario.middleware')
const { Usuario } = require('../db/models/usuario')
const jwt = require("jsonwebtoken");


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

router.post("/login", async (req, res) => {

  const email = req.body.email;
  const senha = req.body.senha;

  const usuario = await Usuario.findOne({
    where: {
      email: email,
    },
  });

  if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
    const payload = {
      sub: usuario.id,
      iss: "imd-backend",
      aud: "imd-frontend",
      email: usuario.email,
    };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '40s' })
    res.json({ accessToken: token })
  } else {
    res.status(403).json({ msg: "usuário ou senha inválidos" })
  }
});

router.post("/", async (req, res) => {
  const senha = req.body.senha;
  const salt = await bcrypt.genSalt(10);
  const senhaCriptografada = await bcrypt.hash(senha, salt);
  const usuario = { email: req.body.email, senha: senhaCriptografada };
  const usuarioObj = await Usuario.create(usuario);
  res.json({ msg: "Usuário adicionado com sucesso!", userId: usuarioObj.id });
});

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

router.delete('/', async(req, res) => {
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