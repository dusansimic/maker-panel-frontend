<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info" id="navbar">
      <b-navbar-brand to="/">Maker Panel</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    </b-navbar>
    <div id="wrapper">
      <!--<img src="./assets/logo.png">-->
      <br/>
      <router-view id="router_view"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}
#wrapper {
  max-width: 700px;
  margin-left: calc((100% - 700px)/2);
}
#navbar {
  max-width: 700px;
  margin-left: calc((100% - 700px)/2);
  border-radius: 5px;
}

@media screen and (max-width: 767px) {
  #app {
    margin-top: 0;
  }
  #wrapper {
    width: 95%;
    margin-left: calc((100% - 95%)/2);
  }
  #navbar {
    border-radius: 0;
    width: 100%;
    margin-left: 0;
  }
}
</style>
