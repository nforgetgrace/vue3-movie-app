<template>
  <div class="container"> 
    <input
      type="text"
      class="form-control"
      v-model="title"
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
          items: function(){
            const currentYear = new Date().getFullYear
            const years= []
            for (let i = currentYear; i >= 1985; i -= 1) {
              years.push(i)
            }
            return years
          }
        }
      ]
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