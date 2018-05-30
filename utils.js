import defaults from './options';

function toStr(value) {
  return value ? value.toString() : '';
}

function onlyNumbers(input) {
  return toStr(input).replace(/\D+/g, '') || '0';
}

function between(min, n, max) {
  return Math.max(min, Math.min(n, max));
}

function fixed(precision) {
  return between(0, precision, 20);
}

function numbersToCurrency(numbers, precision) {
  const exp = 10 ** precision;
  const float = parseFloat(numbers) / exp;
  return float.toFixed(fixed(precision));
}

function addThousandSeparator(integer, separator) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`);
}

function joinIntegerAndDecimal(integer, decimal, separator) {
  return decimal ? integer + separator + decimal : integer;
}

function format(input, opt = defaults) {
  if (typeof input === 'number')
    input = input.toFixed(fixed(opt.precision));

  const negative = input.indexOf('-') >= 0 ? '-' : '';
  const numbers = onlyNumbers(input);
  const currency = numbersToCurrency(numbers, opt.precision);
  const parts = toStr(currency).split('.');
  let integer = parts[0];
  const decimal = parts[1];
  integer = addThousandSeparator(integer, opt.thousands);
  return opt.prefix + negative + joinIntegerAndDecimal(integer, decimal, opt.decimal) + opt.suffix;
}

function unformat(input, precision) {
  const negative = input.indexOf('-') >= 0 ? -1 : 1;
  const numbers = onlyNumbers(input);
  const currency = numbersToCurrency(numbers, precision);
  return parseFloat(currency) * negative;
}

function setCursor(el, position) {
  const setSelectionRange = function setSelecRage() { el.setSelectionRange(position, position); };
  if (el === document.activeElement) {
    setSelectionRange();
    setTimeout(setSelectionRange, 1); // Android Fix
  }
}

function event(name) {
  const evt = document.createEvent('Event');
  evt.initEvent(name, true, true);
  return evt;
}

export {
  format,
  unformat,
  setCursor,
  event
};
