import { Cliente } from "./cliente.model";
import {ItemVenda} from "./item-venda.model";
import {ItemAnexo} from "./item-anexo.model";

export class Venda {
  id: number;
  cliente: Cliente;
  dataEmbarque: Date;
  dataDesembarque: Date;
  status: string;
  itens: ItemVenda[];
  anexos: ItemAnexo[];
}
