import { format, setCursor } from './utils';
import opt from './options';

function run(el, eventName) {
  let positionFromEnd = el.value.length - el.selectionEnd;
  el.value = format(el.value, opt);
  positionFromEnd = el.value.length - positionFromEnd;
  positionFromEnd = Math.max(positionFromEnd, opt.prefix.length + 1); // left
  setCursor(el, positionFromEnd);
  el.dispatchEvent(new Event(eventName));
}

function getInput(el) {
  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    const els = el.getElementsByTagName('input');
    if (els.length !== 1)
      throw new Error(`v-money requires 1 input, found ${els.length}`);
    else
      el = els[0];
  }
  return el;
}

function bind(el) {
  el = getInput(el);

  el.addEventListener('input', run(el, 'input'));
  el.addEventListener('change', run(el, 'change'));

  run(el, 'input');
}

function componentUpdated(el, binding, vnode, oldVnode) {
  // Prevent firing endless events
  if (vnode.data.props && vnode.data.props.value === oldVnode.data.props.value) return;

  el = getInput(el);
  el.value = vnode.data.props ? vnode.data.props.value : el.value;
  run(el, 'input');
}

export default { bind, componentUpdated };
