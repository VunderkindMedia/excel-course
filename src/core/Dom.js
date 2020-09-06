class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  append(node) {
    if (Element.prototype.append) {
      if (node instanceof Dom) {
        node = node.$el;
      }
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  remove(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, clasess = '') => {
  const el = document.createElement(tagName);
  if (clasess) {
    el.classList.add(clasess);
  }
  return $(el);
};
