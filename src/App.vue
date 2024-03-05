<template>
  <nav>
    <img alt="Vue logo" src="./assets/NoJavaJobs-Logo-Background.png" id="app-logo"/>
    <router-link to="/">Home</router-link> |
    <router-link to="/jobs">Jobs</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts">
export default {
  data() {
    return {
      imgHomeSrc: './assets/NoJavaJobs-Logo-Background.png',
      imgOtherSrc: './assets/NoJavaJobs-Logo.png',
    }
  },
  computed: {
    isOnHome: (): boolean => window.location.pathname === '/' ? true : false
  },
  created() {
    // // Set the initial value of currentPath
    // this.currentPath = ;

    // You can also listen to route changes to update the currentPath dynamically
    // this.$router.afterEach((to, from) => {
    //   this.currentPath = to.path;
    //   // if (this.currentPath !== '/') {
    //   //   computed './assets/NoJavaJobs-Logo.png'; 
    //   //   return;
    //   // }
    // });
  }
};
</script>

<style lang="scss">
#app, body, html {
  overflow-x: hidden;
  font-family: 'Palantino';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 30px;

  a {
    font-weight: bold;
    // color: #03040d; // black
    // color: #132634; // gray darker
    color: #486071; // gray lighter 

    &.router-link-exact-active {
      color: #f66d65; // red darker
      // color: #fe6662; // red lighter
    }
  }
}

#app-logo {
  border-radius: 9px;
  margin-right: 9px;
  width: 42px;
}
</style>
