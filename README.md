# deku-youtube-video

Youtube video component for [deku](https://github.com/dekujs/deku).

## Usage

```shell
npm install deku-youtube-video
```

```js
import YoutubeVideo from 'youtube-video';

export default {
  render: function () {
    return (<YoutubeVideo youtube-id='YoB8t0B4jx4' />);
  }
}
```

### Attributes

#### `id=[youtube-video-id]`
Set youtube video ID to use.

## index.css

Import the css using [postcss](https://github.com/postcss/postcss).
```css
@import 'deku-youtube-video';
```
