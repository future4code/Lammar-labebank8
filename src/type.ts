export type Cliente={
    nome:string
    cpf: string
    nascimento: string
    saldo: number
    extrato:Transacao[]
}

export type Transacao={
    valor: number,
    data: string,
    descricao: string
}
