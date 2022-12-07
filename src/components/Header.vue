<template>
  <header>
    <Logo />
    <ul class="nav nav-pills">
      <li
        v-for="navigation in navigations"
        :key="navigation.name"
        class="nav-item">
        <RouterLink
          class="nav-link"
          active-class="active"
          aria-current="page"
          :to="navigation.href">
          {{ navigation.name }}
        </RouterLink>
      </li>
    </ul>
  </header>
</template>

<script>
import Logo from '~/components/Logo'
export default {
  data(){
    return{
      navigations:[
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie'
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  components:{
    Logo
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";
header {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
    }
  }
}
</style>