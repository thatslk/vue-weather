<template>
  <Weather />
</template>

<script>

import Weather from './components/Weather/Weather.vue'

export default {
  name: 'App',
  components: {
    Weather
  }
}
</script>

<style lang="scss">
body{
  background-color: #E8E8E8;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
