<template>
  <div class="container"> 
    <input
      id="title"
      type="text"
      class="form-control"
      v-model="title"
      @keyup.enter="apply"
      placeholder="Search for Movies, Series & more" />
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      id="btn"
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title : '',
      type: 'movie',
      year: '',
      number: 10,

      filters:[
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => { //즉시실행함수 (function(){})() 괄호 ()() 2개
            const years = []
            const thisYear = new Date().getFullYear()
            for (let i = thisYear; i >= 1985; i -= 1) {
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },
  methods:{
    async apply(){
      if(!this.title){
        document.getElementById('title').focus()
        return
      }
      document.getElementById('btn').focus()
      const payload = {
        'title':this.title,
        'type':this.type,
        'year':this.year,
        'number':this.number,
      }
      console.log(payload)
      this.$store.dispatch('movie/searchMovies', payload)
    }    
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    flex-shrink: 0;
    font-weight: 700;
  }
}
</style>