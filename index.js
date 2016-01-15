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
  defaultProps: {
    heigth: 1,
    width: 1
  },
  render ({ props: { children, offset, height, width }, state: { visible } }) {
    // in-viewport doesn't work with a 0 sized element
    height = height || 1;
    width = width || 1;

    const style = { 'min-width': width, 'min-height': height };
    const content = visible ? children : undefined;

    return (<div class='lazy-load' style={style}>{content}</div>);
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
