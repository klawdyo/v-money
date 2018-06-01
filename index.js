import VMoney from './directive';
import options from './options';

export { VMoney, options };

function install(Vue, globalOptions) {
  if (globalOptions)
    Object.keys(globalOptions).forEach(key => {
      options[key] = globalOptions[key];
    });

  Vue.directive('money', VMoney);
}

export default install;

// Install by default if included from script tag
if (typeof window !== 'undefined' && window.Vue)
  window.Vue.use(install);

