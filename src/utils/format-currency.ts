export const formatCurrency = (value: number, locale: string): string => {
  let currency: string;
  switch (locale) {
    case 'mex':
    case 'es-MX':
      currency = 'MXN';
      locale = 'es-MX';
      break;
    case 'col':
    case 'es-col':
      currency = 'COP';
      locale = 'es-CO';
      break;
    default:
      currency = 'MXM';
      locale = 'es-MX';
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

