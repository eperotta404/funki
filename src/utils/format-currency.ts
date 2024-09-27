export const formatCurrency = (value: number, locale: string): string => {
  let currency: string;

  switch (locale) {
    case 'mex':
    case 'es-MX':
      currency = 'MXN';
      break;
    case 'col':
    case 'es-col':
      currency = 'COP';
      break;
    default:
      currency = 'MXM';
      break;
  }

  const formattedValue =  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return formattedValue.replace(currency, '$');
};

