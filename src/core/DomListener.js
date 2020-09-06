import {capitalise} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    this.listeners = listeners
    if (!$root) {
      throw new Error(`No $root provider for DomListener!`);
    }
    this.$root = $root;
  }

  initDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} Component!`
        )
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.remove(listener, this[method])
    })
  }
}
function getMethodName(eventName) {
  return 'on' + capitalise(eventName)
}
