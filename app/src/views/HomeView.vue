<template>
  <div class="home">
    <v-container class="text-h4 font-weight-bold py-10">
      Home
    </v-container>
    <v-spacer></v-spacer>
    <v-container class="px-3">
      <v-alert
        border="left"
        colored-border
        type="info"
        elevation="2"
      >
      <span>{{ helpText }}</span>
      </v-alert>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'RestaurantManager',
    data() {
      return {
        // Home page placeholder
        helpText: 'This page functions as the entry point to the ' +
                  'application. Here you can expect to find an overview ' +
                  'of the most important information, or you can use the ' +
                  'sidebar to navigate to specific views.',
      }
    },
  }
</script>