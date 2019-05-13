// flow
import formatAmount from './formatAmount';
import formatDate from './formatDate';

interface Props {
  value?: string | number | boolean,
  amount?: string,
  currency?: string,
};

const format = ({ value, amount, currency }: Props) => {
  let formattedValue;
  if (value === undefined || value === null) {
    formattedValue = '-';
  } else if (amount === 'currency') {
    formattedValue = formatAmount(+value, currency);
  } else if (amount === '%') {
    formattedValue = `${value.toLocaleString()}%`;
  } else if (amount === 'date' && typeof value === 'string') {
    formattedValue = formatDate(value);
  } else if (amount === 'number') {
    formattedValue = value.toLocaleString();
  } else if (amount === 'bool') {
    formattedValue = value ? 'Yes' : 'No';
  } else {
    formattedValue = value;
  }
  return formattedValue;
};

export default format;
