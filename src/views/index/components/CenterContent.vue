<template>
    <section class="centerContent">
        <RouteHeader/>
        <div class="mapWrapper">
            <div class="video" v-if="videoShow">
                <EasyPlayer
                        :videoUrl="video1"
                        auto-play
                        live
                />
            </div>
            <div :class="[{miniTwoMap:videoShow},'twoMap']" @click.stop.prevent="twoMapShow"
                 v-show="twoShow || videoShow">
                <div id="map">
                </div>
            </div>
            <div class="threeMap" id="threeMap" v-show="threeShow">
                <div class="trailer" v-show="miniVideoShow">
                    <!--<EasyPlayer
                            videoUrl="rtmp://121.46.4.233:1936/stream/live2"
                            live
                            auto-play
                    />-->
                </div>
            </div>
        </div>
        <div class="equipmentWrapper">
            <swiper :options="swiperOption" class="swiper">
                <swiper-slide
                        :key="index"
                        class="equipment"
                        v-for="(list,index) in equipmentList"
                >
                    <header>
                        <span>{{index}}.{{list.name}}</span>
                    </header>
                    <div class="equipmentImgWrapper">
                        <div class="equipmentImg">
                            <EasyPlayer
                                    aspect="16:10"
                                    auto-play
                                    live
                                    ref="myPlayer"
                                    videoUrl="rtmp://202.69.69.180:443/webcast/bshdlive-pc"
                            />
                        </div>
                        <div class="equipmentIcon">
                            <img alt="" src="@/assets/imgs/videoBtn.png">
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
        </div>
    </section>
