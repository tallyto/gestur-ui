import { Cliente } from "./cliente.model";

export interface Venda {
    id?: number; // O id é opcional, pois será gerado pelo banco de dados
    cliente: Cliente; // Importe o modelo de Cliente e ajuste conforme necessário
    valorPago: number;
    valorRepassado: number;
    formaPagamento: string;
    comissaoRAV: number;
    comissaoMarkup: number;
    descontoAplicado: boolean;
  }
  