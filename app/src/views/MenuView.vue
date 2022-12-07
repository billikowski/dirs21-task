<template>
  <div class="menu">
    <v-container class="text-h4 font-weight-bold py-10"> Menu </v-container>
    <v-spacer></v-spacer>
    <v-container class="px-3">
      <v-alert border="left" colored-border type="info" elevation="2">
        <span>{{ helpText }}</span>
      </v-alert>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      // Menu page placeholder
      helpText:
        "In the menu view you can expect to find all active " +
        "dishes grouped by the time of week/day that they are " +
        "available.",
    };
  },
};
</script>
