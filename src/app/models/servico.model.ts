// Altere o enum para corresponder ao enum no backend
export enum ServicoType {
  AEREO = 'AEREO',
  CRUZEIRO = 'CRUZEIRO',
  CIRCUITO = 'CIRCUITO',
  HOSPEDAGEM = 'HOSPEDAGEM',
  INGRESSO = 'INGRESSO',
  LOCACAO_CARRO = 'LOCACAO_CARRO',
  PACOTE= 'PACOTE',
  RODOVIARIO = 'RODOVIARIO',
  SEGURO = 'SEGURO',
  TRANSFER = 'TRANSFER',
  OUTROS = 'OUTROS'
}

// Altere o array de serviços para usar o enum
export const Servico = [
  { nome: 'Aéreo', valor: ServicoType.AEREO },
  { nome: 'Cruzeiro', valor: ServicoType.CRUZEIRO },
  { nome: 'Circuito', valor: ServicoType.CIRCUITO },
  { nome: 'Hospedagem', valor: ServicoType.HOSPEDAGEM },
  { nome: 'Ingressos', valor: ServicoType.INGRESSO },
  { nome: 'Locação de Carro', valor: ServicoType.LOCACAO_CARRO },
  { nome: 'Pacote', valor: ServicoType.PACOTE },
  { nome: 'Rodoviário', valor: ServicoType.RODOVIARIO },
  { nome: 'Seguro', valor: ServicoType.SEGURO },
  { nome: 'Transfer', valor: ServicoType.TRANSFER },
  { nome: 'Outros', valor: ServicoType.OUTROS }
]
