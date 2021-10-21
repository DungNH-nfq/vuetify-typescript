<template>
  <div>
    <p>{{ $vuetify.lang.t("$vuetify.welcome") }}</p>
    <div>{{ $vuetify.lang.t("$vuetify.badge") }}</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
});
</script>
