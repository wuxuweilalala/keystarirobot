<template>
    <div class="sonHeader">
        <div>
            <Icon name="lineInfo" class="leftIcon1"  v-if="name === '线路信息'"/>
            <Icon name="warn" class="leftIcon2"  v-if="name === '实时预警'"/>
            <Icon name="baseInfo" class="leftIcon3"  v-if="name === '基础信息'"/>
            <Icon name="pictureInfo" class="leftIcon4"  v-if="name === '图片信息'"/>
            <Icon name="defect" class="leftIcon5"  v-if="name === '缺陷信息'"/>
            <span class="name">{{name}}</span>
        </div>
        <Icon name="rightArrow" class="rightIcon"  v-if="rightIcon === 'right'"/>
        <Icon name="leftArrow" class="rightIcon"  v-if="rightIcon === 'left'"/>
        <span v-if="conditions" class="condition">条件过滤</span>
    </div>
</template>

<script>
    import Icon from "@/components/Icon.vue"
    export default {
        name: "SonHeader",
        props:['name','rightIcon','conditions'],
        components:{
            Icon
        }
    }
</script>

<style>
    #iconroad-info path {
        fill:#00ffc0;
    }
    #iconyujing path {
        fill:#00ffc0;
    }
    #iconjichushuju path {
        fill:#00ffc0;
    }
    #iconquexian path {
        fill:#00ffc0;
    }
</style>

<style lang="scss" scoped>
    .sonHeader {
        width: 13.6vw;
        height: 5.5vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0 1vw;
        background: url('~@/assets/imgs/sonHeaderBg.png');
        background-size: 100% 100%;
        >div {
            .icon {
                margin-right: 0.52vw;
            }
            .leftIcon1 {
                width: 1.25vw;
                height: 1.15vw;
            }
            .leftIcon2  {
                width: 0.94vw;
                height: 0.94vw;
            }
            .leftIcon3  {
                width: 1.04vw;
                height: 0.89vw;
            }
            .leftIcon4  {
                width: 1.09vw;
                height: 0.99vw;
            }
            .leftIcon5  {
                width: 0.94vw;
                height: 0.89vw;
            }
        }
        .icon {
            width: 0.89vw;
            height: 0.89vw;
        }
        .condition {
            font-size: 0.73vw;
            color: #00ffbf;
        }
    }
</style>
