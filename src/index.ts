import express, { Request, Response } from "express"

import cors from 'cors'
import { clientes } from "./data"

const app = express()

app.use(express.json())

app.use(cors())

// criar usuário:
app.get("/users",(req:Request, res:Response)=>{
     clientes.map((user)=>{
        return user
     })
     res.status(200).send(clientes)
})

app.listen(3003, () => {
    console.log("Servidor rodando na porta http://localhost:3003");
});