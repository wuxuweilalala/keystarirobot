<template>
  <div id="app">
    <Header />
      <router-view/>
  </div>
</template>


<script>
  import Header from "./components/Header";
  export default  {
    name:"App",
    components:{
      Header
    }
  }

</script>
<style lang="scss">
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}
  body {
    width: 100vw;
    height: 100vh;
    background: url('~@/assets/imgs/bodyBg.webp') no-repeat;
    background-size: 100% 100%;
    color:#fff;
  }
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
