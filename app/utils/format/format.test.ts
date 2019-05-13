import format from './';

test('Format - no value', () => {
  expect(format({})).toBe('-');
});

test('Format - number', () => {
  expect(format({ amount: 'number', value: 13000 })).toBe('13,000');
});

test('Format - date', () => {
  expect(format({ amount: 'date', value: '1999-06-14' })).toBe('06/14/1999');
});

test('Format - currency', () => {
  expect(format({ amount: 'currency', value: 13000 })).toBe('£13,000.00');
  expect(format({ currency: '$', amount: 'currency', value: 13000 })).toBe('13000$');
  expect(format({ currency: 'USD', amount: 'currency', value: 13000 })).toBe('$13,000.00');
});

test('Format - percent', () => {
  expect(format({ amount: '%', value: 99 })).toBe('99%');
});

test('Format - bool', () => {
  expect(format({ amount: 'bool', value: true })).toBe('Yes');
  expect(format({ amount: 'bool', value: false })).toBe('No');
});
