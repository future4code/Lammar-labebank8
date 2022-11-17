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
    const {nome, cpf, nascimento} = req.body
    
    let arrayNascimento=nascimento.split("/")
    let anoNascimento = arrayNascimento[2]
    let idade = 2022 - anoNascimento
    
    if(!nome && !cpf && !nascimento){
        return res.status(422).send("Insira todos os parâmetros necessários: Nome, CPF, Data de Nascimento e Saldo.")
    }else if (!nome){
        return res.status(422).send("Insira o nome do usuário")
    }else if (!cpf){
        return res.status(422).send("Insira o cpf do usuário")
    }else if (!nascimento){
        return res.status(422).send("Insira o nascimento do usuário")
    }else if(idade < 18){
        return res.status(400).send("O usuário precisa ter mais de 18 anos para criar o cadastro.")
    }
    
    const cpfValido= clientes.find((cliente)=>{
        return cliente.cpf === cpf
    })
    
    if(cpfValido){
        return res.status(400).send("CPF já está sendo utilizado em outra conta.")
    }
    
    let novoCliente = {
        nome, cpf, nascimento, saldo:0, extrato:[]
    }
    
    clientes.push(novoCliente)
    res.status(201).send(clientes)
    
})

// Verificando o saldo.
app.get('/saldo/:cpf/:nome', (req: Request, res: Response)=>{

    const cpfUsuario = req.params.cpf
    const nomeUsuario = req.params.nome

    console.log(req.params)

    const pesquisarUsuario = clientes.find((user)=>{
        return user.cpf === cpfUsuario && user.nome === nomeUsuario 
    })

    if(!pesquisarUsuario){
        return res.status(404).send("Usuário não encontrado")
    }

    res.status(200).send({saldo: pesquisarUsuario.saldo})
})

// Adicionar saldo:
app.put('/saldo/:cpf/:nome', (req: Request, res: Response)=>{

    let errorCode = 400

    try {
        const cpfUsuario = req.params.cpf
        const nomeUsuario = req.params.nome
        const {valorAdicionado} = req.body

        const pesquisarUsuario = clientes.find((user)=>{
            return user.cpf === cpfUsuario && user.nome === nomeUsuario 
        })

        if(!pesquisarUsuario){
            errorCode = 422
            throw new Error("Usuário não encontrado");
        }

        if (typeof valorAdicionado !== "number") {
            errorCode = 422
            throw new Error("O valor a ser adicionado deve ser do tipo number!");
        }

        if ( valorAdicionado <= 0) {
            errorCode = 422
            throw new Error("O valor a ser adicionado deve ser maior que zero!");
        }

        res.status(201).send({saldo: pesquisarUsuario.saldo += valorAdicionado})
    
    } catch (err: any) {
        res.status(errorCode).send(err.message)
    }
})

app.listen(3003, () => {
    console.log("Servidor rodando na porta http://localhost:3003");
});

