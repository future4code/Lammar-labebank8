export type Cliente={
    nome:string
    cpf: string
    nascimento: string
    saldo: number
}

export type Transacao={
    valor: number,
    data: string,
    descricao: string
}
