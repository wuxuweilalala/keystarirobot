<template>
    <div class="routeWrapper">
        <div :class="[{activeList:list.path === $route.path},'routeList']" v-for="(list,index) in routeList" @click="toRoute(list)" :key="index">
            {{list.name}}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RouteHeader",
        data(){
            return {
                routeList:[
                    {
                        name:'人员、权限、登录',
                        path:'/'
                    },
                    {
                        name:'巡检、缺陷识别等',
                        path:'/inspection'
                    },
                    {
                        name:'综合管理、查询',
                        path:'/'
                    },
                    {
                        name:'设备管理',
                        path:'/'
                    }],
            }
        },
        methods:{
            toRoute(list){
                this.$router.push(list.path)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .routeWrapper {
        display: flex;
        justify-content: center;
        margin-top: 0.8vh;
        font-size: 0.73vw;
        .routeList {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 6.8vw;
            height: 2.6vh;
            margin-right: 1.1vw;
            cursor: pointer;
            background-color: #17312e;
            z-index: 1;
            div {
                position: absolute;
                z-index: 0;
                &:nth-child(1) {
                    left: -2px;
                    top: -2px;
                    width: 5px;
                    height: 5px;
                    border-top: 2px solid  rgb(88,117,108);
                    border-left: 2px solid rgb(88,117,108);
                }
                &:nth-child(2) {
                    right: -2px;
                    top: -2px;
                    width: 5px;
                    height: 5px;
                    border-right: 2px solid  rgb(88,117,108);
                    border-top: 2px solid rgb(88,117,108);
                }
                &:nth-child(3) {
                    left: -2px;
                    bottom: -2px;
                    width: 5px;
                    height: 5px;
                    border-bottom: 2px solid  rgb(88,117,108);
                    border-left: 2px solid rgb(88,117,108);
                }
                &:nth-child(4) {
                    right: -2px;
                    bottom: -2px;
                    width: 5px;
                    height: 5px;
                    border-right: 2px solid  rgb(88,117,108);
                    border-bottom: 2px solid rgb(88,117,108);
                }
            }
        }
        .activeList {
            background-color: #00412f;
            div {
                position: absolute;
                z-index: 0;
                &:nth-child(1) {
                    border-top: 2px solid  #00ffbf;
                    border-left: 2px solid #00ffbf;
                }
                &:nth-child(2) {
                    border-right: 2px solid #00ffbf;
                    border-top: 2px solid #00ffbf;
                }
                &:nth-child(3) {
                    border-bottom: 2px solid  #00ffbf;
                    border-left: 2px solid #00ffbf;
                }
                &:nth-child(4) {
                    border-right: 2px solid  #00ffbf;
                    border-bottom: 2px solid #00ffbf;
                }
            }
        }
    }
</style>
