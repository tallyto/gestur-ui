import { Cliente } from "./cliente.model";
import {ItemVenda} from "./item-venda.model";

export class Venda {
  id: number;
  cliente: Cliente;
  dataEmbarque: Date;
  dataDesembarque: Date;
  status: string;
  itens: ItemVenda[];
}
