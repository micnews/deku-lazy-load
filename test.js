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
    <div class="lazy-load" style="min-width: 1px; min-height: 1px">
    </div>`);
  t.end();
});

test('LazyLoad load=false, height property', function (t) {
  var html = renderString(tree(LazyLoad.render({
    props: {
      width: 100,
      height: 200,
      children: <div class='foo'></div>
    },
    state: {}
  })));

  t.equal(html, tsml`
    <div class="lazy-load" style="min-width: 100px; min-height: 200px">
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
    <div class="lazy-load" style="min-width: 1px; min-height: 1px">
      <div class="foo"></div>
    </div>`);

  t.end();
});
