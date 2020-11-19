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
      <div class="columns is-vcentered">
        <input
          type="text"
          v-if="isSelected(item._id)"
          v-model="selectedDescription"
          class="column input is-clickable"
        />
        <p  v-else class="column">
          <span class="tag is-primary">{{ i + 1}}</span>
          {{ item.description }}
        </p>
        <div class="column is-narrow pr-0 d-flex align-items-center">
          <span class="icon has-text-info is-clickable" @click="isSelected(item._id) ? unSelect() : selectItem(item)">
            <i class="material-icons">{{isSelected(item._id) ? 'close' : 'edit'}}</i>
          </span>
          <span class="icon has-text-info is-clickable" @click="isSelected(item._id) ? updateItem(item, i) : removeItem(item, i)">
            <i class="material-icons">{{isSelected(item._id) ? 'save' : 'delete'}}</i>
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
        selectedItem: {},
        selectedDescription: '',
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
      selectItem(item) {
        this.selectedItem = item;
        this.selectedDescription = item.description;
      },
      unSelect() {
        this.selectedItem = {};
        this.selectedDescription = '';
      },
      isSelected (id) {
        return this.selectedItem._id && this.selectedItem._id === id
      },
      async removeItem(item, i) {
        await axios.delete(`/api/bucketListItems/${item._id}`)
        this.items.splice(i, 1);
      },
      async updateItem(item, i) {
        const { selectedDescription } = this;
        if(!selectedDescription || selectedDescription === ''){
          return;
        }

        const { data } = await axios.put(`/api/bucketListItems/${item._id}`, {
          description: selectedDescription,
        })
        this.items[i] = data;
        this.unSelect();
      },
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
  .pr-0{
    padding-right: 0;
  }
  .d-flex{
    display: flex;
  }
  .align-items-center{
    align-items: center;
  }
  .justify-content-center{
    justify-content: center;
  }
</style>
