import express, { Request, Response } from "express"

import cors from 'cors'
import { clientes } from "./data"
import { Transacao} from "./type"

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


// Realizando pagameto
app.post("/clientes/:cpf/pagamento", (req: Request, res: Response) => {
    
    let errorCode = 400
    try {

        const cpf = req.params.cpf
        const {valor, descricao} = req.body
        let {data} = req.body

        if (!data) {
            errorCode = 400
            throw new Error("Data passada não confere!")
        }

        const [dia, mes, ano] = data.split('/')
        const dataPagamento = new Date(`${dia}-${mes}-${ano}`)

        if (!valor || !descricao || !dataPagamento) {
            errorCode = 400
            throw new Error("Não foi possível realizar o pagamento, dados passado não confere!")
        }

        const clientIndex = clientes.findIndex(cliente => cliente.cpf === cpf)

    
        if (clientIndex < 0) {
            errorCode = 404
            throw new Error("Cliente não encontrado")
        }

        const cliente = clientes[clientIndex]
        const novaTransacao: Transacao = {
            valor,
            data,
            descricao
        }

        if (Math.abs(valor) > cliente.saldo) {
            errorCode = 406
            throw new Error("Seu saldo é insuficiente")
        }

        cliente.extrato.push(novaTransacao)

        if(novaTransacao.valor > 0){
            let ultimaCompra = novaTransacao.valor
            cliente.saldo = cliente.saldo - ultimaCompra
            console.log(ultimaCompra)
        }


        res.status(201).send("O pagamento foi realizado com sucesso")
    } catch (error: any) {
        if (res.statusCode == 200) {
            res.status(errorCode).send(error.message)
        } else {
            res.status(res.statusCode).send(error.message)
        }
    }
})


app.listen(3003, () => {
    console.log("Servidor rodando na porta http://localhost:3003");
});

