<template>
  <div id="app">
    <Header />
    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>


<script>
  import Header from "./components/Header";
  import qs from "qs";
  export default  {
    name:"App",
    components:{
      Header
    },
    mounted(){
   /*   this.$post('eprdms/shiro/login',qs.stringify({
        userName:'肇庆市级管理测试用户01',
        password:123456
      })).then(res=>{
        localStorage.setItem('Authorization',res.data)
      })*/
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
