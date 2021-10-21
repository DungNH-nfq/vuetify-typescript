<template>
  <v-app>
    <core-app-drawer />
    <core-app-bar />

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    CoreAppBar: () => import("@/components/core/appBar"),
    CoreAppDrawer: () => import("@/components/core/appDrawer"),
    CoreAppFooter: () => import("@/components/core/appFooter"),
  },
};
</script>
