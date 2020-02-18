import TreeTitle from './TreeTitle';

function plugin(Vue) {
  if(plugin.installed){
    return
  }
  Vue.component('TreeTitle', TreeTitle)
}

export default plugin;