const express = require("express");
const app = express();
const cors = require("cors");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.use(express.json());
app.use(cors());

app.post("/cadastro", async (req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;

    const novoUsuario = await prisma.usuarios.create({
        data: {
            email: email,
            senha: senha
        }
    })
    res.json(novoUsuario);
});

app.get("/todos", async (req, res) => {
    const verTodos = await prisma.usuarios.findMany()
    res.json(verTodos);
});

app.post("/unico", async (req, res) => {
    const verUm = await prisma.usuarios.findUnique({
        where: {
            email: req.body.email
        }
    })
    const naoCadastrado = "Usuário não cadastrado!"
    if(verUm === null) {
        res.json(naoCadastrado)
    } else {
        res.json(verUm)
    }
})

app.delete("/deletar", async (req, res) => {
    const deletarUm = await prisma.usuarios.delete({
        where: {
            email: req.body.email
        }
    })
    res.json(deletarUm);
})

app.listen(8000, () => {
    console.log("Escutando!")
});