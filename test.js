'use strict';
import test from 'tape';
import LazyLoad from './';
import { renderString, tree } from 'deku';
import tsml from 'tsml';
import element from 'magic-virtual-element';

test('LazyLoad initial state', function (t) {
  var html = renderString(tree(LazyLoad.render({
    props: {
      children: <div class='foo'></div>
    },
    state: {}
  })));

  t.equal(html, tsml`
    <div class="lazy-load" style="width: 1px; height: 1px">
    </div>`);
  t.end();
});

test('LazyLoad visible=false, height & width property', function (t) {
  var html = renderString(tree(LazyLoad.render({
    props: {
      'width': 100,
      'height': 200,
      children: <div class='foo'></div>
    },
    state: {}
  })));

  t.equal(html, tsml`
    <div class="lazy-load" style="width: 100px; height: 200px">
    </div>`);
  t.end();
});

test('LazyLoad visible=true', function (t) {
  var html = renderString(tree(LazyLoad.render({
    props: {
      children: <div class='foo'></div>
    },
    state: {
      visible: true
    }
  })));
  t.equal(html, tsml`
    <div class="lazy-load">
      <div class="foo"></div>
    </div>`);

  t.end();
});
