
export default function formatAmount(amount: number, currency: string = 'GBP'): string {
  const isNegative = amount < 0;
  let formatValue;
  try {
    formatValue = Math.abs(amount).toLocaleString('en-us', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    });
  } catch (e) {
    console.error(currency);
    formatValue = Math.abs(amount) + currency;
  }

  return `${isNegative ? '-' : ''}${formatValue}`;
}
