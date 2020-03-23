<template>
    <div class="taskDetail">
        <header>
            <div class="return" @click="goBack"></div>
            <div class="centerRoute">
                <div class="routeList" v-for="(list,index) in routerList" :key="index">{{list.name}}</div>
            </div>
            <div class="model">
                <span>浏览模式</span>
                <el-switch
                        v-model="value2"
                        active-color="#00FABF"
                        inactive-color="#00412f">
                </el-switch>
                <span>工作模式</span>
            </div>
        </header>
        <main>
            <section class="leftSide" >
                <SonHeader name="图片信息" :conditions="true" />
                <div class="tabHeader">
                    <div class="activeLine"></div>
                    <span :class="[{activeTab:list === activeName},'tabList']" v-for="(list,index) in tabTitleList" :key="index" @click="handleClick(list,index)">{{list}}</span>
                </div>
                <div class="tabPane" v-if="activeName === '缺陷图'">
                    <div :class="[{activeDefects:index === 1},'defects']" v-for="(list,index) in defectsList" :key="index">
                        <svg class="icon" aria-hidden="true" v-if="index === 0">
                            <use xlink:href="#icontubiaolv"/>
                        </svg>
                        <div class="yellowPicture" v-else-if="index === 1">
                            <img src="@/assets/icons/yellowPicture.svg" alt="" >
                        </div>
                        <svg class="icon" aria-hidden="true" v-else>
                            <use xlink:href="#icontupian"/>
                        </svg>
                        {{list.name}}
                    </div>
                </div>
                <div class="tabPane" v-if="activeName === '正常'">正常</div>
                <div class="tabPane" v-if="activeName === '误报'">误报</div>
                <div class="tabPane" v-if="activeName === '未检测'">未检测</div>
            </section>
            <section class="centerSection">
                <div class="centerHeader">
                    <div class="left">
                        <span class="name">
                            任务名称: <span>华台线测试(2)</span>
                        </span>
                        <span class="name">
                            当前图片:
                            <span>一A 横担.jpg</span>
                        </span>
                    </div>
                    <div class="right">
                        <div class="lineName">
                            <span>线路名: </span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="towerNum">
                            <span class="name">塔杆号:</span>
                            <el-select v-model="value1" multiple placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <span class="to">至</span>
                            <el-select
                                    v-model="value3"
                                    multiple
                                    collapse-tags
                                    style="margin-left: 20px;"
                                    placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="centerMain" >
                    <el-carousel :initial-index="initialIndex" arrow="always" height="69.2vh" :autoplay="false" ref="carousel" @change="handleCarouselChange">
                        <el-carousel-item v-for="item in carouselList" :key="item.id">
                            <img style="width: 100%;height: 100%;" :src="item.imgView" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="centerBottom">
                    <p>快捷键： <span>W/PgUp:上一张  S/PgDn:下一张  X/Delete: 删除选中缺陷；删除所有缺陷并切换到下一页</span> </p>
                </div>
            </section>
            <section class="rightSide">
                <div class="topBtn">
                    <div class="btn1">检测</div>
                    <div class="btn2">统计查看</div>
                    <div class="btn2">结果删选</div>
                </div>
                <div class="defectInfo">
                    <SonHeader name="缺陷信息" />
                    <div class="topInfo">
                        <div class="list">
                            <span>导线</span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="list">
                            <span>大小号侧</span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="list">
                            <span>详细信息</span>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <p>图中缺陷</p>
                    </div>
                    <div class="bottomInfo">
                        <el-checkbox v-model="checked1">显示图中全部缺陷</el-checkbox>
                        <el-checkbox v-model="checked2">细小金属缺销钉</el-checkbox>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script >
    import SonHeader from "@/components/SonHeader";
    export default {
        name: "taskDetail",
        components:{
            SonHeader
        },
        data(){
            return {
                tabTitleList:['缺陷图','正常','误报','未检测',],
                value2:false,
                activeName:'缺陷图',
                routerList:[
                    {
                        name:'智能分析',
                    },
                    {
                        name:'用户管理',
                    },
                    {
                        name:'基本信息',
                    }
                ],
                defectsList:[
                    {
                        name:'第九支塔杆'
                    },
                    {
                        name:'一B 横担.jpg'
                    },
                    {
                        name:'一B 连接点(2).jpg'
                    },
                    {
                        name:'一C 连接点(4).jpg'
                    },
                    {
                        name:'一C 连接点.jpg'
                    },
                    {
                        name:'二A 连接点.jpg'
                    },
                    {
                        name:'一C 金具.jpg'
                    },
                    {
                        name:'全塔.jpg'
                    },
                    {
                        name:'城奥一15#一C 绝缘子.jpg'
                    },
                    {
                        name:'城奥一15#一C 绝缘子.jpg'
                    },
                    {
                        name:'城奥一15#一C 绝缘子.jpg'
                    },
                    {
                        name:'城奥一15#一C 绝缘子.jpg'
                    },
                    {
                        name:'城奥一15#一C 绝缘子.jpg'
                    },
                    {
                        name:'城奥一15#一C 绝缘子.jpg'
                    },
                    {
                        name:'城奥一15#一C 绝缘子.jpg'
                    },
                    {
                        name:'城奥一15#一C 绝缘子.jpg'
                    },
                    {
                        name:'城奥一15#一C 绝缘子.jpg'
                    },
                    {
                        name:'城奥一15#一C 绝缘子.jpg'
                    },
                ],
                options: [
                    {
                    value: '选项1',
                    label: '黄金糕'
                },
                    {
                    value: '选项2',
                    label: '双皮奶'
                },
                    {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                    {
                    value: '选项4',
                    label: '龙须面'
                },
                    {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                value1: '',
                value3: '',
                initialIndex:0,
                currentIndex:0,
                checked1: true,
                checked2: false,
                carouselList:[
                    {
                        id:0,
                        imgView:require('@/assets/imgs/bodyBg.png')
                    },
                    {
                        id:1,
                        imgView:require('@/assets/imgs/btnBg1.png')
                    },
                    {
                        id:2,
                        imgView:require('@/assets/imgs/btnBg2.png')
                    },
                    {
                        id:3,
                        imgView:require('@/assets/imgs/headerBg.png')
                    },{
                        id:4,
                        imgView:require('@/assets/imgs/return.png')
                    },{
                        id:5,
                        imgView:require('@/assets/imgs/titleBg.png')
                    },


                ]
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            handleClick(list,index){
                this.activeName = list;
                let distance = 60/1920*100 * index;
                document.querySelector('.activeLine').style.transform = `translateX(${distance}vw)`;
            },
            handleKeyup(e){
                if(e.keyCode === 87) {
                    this.$refs.carousel.prev();
                }else if(e.keyCode === 83) {
                    this.$refs.carousel.next();
                }else if(e.keyCode === 27) {
                    this.carouselList.splice(this.currentIndex,1)
                }
            },
            handleCarouselChange(index){
                this.currentIndex = index
            }
        },
        mounted() {
            window.addEventListener('keyup',this.handleKeyup)
        },
        destroyed () {
            window.removeEventListener('keyup',this.handleKeyup)
        },
    }
</script>

<style>
    #icontupian path {
        fill:#00ffc0;
    }
    .el-select {
        width: 11.3vw;
    }
    .el-input__inner {
        background-color: #001919;
        border:1px solid #00a880;
        height: 2.6vh;
        border-radius: 0px;
    }
    .el-carousel__arrow {
        border-radius: 0;
        width: 2.6vw;
        height: 2.6vw;
        background-color: rgba(0,0,0,.5);
    }
    .el-carousel__arrow i {
        color: #00ffea;
        width: 1.6vw;
        height: 1.6vw;
        font-size: 2vw;
    }
    .el-select .el-input .el-select__caret {
        color:#00ffbf;
        display: flex;
        align-items: center;
    }
</style>

<style lang="scss" scoped>
.taskDetail {
    padding: 0 0.7vw;
    header {
        display: flex;
        justify-content: space-between;
        margin-top: 2.5vh;
        margin-bottom: 1.3vh;
        .return {
            width: 3.1vw;
            height: 1.8vw;
            background: url('~@/assets/imgs/return.png');
            background-size: 100% 100%;
            cursor: pointer;
        }
        .centerRoute {
            display: flex;
            margin-left: 8vw;
            .routeList {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 6.8vw;
                height: 2vw;
                margin-right: 1.3vw;
                background: url('~@/assets/imgs/titleBg.png');
                background-size: 100% 100%;
            }
        }
        .model {
            color: #00ffbf;
            /deep/ .el-switch__core {
                margin: 0 0.5vw;
            }
        }
    }
    main {
        display: flex;
        .leftSide {
            width: 13.6vw;
            margin-right: 1vw;
            .tabHeader {
                display: flex;
                justify-content: space-between;
                font-size: 0.6vw;
                padding:0.7vw 1.4vw 0.7vw 0.9vw;
                color:rgba(255,255,255,.5);
                position: relative;
                border-bottom: 2px solid rgba(0,255,191,.2);
                background-color: rgba(0,0,0,.7);
                .activeTab {
                    color: #00ffbf;
                }
                .activeLine {
                    width: 1.9vw;
                    height: 3px;
                    background-color: #00ffbf;
                    position: absolute;
                    bottom: -2px;
                    transition: all .5s;
                }
                .tabList {
                    cursor: pointer;
                }
            }
            .tabPane {
                background-color: rgba(0,0,0,.7);
                font-size: 0.6vw;
                .defects {
                    display: flex;
                    align-items: center;
                    height: 4.2vh;
                    border-bottom: 1px solid rgba(0,255,191,.2);
                    padding-left: 2.1vw;
                    .icon {
                        margin-right: 0.5vw;
                        width: 0.6vw;
                        height: 0.6vw;
                    }
                    &:first-child {
                        padding-left: 0.9vw;
                        .icon {
                            width: 0.9vw;
                            height: 2vh;
                        }
                    }
                }
                .activeDefects {
                    border-left: 2px solid #e4ff00;
                    color:#e4ff00;
                    background:linear-gradient(to right,rgba(228,255,0,0.5),rgba(228,255,0,0));
                    .yellowPicture {
                        width: 0.63vw;
                        height: 0.63vw;
                        margin-right: 0.5vw;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .centerSection {
            .centerHeader {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 69.2vw;
                height: 5.5vh;
                padding: 0 0.9vw 0 0.5vw;
                font-size: 0.6vw;
                background: linear-gradient(to bottom, rgba(0,255,191,.3),rgba(0,255,191,0));
                .left {
                    font-size: 0.7vw;
                    >span {
                        margin-right: 2.4vw;
                        span {
                            color: #00ffbf;
                        }
                    }
                }
                .right {
                    display: flex;
                    .lineName {
                        margin-right: 1.1vw;
                        > span {
                            margin-right: 0.9vw;
                        }
                    }
                    .towerNum {
                        >.name {
                                margin-right: .9vw;
                            }
                        > .to{
                                margin-left: 0.6vw;
                            }
                    }
                }
            }
            .centerMain {
                width: 69.2vw;
                height: 69.2vh;
            }
            .centerBottom {
                padding-top: 1vw;
                height: 11.7vh;
                background-color: rgba(0,0,0,.7);
                p {

                    font-size: 0.6vw;
                    text-align: right;
                    span {
                        color:#00ffbf;
                    }
                }
            }
        }
        .rightSide {
            margin-left: 1vw;
            .topBtn {
                display: flex;
                margin-bottom: 1.3vh;
                .btn1 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 3.1vw;
                    height: 3.2vh;
                    font-size: 0.7vw;
                    background: url('~@/assets/imgs/btnBg1.png');
                    background-size: 100% 100%;
                }
                .btn2 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 4.4vw;
                    height: 3.2vh;
                    font-size: 0.7vw;
                    margin-left: 0.8vw;
                    background: url('~@/assets/imgs/btnBg2.png');
                    background-size: 100% 100%;
                }
            }
            .defectInfo {
                height: 81.9vh;
                background-color: rgba(0,0,0,.7);
                .topInfo {
                    height: 18.8vh;
                    padding: 1.2vw 0.9vw 0.7vw 1.1vw;
                    border-bottom: 2px solid rgba(0,255,191,.2);
                    font-size: 0.6vw;
                    .list {
                        margin-bottom: 1.9vh;
                        &:first-child {
                            margin-left: 1.2vw;
                        }
                        span {
                            margin-right: 0.9vw;
                        }
                        /deep/.el-select {
                            width: 8.1vw;
                        }
                    }
                    p {
                        font-size: 0.7vw;
                    }
                }
                .bottomInfo {
                    padding-top: 1vw;
                    padding-left: 1.2vw;
                    font-size: 0.6vw;
                    /deep/ .el-checkbox{
                        margin-bottom: 1.3vw;
                        .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                            background-color: #001919;
                            border-color: #00a880;
                        }
                        .el-checkbox__inner::after {
                            border-color:#00ffbf;
                        }
                        .el-checkbox__input.is-checked+.el-checkbox__label {
                            color: #fff;
                        }
                        .el-checkbox__inner {
                            background-color: #001919;
                            border: 1px solid #00a880;
                        }
                        .el-checkbox__label {
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
}
</style>
