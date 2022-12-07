<template>
  <v-app id="app">
    <NavigationDrawer />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer.vue'
export default {
  name: "App",
  components: {
    NavigationDrawer
  },
}
</script>

<style>
#app {
  background-color: #f3f3f3;
}
</style>