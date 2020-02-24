export default function (value, type = 'date') {
  const option = {};
  
  if (type.includes('date')) {
    option.day = '2-digit';
    option.month = '2-digit';
    option.year = '2-digit';
  }
  
  if (type.includes('time')) {
    option.hour = '2-digit';
    option.minute = '2-digit';
    option.second = '2-digit';
  }
  
  return new Intl.DateTimeFormat('ru-RU', option).format(value);
}