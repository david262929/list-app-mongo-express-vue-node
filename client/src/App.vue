<template>
  <div id="app">
    <div class="field has-addons">
      <div class="control is-expanded">
        <input type="text" v-model="description" class="input is-clickable" placeholder="Go to mars...">
      </div>
      <div class="control">
        <a class="button is-info" @click="addItem" :disabled="(!description || description ==='')">Add</a>
      </div>
    </div>
    <div class="notification" v-for="(item, i) in items" :key="item.id">
      <div class="columns">
        <input
          type="text"
          v-if="isEditingMode(item._id)"
          v-model="editedDescription"
          class="column input is-clickable"
        />
        <p  v-else class="column">
          <span class="tag is-primary">{{ i + 1}}</span>
          {{ item.description }}
        </p>
        <div class="column is-narrow">
          <span class="icon has-text-info is-clickable" @click="editItem(item)">
            <i class="material-icons">edit</i>
          </span>
          <span class="icon has-text-info is-clickable" @click="removeItem(item, i)">
            <i class="material-icons">delete</i>
          </span>
        </div>
      </div>
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
        description: '',
        editingItem: {},
        editedDescription: '',
      }
    },
    async mounted () {
      const { data } = await axios.get('/api/bucketListItems/')
      this.items = data;
    },
    methods : {
      async addItem() {
        const { description } = this;
        if(!description || description === ''){
          return;
        }

        const { data } = await axios.post('/api/bucketListItems/', {
          description,
        })
        this.items.push(data);
        this.description = '';
      },
      editItem(item) {
        this.editingItem = item;
        this.editedDescription = item.description;
      },
      isEditingMode (id) {
        return this.editingItem._id && this.editingItem._id === id
      },
      async removeItem(item, i) {
        await axios.delete(`/api/bucketListItems/${item._id}`)
        this.items.splice(i, 1);
      }
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
  .is-clickable {
    cursor: pointer;
  }
</style>
