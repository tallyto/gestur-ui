// cliente.model.ts
export interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  telefone: string;
  renda: string;
  profissao: string;
  anexos: any[];
  numeroPassaporte: string;
  paisEmissao: string;
  dataEmissao: Date
  dataValidade: Date
}
