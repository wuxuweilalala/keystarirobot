<template>
    <div class="inspectionWrapper">
        <RouteHeader />
        <div class="inspectionContent">
            <header>
                <div class="left">
                    <span>当前正在运行任务数：</span>
                    <span class="num">0</span>
                </div>
                <div class="right">
                    <div class="inputWrapper">
                        <input type="text" placeholder="按任务、线路名称搜索">
                        <Icon name="search" class="refresh" />
                    </div>
                    <Icon name="refresh" class="refresh" />
                    <div class="add">+</div>
                </div>
            </header>
            <div class="inspectionTable">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="taskName"
                            label="任务名称"
                            :width="width1"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <Icon name="bottomArrow" />
                            <span>{{scope.row.taskName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="lineName"
                            label="线路名"
                            :width="width1"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="currentRun"
                            label="当前运行"
                            :width="width1"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="total"
                            label="历史累计"
                            :width="width1"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <span  @click="toDetail(scope)">{{scope.row.total}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            :width="width2"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <el-switch
                                    v-model="scope.row.status"
                                    active-color="#00FABF"
                                    inactive-color="#00412f">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="progress"
                            label="监测进度"
                            header-align="center"
                            :width="width3"
                    >
                        <template slot-scope="scope">
                            <el-progress :percentage="scope.row.progress" />
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            :width="width4"
                            align="right"
                    >
                        <template >
                            <Icon name="edit" />
                            <Icon name="upLoad" />
                            <Icon name="downLoad" />
                            <Icon name="delete" />
                        </template>
                    </el-table-column>
                </el-table>
                <div class="inspectionTableContent">
                    <div class="inspectionTableList"></div>
                </div>
            </div>
            <el-pagination
                    layout="prev, pager, next"
                    :total="50">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import Icon from '@/components/Icon.vue'
    import RouteHeader from "@/components/RouteHeader.vue";
    export default {
        name: "inspection",
        components:{
            RouteHeader,Icon
        },
        data(){
            return {
                tableData: [
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:true,
                        progress:70,
                        },
                    {
                        id:2,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:true,
                        progress:100,
                    },
                    {
                        id:2,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:true,
                        progress:100,
                    },
                    {
                        id:2,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:true,
                        progress:100,
                    },
                    {
                        id:2,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:true,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:false,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:false,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:false,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:false,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:true,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:false,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:false,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:true,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:false,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:false,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:false,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:true,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:false,
                        progress:100,
                    },
                    {
                        id:1,
                        date: '2016-05-02',
                        taskName: '华台线测试(2)',
                        lineName:'测试线路',
                        currentRun:'136/556',
                        total:'136/556',
                        status:false,
                        progress:100,
                    }
                ],
                width1:230/1920*window.document.body.clientWidth, // 适配各种屏幕宽度
                width2:280/1920*window.document.body.clientWidth,
                width3:300/1920*window.document.body.clientWidth,
                width4:304/1920*window.document.body.clientWidth,
            }
        },
        methods:{
            toDetail(scope){
                this.$router.push(`/taskDetail/${scope.row.id}`)
            }
        }
    }
</script>
<style lang="scss">
    .el-progress-bar__outer {
        background-color: unset;
    }
    .el-pagination {
        position: absolute;
        bottom: 3.8vh;
        left: 50%;
        transform: translateX(-50%);
    }
    .el-pagination .btn-next, .el-pagination .btn-prev {
        background-color: unset;
        border: solid 1px #00ffbf;
        color:#00ffbf;
    }
    .el-dialog, .el-pager li {
        background-color: unset;
        border: solid 1px #00ffbf;
        color:#fff;
    }
    .el-pager li.active {
        background-color: rgba(0,255,191,.8);
        color: white;
    }
    .el-pagination button:disabled {
        background-color: unset;
        border: solid 1px #00ffbf;
    }
    #icondelete path {
        fill:#fff;
    }
    #iconshangchuan path {
        fill:#fff;
    }
    #iconxiazai path {
        fill:#fff;
    }
    #iconshuaxin path{
        fill: white;
    }
    #iconsousuo path{
        fill: #00ffc0;
    }
    .has-gutter {
        tr {
            th {
                &:nth-child(7) {
                    div {
                        padding-right: 3.75vw;
                    }
                }
            }
        }
    }
    .el-table::before {
        display: none;
    }
    .el-table, .el-table__expanded-cell {
        background-color: unset;
    }
    .el-table td, .el-table th.is-leaf {
        border: none;
    }
    .el-table thead {
        color:#00ffbf;
        th {
            font-weight: normal!important;
        }
    }
    .el-table__body-wrapper {
        color:#fff;
    }
    .el-table th, .el-table tr {
        background: rgba(0,255,191,.3);
        height: 3.7vh;
    }
    .el-table td, .el-table th {
        padding: 0!important;
    }
    .el-table__row {
        &:nth-child(even) {
            background: rgba(0,255,191,.05)!important;
        }
        &:nth-child(odd) {
            background: rgba(0,0,0,0.3)!important;
        }
    }
    .el-table__body tr:hover>td{
        background-color: unset!important;
    }
    .el-table__row {
        td {
            &:nth-child(1) {
                .cell {
                    position: relative;
                    .icon {
                        position: absolute;
                        left: 30px;
                        top: 10%;
                        transform: rotate(-90deg);
                    }
                }
            }
            &:nth-child(4) {
                color:#00ffbf;
                cursor: pointer;
            }
            &:nth-child(7) {
                .cell {
                    display: flex;
                    padding-right: 3vw;
                    justify-content: flex-end;
                }
            }
        }
    }
    .cell {
        .icon {
            margin-right: 0.8vw;
            img {
                width: 100%;
                height: 100%;
            }
            &:nth-child(1) {
                width: 13px;
                height: 16px;
            }
            &:nth-child(2) {
                width: 15px;
                height: 15px;
            }
            &:nth-child(3) {
                width: 15px;
                height: 15px;
            }
            &:nth-child(4) {
                width: 15px;
                height: 15px;
            }
        }
    }
    .el-switch__core {
        border-color: #00ffbf!important;
    }
    .el-progress-bar__inner {
        background-color:rgba(0,255,191,0.5);
    }
    .el-progress__text {
        color:#fff;
    }
</style>
<style lang="scss" scoped>
    .inspectionWrapper {
        /deep/.routeWrapper{
            margin-top: 1.59vh;
        }
        .inspectionContent {
            margin:1.6vw 2.9vw 0 2.9vw;
            header {
                display: flex;
                justify-content: space-between;
                .left {
                    font-size: 0.8vw;
                    .num {
                        color:#00ffea;
                    }
                }
                .right {
                    display: flex;
                    align-items: center;
                    .inputWrapper {
                        position: relative;
                        margin-right: 0.7vw;
                        input {
                            padding-left: 0.8vw;
                            width: 16vw;
                            height: 1.4vw;
                            background: #001a19;
                            border: 1px solid #00a880;
                            font-size: 0.7vw;
                            color:rgba(255,255,255,0.3);
                        }
                        .icon {
                            position: absolute;
                            right: 0.6vw;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }
                    .refresh {
                        width: 0.7vw;
                        height: 0.7vw;
                        margin-right: 0.8vw;
                    }
                    .add {
                        display: flex;
                        width: 0.9vw;
                        height: 0.9vw;
                        font-size: 1.2vw;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 0.3vw;
                    }
                }
            }
            .inspectionTable {
                margin-top: 1vh;
            }
        }
    }
</style>
