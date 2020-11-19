<template>
  <div id="app">
    <div class="field has-addons">
      <div class="control is-expanded">
        <input type="text" class="input" placeholder="Go to mars...">
      </div>
      <div class="control">
        <span class="button is-info">Add</span>
      </div>
    </div>
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
  margin: auto;
  max-width: 700px;
  min-height: 100vh;
  margin-top: 60px;
}
</style>
