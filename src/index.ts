import express, { Request, Response } from "express"

import cors from 'cors'
import { clientes } from "./data"

const app = express()

app.use(express.json())

app.use(cors())

// listando todos os  usuário:
app.get("/users",(req:Request, res:Response)=>{
     clientes.map((user)=>{
        return user
     })
     res.status(200).send(clientes)
})

// criando um novo usuário:
app.post("/users", (req: Request, res: Response)=>{
    const {nome, cpf, nascimento,saldo} = req.body
    
    if(!nome && !cpf && !nascimento && !saldo){
        return res.status(422).send("Insira todos os parâmetros necessários: Nome, CPF, Data de Nascimento e Saldo.")
    }else if (!nome){
        return res.status(422).send("Insira o nome do usuário")
    }else if (!cpf){
        return res.status(422).send("Insira o cpf do usuário")
    }else if (!nascimento){
        return res.status(422).send("Insira o nascimento do usuário")
    }
    
    const cpfValido= clientes.find((cliente)=>{
        return cliente.cpf === cpf
    })
    
    
    if(cpfValido){
        return res.status(400).send("CPF já está sendo utilizado em outra conta.")
    }   
    
    let novoCliente = {
        nome, cpf, nascimento, saldo
    }
    
    clientes.push(novoCliente)
    res.status(201).send(clientes)








})


app.listen(3003, () => {
    console.log("Servidor rodando na porta http://localhost:3003");
});