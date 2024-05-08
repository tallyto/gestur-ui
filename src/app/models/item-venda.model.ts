import {Venda} from "./venda.model";
import {Fornecedor} from "./fornecedor.model";

export class ItemVenda {
  id: number;
  venda: Venda;
  descricao: string;
  formaPagamento: string;
  valorTotal: number;
  fornecedor: Fornecedor;
  anotacao: string;
  comissaoRecebida: number;
  comissaoAReceber: number;
}
