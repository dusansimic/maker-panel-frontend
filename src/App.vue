<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info" id="navbar">
      <b-navbar-brand to="/">Maker Panel</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/" exact>Home</b-nav-item>
          <b-nav-item to="/about" exact>About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    </b-navbar>
    <div id="wrapper">
      <!--<img src="./assets/logo.png">-->
      <br/>
      <router-view id="router_view"/>
    </div>
    <footer>
      <p>Developed by <a href="http://dusansimic.me">Dušan Simić</a>, Vladimir Krsmanović and Ljubomir Gojković</p>
    </footer>
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
  max-width: 1024px;
  margin-left: calc((100% - 1024px)/2);
}
#navbar {
  max-width: 1024px;
  margin-left: calc((100% - 1024px)/2);
  border-radius: 5px;
}
footer {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}
footer p {
  font-size: 1.1em;
}

@media screen and (max-width: 1023px) {
  #wrapper, #navbar {
    max-width: 768px;
    margin-left: calc((100% - 768px)/2);
  }
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
