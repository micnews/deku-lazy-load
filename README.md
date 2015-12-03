# deku-lazy-load

Lazyload component for [deku](https://github.com/dekujs/deku).

## Usage

```shell
npm install deku-lazy-load
```

```js
import Lazyload from 'deku-lazy-load';

export default {
  render: function () {
    return (<Lazyload><img src='image.jpg'/></Lazyload>);
  }
}
```

### Attributes

#### `offset=[Number]`

By default the children to the `<Lazyload>`-component will be loaded precisely when they enter the viewport, set a offset to load the children when they're about to be shown in the viewport.

#### `width=[Number]`

Width that the `<Lazyload>` component will have before the content has loaded

#### `height=[Number]`

Height that the `<Lazyload>` component will have before the content has loaded
