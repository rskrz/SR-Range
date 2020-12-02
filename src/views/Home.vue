<template lang="pug">
  .flex.flex-column.items-center.mt0
    .flex.flex-column.center.items-center.bg-black-40.h-50.mv6.br4.w-60-l.w-75
      h1.white.mt5.mb4 SR Range
      Organizer
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Organizer from "@/components/Organizer.vue"

@Component({
  name: "Home",
  components: {
    Organizer
  }
})
export default class Home extends Vue {
  public isError = false
  public errorStatus = ""
}
</script>

<style lang="scss" scoped>
#Home {
}
</style>
