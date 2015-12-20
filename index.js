'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

let inViewport;

const watchers = {};

export default {
  initialState (props) {
    return {
      visible: false
    };
  },
  render ({ props: { children, offset, height, width }, state: { visible } }) {
    if (visible) {
      return (<div class='lazy-load'>{children}</div>);
    }

    // in-viewport doesn't work with a 0 sized element
    height = height || 1;
    width = width || 1;
    const style = { 'width': width, 'height': height };

    return (<div class='lazy-load' style={style}></div>);
  },
  afterMount ({ props: { offset }, id }, el, setState) {
    // adding inViewport here since it doesn't work when rendering on the server
    if (!inViewport) {
      inViewport = require('in-viewport');
    }

    watchers[id] = inViewport(el, { offset: Number(offset) || 0 }, () => {
      watchers[id].dispose();
      delete watchers[id];
      setState({
        visible: true
      });
    });
  },
  beforeUnmount ({ id }) {
    if (watchers[id]) {
      watchers[id].dispose();
      delete watchers[id];
    }
  }
};
