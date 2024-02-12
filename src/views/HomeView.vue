<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/NoJavaJobs-Logo-Background.png" id="app-logo"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {

  },
})
export default class HomeView extends Vue {}
</script>

<style lang="scss" scoped>
#app-logo {
  border-radius: 21px;
  padding: 0;
  margin: 0;
  width: 120px;
}
</style>