</template>
<script>
    let map = null;
    let viewer = null;
    let topLine = null;
    let bottomLine = null;
    let robot = null;
    import EasyPlayer from '@easydarwin/easyplayer';
    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import RouteHeader from "@/components/RouteHeader";
    import 'ol/ol.css';
    import Map from 'ol/Map';
    import Feature from 'ol/Feature';
    import {LineString, Point} from 'ol/geom';
    import {fromLonLat} from 'ol/proj';
    import View from 'ol/View';
    import TileLayer from 'ol/layer/Tile';
    import {Vector as VectorLayer} from 'ol/layer';
    import {Vector as VectorSource} from 'ol/source';
    import {Fill, Text, Icon, Stroke, Style} from 'ol/style';
    import XYZ from 'ol/source/XYZ';

    export default {
        name: "CenterContent",
        components: {
            RouteHeader,
            Swiper,
            SwiperSlide,
            EasyPlayer
        },
        computed: {
            lineName() {
                return this.$store.getters.getLineName
            }
        },
        data() {
            return {
                equipmentList: [
                    {
                        name: '设备一号',
                        img: '',
                    },
                    {
                        name: '设备一号',
                        img: '',
                    },
                    {
                        name: '设备一号',
                        img: '',
                    },
                    {
                        name: '设备一号',
                        img: '',
                    },
                    {
                        name: '设备一号',
                        img: '',
                    },
                ],
                swiperOption: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    direction: 'horizontal',
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        resize: () => {
                            this.$refs.swiper.$swiper.changeDirection(
                                window.innerWidth <= 960
                                    ? 'vertical'
                                    : 'horizontal'
                            )
                        }
                    }
                },
                twoShow: true,
                miniTwoShow: false,
                videoShow: false,
                threeShow: false,
                video1: 'rtmp://121.46.4.233:1936/stream/live2',
                testVideoUrl: 'rtmp://202.69.69.180:443/webcast/bshdlive-pc',
                miniVideoShow: false,
                twoMap: null,
                currentTower: [],
                vcLayer: null,
                testPointData: [
                    {
                    "name": "数据接收网桥",
                    "position": [122.1143738349002, 30.125011306697886]
                }, {"name": "舟山变门架（162）", "position": [122.11440559999998, 30.124911110000006]}, {
                    "name": "洛威1#（161）",
                    "position": [122.1134333, 30.124572219999987]
                }, {
                    "name": "洛威2#（160）",
                    "position": [122.11283610000001, 30.123019440000004]
                }, {
                    "name": "洛威3#（159&AP11）",
                    "position": [122.10862499999999, 30.12093888999999]
                }, {"name": "洛威4#（158）", "position": [122.10749720000004, 30.11845556]}, {
                    "name": "洛威5#（157）",
                    "position": [122.1073611, 30.116694439999986]
                }, {"name": "洛威6#（156）", "position": [122.10718060000002, 30.114336109999996]}, {
                    "name": "洛威7#（155）",
                    "position": [122.10699170000001, 30.111916669999992]
                }, {"name": "洛威8#（154&AP10）", "position": [122.10692500000002, 30.11106389]}, {
                    "name": "洛威9#（153）",
                    "position": [122.09871940000001, 30.107091669999992]
                }, {
                    "name": "洛威10#（152&AP9）",
                    "position": [122.09319169999999, 30.104413890000004]
                }, {
                    "name": "洛威11#（151）",
                    "position": [122.08934720000002, 30.10277499999999]
                }, {
                    "name": "洛威12#（150&AP8）",
                    "position": [122.08425280000004, 30.100599999999996]
                }, {"name": "洛威13#（149）", "position": [122.0809778, 30.09920278]}, {
                    "name": "洛威14#（148&AP7）",
                    "position": [122.07417500000004, 30.0963]
                }, {"name": "洛威15#（147）", "position": [122.0698194, 30.09444166999999]}, {
                    "name": "洛威16#（146&AP6）",
                    "position": [122.0645222, 30.095291669999998]
                }, {"name": "洛威17#（145）", "position": [122.0586167, 30.096236109999992]}, {
                    "name": "洛威18#（144&AP5）",
                    "position": [122.05500000000002, 30.097666670000006]
                }, {"name": "洛威19#（143）", "position": [122.05132780000001, 30.099116670000008]}, {
                    "name": "洛威20#（142）",
                    "position": [122.04439720000005, 30.10208889]
                }, {
                    "name": "洛威21#（141&AP4）",
                    "position": [122.03748610000002, 30.105052779999994]
                }, {"name": "洛威22#（140）", "position": [122.03620000000001, 30.105019439999992]}, {
                    "name": "洛威23#（139）",
                    "position": [122.03053060000003, 30.104877780000002]
                }, {"name": "洛威24#（138）", "position": [122.0291972, 30.10451389]}, {
                    "name": "洛威25#（137&AP3）",
                    "position": [122.0249806, 30.103361109999998]
                }, {
                    "name": "洛威26#（136）",
                    "position": [122.01941669999998, 30.101838889999986]
                }, {"name": "洛威27#（135&AP2）", "position": [122.01295830000001, 30.100075]}, {
                    "name": "洛威28#（134）",
                    "position": [122.01134170000002, 30.100099999999994]
                }, {
                    "name": "洛威29#（133）",
                    "position": [122.00271390000002, 30.100227779999997]
                }, {"name": "洛威30#（132&AP1）", "position": [121.9962722, 30.100325000000005]}, {
                    "name": "洛威31#（131）",
                    "position": [121.99441110000001, 30.10141111000001]
                }, {"name": "洛威32#（130）", "position": [121.9911889, 30.101344439999995]}, {
                    "name": "洛威33#（129）",
                    "position": [121.9865139, 30.101249999999993]
                }, {"name": "洛威34#（128）", "position": [121.97318889999998, 30.10097499999999]}, {
                    "name": "洛威35#（127）",
                    "position": [121.9705806, 30.10092222]
                }, {"name": "洛威36#（126）", "position": [121.9546889, 30.104022220000008]}, {
                    "name": "洛威37#（125）",
                    "position": [121.94505829999999, 30.106080560000002]
                }, {"name": "洛威38#（122）", "position": [121.9417972, 30.10545]}, {
                    "name": "洛威39#（121）",
                    "position": [121.9331972, 30.10313889]
                }, {"name": "洛威40#（120）", "position": [121.931025, 30.102733329999992]}, {
                    "name": "洛威41#（119）",
                    "position": [121.92592780000001, 30.10178333000001]
                }, {"name": "洛威42#（118）", "position": [121.9224528, 30.09905555999999]}, {
                    "name": "洛威43#（117）",
                    "position": [121.9197972, 30.09696943999999]
                }, {"name": "洛威44#（116）", "position": [121.9177222, 30.09717778]}, {
                    "name": "洛威45#（115）",
                    "position": [121.91406390000004, 30.098855560000008]
                }, {"name": "洛威46#（114）", "position": [121.90949720000002, 30.096341670000008]}, {
                    "name": "洛威47#（113）",
                    "position": [121.88621670000003, 30.083522220000006]
                }, {"name": "洛威48#（112）", "position": [121.87732024000002, 30.07862149]}, {
                    "name": "洛威49#（111）",
                    "position": [121.87347780000002, 30.0775]
                }, {"name": "洛威50#（110）", "position": [121.86837220000002, 30.076952780000003]}, {
                    "name": "洛威51#（109）",
                    "position": [121.86634169999999, 30.076733329999996]
                }, {"name": "洛威52#（108）", "position": [121.8633389, 30.07641111]}, {
                    "name": "洛威53#（107）",
                    "position": [121.86128890000003, 30.07666389000001]
                }, {"name": "洛威54#（106）", "position": [121.8540056, 30.077558329999995]}, {
                    "name": "洛威55#（105）",
                    "position": [121.8499611, 30.077925]
                }, {"name": "洛威56#（104）", "position": [121.83909170000004, 30.077330559999996]}, {
                    "name": "洛威57#（103）",
                    "position": [121.83413890000001, 30.07961389]
                }, {"name": "洛威58#（102）", "position": [121.82920280000002, 30.078922219999995]}, {
                    "name": "洛威59#（101）",
                    "position": [121.82593890000001, 30.078463890000002]
                }, {"name": "舟山终端站（100）", "position": [121.82414720000001, 30.07806389]}]
            }
        },
        watch: {
            // 监听 name 变化，二维地图 三维地图相对应改变
            lineName(val) {
                // 二维地图展现 三维地图隐藏
                this.twoShow = true;
                this.threeShow = false;
                this.$get("eprdms//tower/selectTowers", {
                    lineName: val
                }).then(
                    res => {
                        const pointData = [];
                        const positionArr = [];
                        const pointFeatureArr = [];
                        // 数据处理 拿到 tower 经纬度以及 name 换成地图需要使用的数组格式
                        for (let i of res.rows) {
                            let obj = {
                                "name": i.remake,
                                "position": [i.longitude, i.latitude]
                            }
                            pointData.push(obj)
                        }
                        this.testPointData = pointData;


                        // 增加新线路
                        // 先移除上一次的 layer
                        map.removeLayer(this.vcLayer);

                        this.testPointData.forEach((item, index) => {
                            positionArr.push(fromLonLat(item.position));
                            const mapPoint = new Feature(new Point(fromLonLat(item.position)));
                            // 设置文字
                            this.setMapPointImg(mapPoint, index, item.name, this.testPointData.length);
                            // 设置点
                            pointFeatureArr.push(mapPoint)
                        });
                        // 设置黄线
                        const lineFeature = new Feature(new LineString([...positionArr]));
                        const vcLayer = new VectorLayer({
                            source: new VectorSource({
                                features: [lineFeature, ...pointFeatureArr]
                            }),
                            style: new Style({
                                stroke: new Stroke({
                                    width: 3,
                                    color: [255, 255, 0, 1]
                                }),
                            })
                        });
                        // 增加新图层
                        map.addLayer(vcLayer);

                        //  切换地图中心点
                        if (positionArr.length !== 0) {
                            map.getView().setCenter(positionArr[0])
                        }
                    }
                );
            }
        },
        mounted() {
            this.twoShow ? this.mapInit() : this.webglInit();
            this.webglInit()
            /* this.mapInit();
             this.webglInit();*/
        },
        methods: {
            //  2d 地图与视频切换
            twoMapShow() {
                this.twoShow = true;
                this.videoShow = false;
                this.video1 = this.testVideoUrl
            },
            // 2d 地图
            mapInit() {
                const positionArr = [];
                const pointFeatureArr = [];
                // 离线地图
                const raster = new TileLayer({
                    source: new XYZ({
                        tileUrlFunction: function (tileCoord, pixelRatio, proj) {
                            var z = tileCoord[0];
                            var x = tileCoord[1];
                            var y = tileCoord[2];

                            // 百度瓦片服务url将负数使用M前缀来标识
                            if (x < 0) {
                                x = -x;
                            }
                            if (y < 0) {
                                y = -y;
                            }
                            return "http://192.168.1.146:8000/wx/" + z + "/" + x + "/" + y + "/";
                        },
                        maxZoom: 20
                    })
                });

                this.testPointData.forEach((item, index) => {
                    positionArr.push(fromLonLat(item.position));
                    const mapPoint = new Feature(new Point(fromLonLat(item.position)));
                    // 设置文字
                    this.setMapPointImg(mapPoint, index, item.name, this.testPointData.length);
                    // 设置点
                    pointFeatureArr.push(mapPoint)
                });
                // 设置黄线
                const lineFeature = new Feature(new LineString([...positionArr]));
                this.vcLayer = new VectorLayer({
                    source: new VectorSource({
                        features: [lineFeature, ...pointFeatureArr]
                    }),
                    style: new Style({
                        stroke: new Stroke({
                            width: 3,
                            color: [255, 255, 0, 1]
                        }),
                    })
                });
                // 初始化地图
                map = new Map({
                    layers: [raster],
                    controls: [],
                    target: 'map',
                    view: new View({
                        center: positionArr[0],
                        zoom: 13,
                        minZoom: 8,
                        // [minx, miny, maxx, maxy] 浙江省
                        // lng = [118.01, 123.10]  # 经度
                        // lat = [27.045, 31.42]   # 纬度
                        /*extent: [fromLonLat([118.01])[0], fromLonLat([27.045])[0],
                            fromLonLat([123.50])[0], fromLonLat([31.42])[0]]*/
                    })
                });
                map.addLayer(this.vcLayer);
                // 监听点的点击事件
                map.on('singleclick', (e) => {
                    const feature = map.forEachFeatureAtPixel(e.pixel,
                        feature => {
                            if (!feature.style_) {
                                // 切换到 3d 地图
                                this.twoShow = false;
                                this.threeShow = true;
                                this.changeThreeMap();
                                return
                            }
                            if (feature.style_.text_.text_) {
                                // 切换到视频流
                                this.twoShow = false;
                                this.videoShow = true;
                            }
                            return feature;
                        });
                });

            },
            changeThreeMap() {
                if (!viewer) {
                    this.webglInit()
                }
                viewer.entities.remove(topLine);
                viewer.entities.remove(bottomLine);
                viewer.entities.remove(robot);
                this.setThreeMap();
            },
            // 3d 地图
            webglInit() {
                viewer = new Cesium.Viewer('threeMap', {
                    animation: false,
                    shouldAnimate: false,
                    timeline: false,    //时间线不显示
                    baseLayerPicker: false,
                    fullscreenButton: false, //全屏按钮不显示
                    navigationHelpButton: false,     //是否显示帮助信息控件
                    infoBox: false,
                    homeButton: false,       //是否显示home键
                    geocoder: false,         //是否显示地名查找控件        如果设置为true，则无法查询
                    sceneModePicker: false,  //是否显示投影方式控件  三维/二维
                    /*imageryProvider:new Cesium.UrlTemplateImageryProvider({   // 离线地图
                        url:'http://192.168.1.146:8000/wx/{z}/{x}/{y}/',
                    })*/
                });
                this.setThreeMap();
                viewer._cesiumWidget._creditContainer.style.display = "none";
                // 模型点击事件
                const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                handler.setInputAction(e => {
                    const pick = viewer.scene.pick(e.position)
                    if (typeof pick.id.name) {
                        this.miniVideoShow = true;
                        console.log(pick);
                    }
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            },
            setThreeMap(){
                const robotUrl = 'http://192.168.1.242:3000/model/robot-processed.glb';
                const tower = 'http://192.168.1.242:3000/model/tower-processed.glb';
                const target = Cesium.Cartesian3.fromDegrees(this.testPointData[0].position[0], this.testPointData[0].position[1], 50.5);
                const offset = new Cesium.Cartesian3(-37.048378684557974, -24.852967044804245, 12.352023653686047);
                viewer.scene.camera.lookAt(target, offset);
                const pointArray = this.testPointData;
                const pointArray1 = [];
                const property = new Cesium.SampledPositionProperty();
                const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
                const stop = Cesium.JulianDate.addSeconds(start, 10*(pointArray.length-1), new Cesium.JulianDate());
                viewer.clock.startTime = start.clone();
                viewer.clock.stopTime = stop.clone();
                viewer.clock.currentTime = start.clone();
                viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
                viewer.clock.multiplier = 1;
                viewer.clock.shouldAnimate = true;
                const topLineArray = [];
                const bottomLineArray = [];
                let num = 0;
                for (let i of pointArray) {
                    // 将经纬度坐标转为 3d 地图的坐标
                    const position = Cesium.Cartesian3.fromDegrees(i.position[0], i.position[1], 50); // 顶部line有高度
                    const position1 = Cesium.Cartesian3.fromDegrees(i.position[0], i.position[1],); // 底部line 没有高度
                    pointArray1.push({
                        name: i.name,
                        position: Cesium.Cartesian3.fromDegrees(i.position[0], i.position[1])
                    })
                    // 增加机器人运动轨迹以及机器人高度
                    property.addSample(Cesium.JulianDate.addSeconds(start, num += 10, new Cesium.JulianDate()),
                        Cesium.Cartesian3.fromDegrees(i.position[0], i.position[1], 48));
                    topLineArray.push(position);
                    bottomLineArray.push(position1);
                }
                // 创建机器人
                createRobot();
                // 创建电塔模型
                for (let i of pointArray1) {
                    viewer.entities.add({
                        name: i.name,
                        position: i.position,
                        model: {
                            uri: tower
                        }
                    });
                }
                // 灯塔顶点连线
                topLine = viewer.entities.add({
                    polyline: {
                        show: true,
                        positions: topLineArray,
                        width: 1,
                        material: Cesium.Color.WHITE
                    }
                });
                // 灯塔底部连线
                bottomLine = viewer.entities.add({
                    polyline: {
                        show: true,
                        positions: bottomLineArray,
                        width: 5,
                        material: Cesium.Color.YELLOW
                    }
                });

                // 创建机器人
                function createRobot() {
                    // 调整机器人运动方向
                    //let heading = Cesium.Math.toRadians(160);
                    //let pitch = 0;
                    //let roll = 0;
                    //let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
                    //let orientation = Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees( 122.1143738349002,30.125011306697886 , 57.5), hpr);

                    //  异步加载 glb 模型测试
                    /*var robot = viewer.scene.primitives.add(Cesium.Model.fromGltf({
                        /!*name : 'robot',
                        position: property,
                        availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                            start : start,
                            stop : stop
                        })]),*!/
                        //position : Cesium.Cartesian3.fromDegrees( 122.1143738349002,30.125011306697886 , 57.5),
                        modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees( 122.1143738349002,30.125011306697886 , 50)),
                        url : robotUrl,
                        scale:0.005,
                    }))*/
                    robot = viewer.entities.add({
                        name: 'robot',
                        position: topLineArray[0],
                        availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                            start: start,
                            stop: stop
                        })]),
                        //orientation: new Cesium.VelocityOrientationProperty(property),
                        model: {
                            uri: robotUrl,
                            scale: 0.005,
                        }
                    });
                    // 异步延迟移动，不然移动开始位置会在第一个灯塔前面许多
                    setTimeout(()=>{
                        robot.position = property
                        robot.orientation = new Cesium.VelocityOrientationProperty(property)
                        viewer.trackedEntity = robot;
                    },3000)

                    console.log(robot);

                }
            },
            // 设置 2维地图点的文字以及图片
            setMapPointImg(mapPoint, index, name, length) {
                if (index === 0) {
                    mapPoint.setStyle(new Style({
                        text: new Text({
                            font: '12px Microsoft YaHei',
                            text: name,
                            // offsetY:-10,
                            fill: new Fill({
                                color: '#fff'
                            })
                        }),
                        image: new Icon({
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'fraction',
                            //crossOrigin: 'anonymous',
                            scale: 0.8,
                            name: 'icon',
                            src: require('@/assets/imgs/end.png')
                        }),
                    }))
                } else if (index === length - 1) {
                    mapPoint.setStyle(new Style({
                        text: new Text({
                            font: '12px Microsoft YaHei',
                            text: name,
                            // offsetY:-10,
                            fill: new Fill({
                                color: '#fff'
                            })
                        }),
                        image: new Icon({
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'fraction',
                            //crossOrigin: 'anonymous',
                            scale: 0.8,
                            name: 'icon',
                            src: require('@/assets/imgs/start.png')
                        }),
                    }))
                } else {
                    mapPoint.setStyle(new Style({
                        text: new Text({
                            font: '12px Microsoft YaHei',
                            text: name,
                            // offsetY:-10,
                            fill: new Fill({
                                color: '#fff'
                            })
                        }),
                        image: new Icon({
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'fraction',
                            //crossOrigin: 'anonymous',
                            //scale:0.8,
                            name: 'icon',
                            src: require('@/assets/imgs/center.png')
                        }),
                    }))
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    // 去除 video 标签的 button
    *::-webkit-media-controls-panel {
        display: none !important;
        -webkit-appearance: none;
    }

    *::--webkit-media-controls-play-button {
        display: none !important;
        -webkit-appearance: none;
    }


    *::-webkit-media-controls-start-playback-button {
        display: none !important;
        -webkit-appearance: none;
    }

    .centerContent {
        width: 69.2vw;
        margin-right: 1vw;

        .mapWrapper {
            height: 69.2vh;
            margin: 1.9vh 0 1.85vh 0;
            position: relative;
            z-index: 0;

            .video {
                width: 100%;
                height: 100%;

                video {
                    width: 100%;
                    height: 100%;
                }

                /deep/ .video-js {
                    width: 69.2vw !important;
                    height: 69.2vh !important;
                }
            }

            .twoMap {
                width: 100%;
                height: 100%;

                #map {
                    width: 100%;
                    height: 100%;
                }
            }

            .threeMap {
                width: 100%;
                height: 100%;
            }

            /deep/ canvas {
                width: 100% !important;
                height: 100% !important;
            }

            .miniTwoMap {
                position: absolute;
                width: 10.4vw;
                height: 10.5vh;
                right: 1.3vw;
                bottom: 0.6vw;
                z-index: 1;
            }

            .trailer {
                position: absolute;
                width: 10.4vw;
                height: 10.5vh;
                right: 1.3vw;
                bottom: 0.6vw;
                z-index: 1;

                #trailer {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .equipmentWrapper {
            display: flex;
            justify-content: space-between;

            /deep/ .swiper-button-prev, .swiper-button-next {
                color: #00ffea;
            }

            .equipment {
                width: 13.1vw;
                height: 15.4vh;
                background: url('~@/assets/imgs/videoBg.png');
                background-size: 100% 100%;

                header {
                    padding-left: 1.7vw;
                    margin-top: 0.3vw;
                    font-size: 0.6vw;
                }

                .equipmentImgWrapper {
                    position: relative;
                    width: 100%;
                    margin-top: 0.2vw;

                    .equipmentImg {
                        width: 12.3vw;
                        height: 12.3vh;
                        margin: 0 auto;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .equipmentIcon {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }
</style>
