<template>
  <div id="app">
    <div id="wrapper">
      <!--<img src="./assets/logo.png">-->
      <router-view/>
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

@media screen and (max-width: 767px) {
  #wrapper {
    width: 95%;
    margin-left: calc((100% - 95%)/2);
  }
}
</style>
