<template>
    <header>
        <div class="leftSide">
            <div class="headerBg">
                <img src="@/assets/imgs/headerBg.png" alt="">
            </div>
            <div class="weatherList" v-for="(list,index) in weatherList" :key="index">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="`#icon${list.icon}`"/>
                </svg>
                <span class="num">{{list.value}}</span>
                <div class="line" v-if="index !== 3">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <span class="title">架空巡检机器人可视化管理系统</span>
        <span class="rightSide">2019/1/8 11:38:02</span>
    </header>
</template>

<script lang="ts">
    export default {
        name: "Header",
        data(){
            return{
                weatherList:[
                    {
                        icon:'-weather',
                        value:'24°'
                    },
                    {
                        icon:'-airHumidity',
                        value:'80%'
                    },
                    {
                        icon:'pm',
                        value:'2.5'
                    },
                    {
                        icon:'-air',
                        value:'40'
                    },
                ]
            }
        }
    }
</script>
<style>
    #icon-weather path {
        fill:#00ffc0;
    }
    #icon-airHumidity path {
        fill:#00ffc0;
    }
    #iconpm path {
        fill:#00ffc0;
    }
    #icon-air path {
        fill:#00ffc0;
    }

</style>
<style lang="scss" scoped>
header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4.6vh;
    padding:0 2.6vw;
    position: relative;
    .headerBg {
        width: 98.5vw;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        height: 2.4vh;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .leftSide {
        display: flex;
        margin-bottom: 12px;
        .weatherList {
            display: flex;
            align-items: center;
            margin-right: 0.6vw;
            .icon {
                margin-right: 6px;
            }
            .num {
                margin-right: 9px;
            }
            .line {
                position: relative;
                height: 13px;
                width: 2px;
                background-color: rgb(68,70,72);
                div {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background-color: rgb(130,131,132);
                    &:nth-child(1) {
                        top: 0;
                    }
                    &:nth-child(2) {
                        bottom: 0;
                    }
                }
            }
        }
    }
    .title {
        font-size: 1.35vw;
        letter-spacing: 2px;
        text-shadow: 0px -1px 5px #00ffbf;
        margin-right: 7vw;
    }
    .rightSide {
        margin-bottom: 12px;
    }
}
</style>
