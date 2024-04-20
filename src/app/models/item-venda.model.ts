import {Venda} from "./venda.model";
import {Produto} from "./produto.model";

export class ItemVenda {
  id: number;
  venda: Venda;
  produto: Produto;
  quantidade: number;
}
