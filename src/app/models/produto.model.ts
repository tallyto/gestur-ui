export interface Produto {
    id?: number; // O ID é opcional, pois pode ser atribuído pelo servidor
    nome: string;
    descricao?: string; // A descrição é opcional
    preco: number;
  }
  