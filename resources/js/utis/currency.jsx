export const transformCurrency = (amount, from, to) => {
  console.log('amount, from, to: ', amount, from, to);
  let amnt_platform = amount / (from?.base_rate ?? 1)
  return (amnt_platform * to?.base_rate).toFixed(2)
}