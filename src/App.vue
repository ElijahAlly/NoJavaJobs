<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/jobs">Jobs</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

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
</style>
