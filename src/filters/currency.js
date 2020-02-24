export default function (value, currency = 'USD') {
  const options = {
    style: 'currency',
    currency
  };
  
  return new Intl.NumberFormat('ru-RU', options).format(value);
}