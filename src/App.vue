<template lang="pug">
  #App
    router-view.absolute.left-0.right-0.background
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
//import NavBar from "@/components/NavBar.vue"

@Component({
  name: "App"
})
export default class App extends Vue {}
</script>

<style scoped lang="scss">
// Some SASS code must exist below in order to include all _global SASS code.
.background {
  min-height: 100vh;
  background-color: #000000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%23000000' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%231a1023' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%232a1840' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%233b1f60' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%234c2582' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%235e2ca5' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  /* background by SVGBackgrounds.com */
}
</style>
