'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

let inViewport;

export default {
  initialState: function (props) {
    return {
      visible: false
    };
  },
  render: function ({ props: { children, offset, height, width }, state: { visible } }) {
    if (visible) {
      return (<div class="lazy-load">
        {children}
      </div>);
    }

    // in-viewport doesn't work with a 0 sized element
    height = height || 1;
    width = width || 1;
    const style = { 'width': width, 'height': height };

    return (<div class='lazy-load' style={style}></div>);
  },
  afterMount: function (component, el, setState) {
    // adding inViewport here since it doesn't work when rendering on the server
    if (!inViewport) {
      inViewport = require('in-viewport');
    }

    const { props: { offset: offset } } = component;
    component.watcher = inViewport(el, { offset: Number(offset) || 0 }, function () {
      setState({
        visible: true
      });
      component.watcher = null;
    });
  },
  beforeUnmount: function (component) {
    if (component.watcher) {
      component.watcher.dispose();
    }
  }
};