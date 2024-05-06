export enum StatusType {
  COTACAO = 'COTACAO',
  CANCELADO = 'CANCELADO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  FINALIZADO = 'FINALIZADO',
  PENDENTE = 'PENDENTE',
  POS_VENDA = 'POS_VENDA'
}

export const Status = [
  { valor: StatusType.COTACAO, nome: 'Cotação' },
  { valor: StatusType.CANCELADO, nome: 'Cancelado' },
  { valor: StatusType.EM_ANDAMENTO, nome: 'Em andamento' },
  { valor: StatusType.FINALIZADO, nome: 'Finalizado' },
  { valor: StatusType.PENDENTE, nome: 'Pendente' },
  { valor: StatusType.POS_VENDA, nome: 'Pós-venda' }
]
