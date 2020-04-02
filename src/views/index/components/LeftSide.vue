<template>
    <section class="leftSide">
        <div class="topList">
            <SonHeader name="线路信息"  rightIcon="left" />
            <div class="listTitle">
                <span>路段名称</span>
                <span>塔杆数</span>
                <span>操作</span>
                <img src="" alt="">
            </div>
            <div class="listContentWrapper">
                <div :class="[{activeList:currentLineIndex === index},'list']" v-for="(list,index) in lineList" @click="chooseLine(index)" :key="index">
                    <div class="listLeft">
                        <Icon name="yellowLine" v-if="currentLineIndex === index"/>
                        <Icon name="greenLine" v-else/>
                        <span>{{list.name}}</span>
                    </div>
                    <div class="listCenter">{{list.num}}</div>
                    <div class="listRight">
                        <Icon name="greenEdit"/>
                        <Icon name="add"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottomList">
            <SonHeader name="实时预警" rightIcon="left" />
            <div class="listTitle">
                <span>告警类型</span>
                <span>告警描述</span>
                <span>时间</span>
            </div>
            <div class="listContentWrapper">
                <vueSeamless :data="warningList" :class-option="seamlessOptions" >
                    <div :class="[{activeList:currentWarnIndex === index},'list']" v-for="(list,index) in warningList" @click="chooseWarn(index)" :key="index">
                        <div class="listLeft">
                            <Icon name="success" v-if="list.isCompleted"/>
                            <Icon name="fail" v-else/>
                            <span>{{list.type}}</span>
                        </div>
                        <div class="listCenter">{{list.desc}}</div>
                        <div class="listRight">
                            {{list.time}}
                        </div>
                    </div>
                </vueSeamless>
            </div>
        </div>
    </section>
</template>

<script>
    import SonHeader from "@/components/SonHeader.vue";
    import vueSeamless from 'vue-seamless-scroll';
    import Icon from '@/components/Icon.vue'
    export default {
        name: "LeftSide",
        data(){
            return {
                lineList: [
                    {
                        name:'线路一',
                        num:4
                    },
                    {
                        name:'线路二',
                        num:4
                    },
                    {
                        name:'线路三',
                        num:4
                    },
                    {
                        name:'线路四',
                        num:4
                    },
                    {
                        name:'线路五',
                        num:4
                    },
                    {
                        name:'线路六',
                        num:4
                    },
                    {
                        name:'线路七',
                        num:4
                    },
                    {
                        name:'线路八',
                        num:4
                    },
                ],
                warningList:[
                    {
                        icon:'',
                        type:'设备维修',
                        desc:'第13杆漏电',
                        time:'02/18 15:36',
                        isCompleted:true
                    },
                    {
                        icon:'',
                        type:'设备维修',
                        desc:'第13杆漏电',
                        time:'02/18 15:36',
                        isCompleted:false
                    },
                    {
                        icon:'',
                        type:'设备维修',
                        desc:'第13杆漏电',
                        time:'02/18 15:36',
                        isCompleted:false
                    },
                    {
                        icon:'',
                        type:'设备维修',
                        desc:'第13杆漏电',
                        time:'02/18 15:36',
                        isCompleted:true
                    },
                    {
                        icon:'',
                        type:'设备维修',
                        desc:'第13杆漏电',
                        time:'02/18 15:36',
                        isCompleted:false
                    },
                    {
                        icon:'',
                        type:'设备维修',
                        desc:'第13杆漏电',
                        time:'02/18 15:36',
                        isCompleted:false
                    },
                    {
                        icon:'',
                        type:'设备维修',
                        desc:'第13杆漏电',
                        time:'02/18 15:36',
                        isCompleted:false
                    },
                    {
                        icon:'',
                        type:'设备维修',
                        desc:'第13杆漏电',
                        time:'02/18 15:36',
                        isCompleted:true
                    }
                ],
                currentLineIndex:-1,
                currentWarnIndex:-1,
            }
        },
        computed:{
            seamlessOptions(){
                return {
                    step: 0.5,
                    limitMoveNum: 5
                }
            }
        },
        components:{
            SonHeader,
            vueSeamless,
            Icon
        },
        methods:{
            chooseLine(index) {
                this.currentLineIndex = index;
            },
            chooseWarn(index){
                this.currentWarnIndex = index;
            }
        }
    }
</script>
<!--<style>
    #greenEdit path {
        fill:#00ffbf;
    }
</style>-->
<style lang="scss" scoped>
    .leftSide {
        width: 13.6vw;
        margin-left: 0.7vw;
        margin-right: 1vw;
        .listTitle {
            color: #fff;
            font-size: 0.7vw;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:0 1.8vw;
            border-bottom: 1px solid rgba(0,255,234,.2);
            background-color: rgba(0,0,0,.7);
        }
        .listContentWrapper {
            background-color: rgba(0,0,0,.7);
            overflow: scroll;
            &::-webkit-scrollbar {display:none}
            .list {
                color: #fff;
                font-size: 0.6vw;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 4.3vh;
                padding:0 1.4vw 0 0.9vw;
                border-bottom: 1px solid rgba(0,255,234,.2);
                .listLeft {
                    .icon {
                        width: 0.9vw;
                        height: 2vh;
                        margin-right: 0.5vw;
                    }
                }
                .listCenter {
                    margin-left: 1vw;
                }
                .listRight {
                    .icon {
                        width: 0.7vw;
                        height: 0.7vw;
                        margin-left: 0.8vw;
                    }
                }
            }
        }
        .topList {
            margin-bottom: 1.9vh;
            .listTitle {
                height: 3.6vh;
            }
            .listContentWrapper {
                height: 36.2vh;

                .list {
                    cursor: pointer;
                }
                .activeList {
                    border-left: 2px solid #e4ff00;
                    color:#e4ff00;
                    background:linear-gradient(to right,rgba(228,255,0,0.5),rgba(228,255,0,0));
                }

            }
        }
        .bottomList {
            .listTitle {
                height: 3.8vh;
            }
            .listContentWrapper {
                height: 34.91vh;
                .list {
                    padding: 0 0.6vw;
                    font-size: 0.6vw;
                    border:none;
                    height: 4.2vh;
                    margin-bottom: 0.2vh;
                    .listLeft {
                        .icon {
                            width: 0.6vw;
                            height: 1.1vh;
                            margin-right: 0.3vw;
                        }
                    }
                }
                .activeList {
                    border-left: 2px solid #ff0000;
                    background:linear-gradient(to right,rgba(255,0,0,.3),rgba(255,0,0,0));
                }
            }
        }
    }
</style>
