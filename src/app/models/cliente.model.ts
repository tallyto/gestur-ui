// cliente.model.ts
export interface Cliente {
    id?: number; // O id é opcional, pois pode não estar disponível ao criar um novo cliente
    nome: string;
    cpf: string;
    rg: string;
    email: string;
    telefone: string;
    renda: string;
    profissao: string;
  }
  