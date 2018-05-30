export default function (defaults, extras) {
  defaults = defaults || {};
  extras = extras || {};
  return Object.keys(defaults).concat(Object.keys(extras)).reduce((acc, val) => {
    acc[val] = extras[val] === undefined ? defaults[val] : extras[val];
    return acc;
  }, {});
}
