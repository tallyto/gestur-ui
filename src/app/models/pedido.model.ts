import { Cliente } from "./cliente.model";
import { ItemPedido } from "./item-pedido.model";

export interface Pedido {
    id?: number; // O ID é opcional, pois pode ser atribuído pelo servidor
    cliente: Cliente; // Supondo que você tenha uma interface Cliente definida
    itens: ItemPedido[];
    dataPedido: string; // Supondo que a data seja uma string formatada
    status: string;
  }
  