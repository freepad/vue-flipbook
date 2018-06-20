<template>
  <flipbook class="book" :pages="pages">
    <template slot-scope="prop">
      <img :src="prop.page.url" alt="">
    </template>
  </flipbook>
</template>

<script>
import flipbook from '../src/flipbook'

export default {
  data: () => ({
    pages: [
      { url: 'http://via.placeholder.com/500x500/001f3f' },
      { url: 'http://via.placeholder.com/500x500/0074D9' },
      { url: 'http://via.placeholder.com/500x500/7FDBFF' },
      { url: 'http://via.placeholder.com/500x500/39CCCC' },
      { url: 'http://via.placeholder.com/500x500/3D9970' },
      { url: 'http://via.placeholder.com/500x500/2ECC40' },
      { url: 'http://via.placeholder.com/500x500/01FF70' },
      { url: 'http://via.placeholder.com/500x500/FFDC00' },
      { url: 'http://via.placeholder.com/500x500/FF851B' },
      { url: 'http://via.placeholder.com/500x500/FF4136' },
      { url: 'http://via.placeholder.com/500x500/85144b' },
      { url: 'http://via.placeholder.com/500x500/F012BE' },
      { url: 'http://via.placeholder.com/500x500/B10DC9' }
    ]
  }),
  components: {
    flipbook
  }
}
</script>

<style>
body {
  position: relative;

  display: flex;
  padding: 0;
  margin: 0;
  min-height: 100vh;
}

.book {
  height: 40vh;
  width: 90vh;
  margin: auto;
}

.book img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
