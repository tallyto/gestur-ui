import { Venda } from "./venda.model";
import { Fornecedor } from "./fornecedor.model";

export class ItemVenda {
  id: number;
  venda: Venda;
  formaPagamento: string;
  localizador: string;
  atendente: string;
  descricao: string;
  anotacao: string;
  quantidade: number;
  valorTotal: number;
  desconto: number;
  comissaoRecebida: number;
  fornecedor: Fornecedor;
  quantidadeFornecedor: number;
  valorFornecedor: number;
  descontoFornecedor: number;
  comissaoAReceber: number;
}
