<template>
  <div id="app">
    <div class="notification" v-for="(item, i) in items" :key="item.id">
      <p>
        <span class="tag is-primary">{{ i + 1}}</span>
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data: () => {
    return {
      items: [],
    }
  },
  async mounted () {
    const { data } = await axios.get('/api/bucketListItems')
    this.items = data;
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100vh;
  margin-top: 60px;
}
.notification{
  margin: auto;
  max-width: 700px;
}
</style>
