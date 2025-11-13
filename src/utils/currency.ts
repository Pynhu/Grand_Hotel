export const formatCurrency = (
  amount: number,
  locale: string = 'pl-PL',
  currency: string = 'PLN',
) => new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)