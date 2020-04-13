<template>
    <div class="basicInfoWrapper">
        <div class="basicList">
            <header>
                基础数据
            </header>
            <div class="basicContent">
                <div :key="index" class="basicDataList" v-for="(list,index) in basicDataList">
                    <span>{{list.name}}</span>
                    <div class="img">
                        <vECharts :options="list.options" v-if="list.options"/>
                        <img src="@/assets/imgs/line.png" v-if="list.name === '线路类型'">
                        <img src="@/assets/imgs/machine.png" v-if="list.name === '对应机器'" >
                        <img class="round" src="@/assets/imgs/roundBg.png">
                    </div>
                    <span class="blueColor" v-if="typeof list.num === 'string'">{{list.num}}</span>
                </div>
            </div>
        </div>
        <div class="basicList">
            <header>
                今日巡检任务
            </header>
            <div class="taskWrapper">
                <div class="taskTitle">
                    <span>任务名称</span>
                    <span>任务描述</span>
                    <span>执行状态</span>
                </div>
                <div class="taskContent">
                    <div :key="index" class="taskList" v-for="(list,index) in taskList">
                        <span>{{list.name}}</span>
                        <span>{{list.desc}}</span>
                        <Icon name="success" v-if="list.isCompleted"/>
                        <Icon name="fail" v-else/>
                    </div>
                </div>
            </div>
        </div>
        <div class="basicList">
            <header>
                巡检趋势
            </header>
            <div class="basicContent">
                <div id="lineChart"></div>
            </div>
        </div>
        <div class="basicList">
            <header>
                系统日志
            </header>
            <div class="logWrapper">
                <div :key="index" class="logContent" v-for="(list,index) in logList">
                    <div class="logImg"></div>
                    <div class="logDetail">
                        <div class="logTop">
                            <span class="id">编号: {{list.id}}</span>
                            <span class="status">状态: <span>{{list.status}}</span></span>
                        </div>
                        <div class="logBottom">
                            <span class="time">时间: {{list.time}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Icon from '@/components/Icon.vue';

    const echarts = require('echarts/lib/echarts');
    import 'echarts-liquidfill'
    import vECharts from "vue-echarts";

    require('echarts/lib/chart/line');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: "BaseInfo",
        components: {
            vECharts,
            Icon
        },
        data() {
            return {
                logList: [
                    {
                        logImg: '',
                        id: '012',
                        status: '已完成',
                        time: '2020-02-18 12:22:30'
                    },
                    {
                        logImg: '',
                        id: '012',
                        status: '已完成',
                        time: '2020-02-18 12:22:30'
                    }, {
                        logImg: '',
                        id: '012',
                        status: '已完成',
                        time: '2020-02-18 12:22:30'
                    }

                ],
                basicDataList: [
                    {
                        name: '线路长度(km)',
                        options: {
                            title: {
                                text: 200,
                                textStyle: {
                                    fontSize: 12,
                                    fontFamily: 'Microsoft Yahei',
                                    fontWeight: 'normal',
                                    color: 'rgb(11,43,64)',
                                    rich: {
                                        a: {
                                            fontSize: 14,
                                        }
                                    }
                                },
                                x: 'center',
                                y: '30%'
                            },
                            series: [{
                                type: 'liquidFill',
                                radius: '80%',
                                center: ['50%', '50%'],
                                //  shape: 'roundRect',
                                data: [0.75, 0.75, 0.75],
                                backgroundStyle: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 1,
                                            color: 'rgb(0,255,190)'
                                        }, {
                                            offset: 0.5,
                                            color: 'rgb(0, 0, 0)'
                                        }, {
                                            offset: 0,
                                            color: 'rgb(0,255,190)'
                                        }],
                                        globalCoord: false
                                    },
                                },
                                outline: {
                                    borderDistance: 0,
                                    itemStyle: {
                                        borderWidth: 1,
                                        borderColor: '#00ffbe',

                                    }
                                },
                                color: '#00ffbe',
                                label: {
                                    normal: {
                                        formatter: '',
                                    }
                                }
                            }]
                        },
                        num: 10
                    },
                    {
                        name: '覆盖范围',
                        options: {
                            title: {
                                text: 200,
                                textStyle: {
                                    fontSize: 12,
                                    fontFamily: 'Microsoft Yahei',
                                    fontWeight: 'normal',
                                    color: 'rgb(11,43,64)',
                                    rich: {
                                        a: {
                                            fontSize: 14,
                                        }
                                    }
                                },
                                x: 'center',
                                y: '30%'
                            },
                            series: [{
                                type: 'liquidFill',
                                radius: '80%',
                                center: ['50%', '50%'],
                                //  shape: 'roundRect',
                                data: [0.75, 0.75, 0.75],
                                backgroundStyle: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 1,
                                            color: 'rgb(0,255,190)'
                                        }, {
                                            offset: 0.5,
                                            color: 'rgb(0, 0, 0)'
                                        }, {
                                            offset: 0,
                                            color: 'rgb(0,255,190)'
                                        }],
                                        globalCoord: false
                                    },
                                },
                                outline: {
                                    borderDistance: 0,
                                    itemStyle: {
                                        borderWidth: 1,
                                        borderColor: '#00ffbe',

                                    }
                                },
                                color: '#00ffbe',
                                label: {
                                    normal: {
                                        formatter: '',
                                    }
                                }
                            }]
                        },
                        num: 40
                    },
                    {
                        name: '对应机器',
                        num: '编号一'
                    },
                    {
                        name: '线路类型',
                        num: '类型一'
                    },
                ],
                taskList: [
                    {
                        name: '任务一',
                        desc: '漏电巡检',
                        isCompleted: false
                    },
                    {
                        name: '任务二',
                        desc: '漏电巡检',
                        isCompleted: true
                    },
                    {
                        name: '任务三',
                        desc: '维修巡检',
                        isCompleted: true
                    },
                    {
                        name: '任务四',
                        desc: '漏电巡检',
                        isCompleted: true
                    },
                    {
                        name: '任务五',
                        desc: '漏电巡检',
                        isCompleted: true
                    },
                ],
                lineOption: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        show: false,
                        data: ['老化', '漏电']
                    },
                    grid: {
                        left: '0%',
                        right: '5%',
                        top: '0%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                color: '#fff'
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: "rgba(255,255,255,.1)"
                                }
                            },
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月',]
                        }
                    ],
                    yAxis: [
                        {
                            show: false,
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '老化',
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                                color: '#00ff36'
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#00ff36'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,255,54,0)'
                                }])
                            },
                            data: [120, 132, 101, 300, 90, 230, 210, 120, 132, 101, 300, 90, 230, 210]
                        },
                        {
                            name: '漏电',
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                                color: '#00eaed'
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#00a0e9'
                                }, {
                                    offset: 1,
                                    color: 'rgba(15,47,80,0)'
                                }])
                            },
                            data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310]
                        }
                    ]
                },
            }
        },
        mounted() {
            this.drawLine()
        },
        methods: {
            // 渲染折线图
            drawLine() {
                let myChart = echarts.init(document.getElementById('lineChart'));
                myChart.setOption(this.lineOption);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .basicInfoWrapper {
        height: 86.3vh;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.7);

        .basicList {
            header {
                display: flex;
                align-items: center;
                height: 3.9vh;
                font-size: 0.7vw;
                padding-left: 1.1vw;
                border-bottom: 2px solid rgba(0, 255, 234, .2);
            }
            .basicContent {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                font-size: 0.6vw;
                margin-top: 0.8vw;
                .basicDataList {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    margin-right: 3.4vw;
                    //margin-bottom: 1.2vh;
                    text-align: center;
                    //width: 3.6vw;
                    .img {
                        margin-top: 1.1vh;
                        position: relative;
                        z-index: 1;
                        /deep/ .echarts {
                            width: 3.6vw;
                            height: 5.6vh;
                        }
                        .round {
                            position: absolute;
                            left: 0.2vw;
                            bottom: -1vh;
                            z-index: 0;
                        }
                    }
                    .blueColor {
                        color: #00ffbe;
                        margin-top: 1vh;
                    }
                    &:nth-child(2) {
                        margin-right: 0;
                    }

                    &:nth-child(3) {
                        width: 3.6vw;
                        margin-top: 1.7vh;
                        .img {
                            .round {
                                left: -0.6vw;
                            }
                        }
                    }

                    &:nth-child(4) {
                        width: 3.6vw;
                        margin-right: 0;
                        margin-top: 1.7vh;
                        .img {
                            .round {
                                left: -0.6vw;
                            }
                        }
                    }
                }
            }

            .taskWrapper {
                font-size: 0.6vw;

                .taskTitle {
                    color: #00ffbe;
                    padding: 0 0.9vw 0 1.1vw;
                    margin: 1.4vh 0;

                    span {
                        margin-right: 2vw;

                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }

                .taskContent {
                    padding: 0 1.9vw 0 1.4vw;

                    .taskList {
                        margin-bottom: 1vh;

                        span {
                            margin-right: 2.5vw;
                        }
                    }
                }
            }

            #lineChart {
                width: 12vw;
                height: 11.5vh;
            }

            .logWrapper {
                padding: 1.9vh 0.9vw 0vh 1.1vw;

                .logContent {
                    display: flex;
                    margin-bottom: 0.7vw;

                    .logImg {
                        width: 2.6vw;
                        height: 4.6vh;
                        border: 1px solid red;
                        margin-right: 0.8vw;
                    }

                    .logDetail {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        font-size: 0.6vw;

                        .logTop {
                            .id {
                                margin-right: 1.4vw;
                            }

                            .status {
                                span {
                                    color: #00ffbe;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
