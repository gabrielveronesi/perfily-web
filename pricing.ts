export const PRICE_OLD = 5.5;
export const PRICE_NEW = 2.5;

export const formatBRL = (value: number) =>
  `R$ ${value.toFixed(2).replace('.', ',')}`;
