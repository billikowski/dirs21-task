<template>
  <v-navigation-drawer app permanent left width="230" color="grey darken-4">
    <v-list-item>
      <v-list-item-title class="text-h6 my-6">
        <span class="white--text">Restaurant Manager</span>
      </v-list-item-title>
    </v-list-item>
    <v-list nav>
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <span class="white--text">Home</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item to="/dishes">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-silverware-fork-knife</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <span class="white--text">Dishes</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item to="/menu">
        <v-list-item-icon>
          <v-icon class="white--text">mdi-format-columns</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <span class="white--text">Menu</span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {};
</script>
