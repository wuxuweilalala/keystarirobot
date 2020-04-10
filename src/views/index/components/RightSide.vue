<template>
    <section class="rightSide">
        <div class="headerSide">
            <div :class="[{selected:mode === 'info'},'baseInfo']" @click="changeMode('info')">
                <Icon name="baseInfo" />
                <span>基础信息</span>
            </div>
            <div :class="[{selected:mode === 'control'},'robotControl']"  @click="changeMode('control')">
                <Icon name="greenMachine" />
                <span>机器控制</span>
            </div>
        </div>
        <BaseInfo v-show="mode === 'info'" />
        <RobotControl v-show="mode === 'control' " />
    </section>
</template>

<script >
    import Icon from '@/components/Icon.vue'
    import BaseInfo from "@/views/index/components/BaseInfo";
    import RobotControl from "@/views/index/components/RobotControl";
    export default {
        name: "RightSide",
        components:{
            Icon,
            BaseInfo,
            RobotControl
        },
        data(){
            return {
                mode:'info'
            }
        },
        methods:{
            // 基础信息与机器控制模式切换
            changeMode(mode){
                this.mode = mode
            }
        }
    }
</script>

<style lang="scss" scoped>
    .rightSide {
        width: 13.6vw;
        .headerSide {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
            height: 5.5vh;
            padding-bottom: 0.8vh;
            background: url('~@/assets/imgs/sonHeaderBg.png');
            background-size: 100% 100%;
            > div {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                background: url('~@/assets/imgs/selected.png');
                background-size: 100% 100%;
                min-width: 5.7vw;
                min-height: 3.2vh;
                opacity: 0.6;
                span {
                    margin-left: 0.3vw;
                }
            }
            .selected {
                opacity: 1;
                /deep/ #machine path {
                    fill:red;
                }
            }
        }
    }
</style>
