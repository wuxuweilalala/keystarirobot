<template>
    <section class="centerContent">
        <RouteHeader />
        <div class="mapWrapper">
            <div class="video"  v-show="videoShow">
                <video muted="" autoplay="" loop="" crossorigin="" controls="" controlsList="nodownload">
                    <source src="https://sandcastle.cesium.com/SampleData/videos/big-buck-bunny_trailer.mov" type="video/quicktime">
                    Your browser does not support the <code>video</code> element.
                </video>
            </div>
            <div :class="[{miniTwoMap:videoShow},'twoMap']" v-show="twoShow || videoShow"  @click.stop.prevent="twoMapShow">
                <div id="map" >

                </div>
            </div>
            <div class="threeMap" id="threeMap"   v-show="threeShow" >
                <div class="trailer" v-show="miniVideoShow">
                    <video id="trailer" muted="" autoplay="" loop="" crossorigin="" controls="" controlsList="nodownload">
                        <source src="https://sandcastle.cesium.com/SampleData/videos/big-buck-bunny_trailer.mov" type="video/quicktime">
                        Your browser does not support the <code>video</code> element.
                    </video>
                </div>
            </div>
        </div>
        <div class="equipmentWrapper">
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide
                        v-for="(list,index) in equipmentList"
                        :key="index"
                        class="equipment"
                >   <header>
                    <span>{{index}}.{{list.name}}</span>
                </header>
                    <div class="equipmentImgWrapper">
                        <div class="equipmentImg">
                            <img src="" alt="">
                        </div>
                        <div class="equipmentIcon">
                            <img  src="@/assets/imgs/videoBtn.png" alt="">
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
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import RouteHeader from "@/components/RouteHeader";
    import 'ol/ol.css';
    import Map from 'ol/Map';
    import Feature from 'ol/Feature';
    import {LineString, Point, Polygon} from 'ol/geom';
    import {defaults as defaultInteractions, Pointer as PointerInteraction} from 'ol/interaction';
    import {fromLonLat} from 'ol/proj';
    import View from 'ol/View';
    import TileLayer from 'ol/layer/Tile';
    import GPX from 'ol/format/GPX';
    import { Vector as VectorLayer} from 'ol/layer';
    import {OSM, TileDebug,TileJSON, Vector as VectorSource} from 'ol/source';
    import {Fill, Text, Icon, Stroke, Style,Circle as CircleStyle} from 'ol/style';
    import XYZ from 'ol/source/XYZ';
    export default {
        name: "CenterContent",
        components:{
            RouteHeader,
            Swiper,
            SwiperSlide,
        },
        data(){
            return {
                equipmentList:[
                    {
                        name:'设备一号',
                        img:'',
                    },
                    {
                        name:'设备一号',
                        img:'',
                    },
                    {
                        name:'设备一号',
                        img:'',
                    },
                    {
                        name:'设备一号',
                        img:'',
                    },
                    {
                        name:'设备一号',
                        img:'',
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
                camera: null,
                scene: null,
                renderer: null,
                mesh: null,
                viewer:undefined,
                twoShow:false,
                miniTwoShow:false,
                videoShow:false,
                threeShow:true,
                miniVideoShow:false,
                currentTower:[]
            }
        },
        mounted() {
            this.twoShow ? this.mapInit() : this.webglInit2();
        },
         methods:{
             twoMapShow(){
                 this.twoShow = true;
                 this.videoShow = false;
             },
             mapInit(){
                     const point = JSON.parse(window.localStorage.getItem('point'));
                     const positionArr = [];
                 const pointFeatureArr = [];
                     for(let i of point) {
                         positionArr.push(fromLonLat(i.position));
                         const a = new Feature(new Point(fromLonLat(i.position)))
                         a.sb = 'sb';
                         // 设置文字
                         a.setStyle(new Style({
                             text: new Text({
                                 font: '12px Microsoft YaHei',
                                 text: i.name,
                                // offsetY:-10,
                                 fill: new Fill({
                                     color: '#fff'
                                 })
                             }),
                             image:new Icon ({
                                 anchorXUnits: 'fraction',
                                 anchorYUnits: 'fraction',
                                 //crossOrigin: 'anonymous',
                                 color: [255, 255, 0, 1],
                                 scale:0.09,
                                 name:'icon',
                                 src: require('@/assets/icons/edit.svg')
                             }),
                         }) )
                         // 设置点
                         pointFeatureArr.push(a)
                     }
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
                     // 设置黄线
                     const lineFeature = new Feature(
                         new LineString([...positionArr]));
                     // 初始化地图
                     const map = new Map({
                         layers: [raster,   new VectorLayer({
                             source: new VectorSource({
                                 features: [lineFeature,...pointFeatureArr]
                                 //url: 'http://192.168.1.242:3000/model/doc.kml',
                                 // format: new KML()
                             }),
                             style: new Style({
                                 stroke: new Stroke({
                                     width:3,
                                     color: [255, 255, 0, 1]
                                 }),
                             })
                         })],
                         controls:[],
                         target: 'map',
                         view: new View({
                             center: positionArr[30],
                             zoom: 13,
                             minZoom: 8,
                             // [minx, miny, maxx, maxy] 浙江省
                             // lng = [118.01, 123.10]  # 经度
                             // lat = [27.045, 31.42]   # 纬度
                             /*extent: [fromLonLat([118.01])[0], fromLonLat([27.045])[0],
                                 fromLonLat([123.50])[0], fromLonLat([31.42])[0]]*/
                         })
                     });

                     // 监听点的点击事件
                     map.on('singleclick',(e)=>{
                         // e.stopPropagation();
                         const feature = map.forEachFeatureAtPixel(e.pixel,
                             feature=> {
                                 console.log(feature);
                                 if(!feature.style_){
                                     this.twoShow = false;
                                     this.threeShow = true;
                                     this.webglInit2();
                                 }
                                 if(feature.style_.text_.text_) {
                                     this.twoShow = false;
                                     this.videoShow = true;
                                 }

                                 return feature;
                             });
                         if(map.hasFeatureAtPixel(e.pixel)) {
                             //console.log(e);
                             //this.webglInit2();
                              // this.twoShow = false;
                               //this.videoShow = true;
                              //this.threeShow = true;
                         }
                     });
             },
             webglInit(){
                var viewer = new Cesium.Viewer('map')
                 createModel('http://192.168.1.242:3000/model/CesiumAir/Cesium_Air.glb',200)

                function createModel(url, height) {
                    viewer.entities.removeAll();
                     let position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height);
                     let heading = Cesium.Math.toRadians(135);
                     let pitch = 0;
                     let roll = 0;
                     let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
                     let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                     let entity = viewer.entities.add({
                         name : url,
                         position : position,
                         orientation : orientation,
                         model : {
                             uri :url,
                              minimumPixelSize : 128,
                              maximumScale : 20000
                         }
                     });
                    viewer.trackedEntity = entity;
                 }
             },
             webglInit1(){
                 function createModel(url, x, y, height) {
                     const position = Cesium.Cartesian3.fromDegrees(x, y, height);
                     viewer.entities.add({
                         name : url,
                         position : position,
                         model : {
                             uri : url
                         },

                     });
                 }
                 const viewer = new Cesium.Viewer('threeMap')
                 const scene = viewer.scene;
                 const clock = viewer.clock;
                 const numberOfBalloons = 13;
                 const lonIncrement = 0.00025;
                 const initialLon = -122.99875;
                 const lat = 44.0503706;
                 const height = 7.5;
                 const url = 'http://192.168.1.242:3000/model/tower-processed.glb';
                 for (let i = 0; i < numberOfBalloons; ++i) {
                     const lon = initialLon + i * lonIncrement;
                     createModel(url, lon, lat, 0);
                 }
                 const target = Cesium.Cartesian3.fromDegrees(initialLon + lonIncrement, lat, height + 7.5);
                 const offset = new Cesium.Cartesian3(-37.048378684557974, -24.852967044804245,10.352023653686047);

                 let entity;
                 let positionProperty;
                 const dataSourcePromise = Cesium.CzmlDataSource.load('http://192.168.1.242:3000/model/ClampToGround.czml');
                 viewer.dataSources.add(dataSourcePromise).then(function(dataSource) {
                     entity = dataSource.entities.getById('CesiumMilkTruck');
                     positionProperty = entity.position;
                 });
               /*  const tileset = scene.primitives.add(
                     new Cesium.Cesium3DTileset({
                         url: Cesium.IonResource.fromAssetId(40866)
                     })
                 );*/

                 viewer.camera.setView({
                     destination: new Cesium.Cartesian3(-2500628.4716683696, -3850998.027340732, 4412185.44382818),
                     orientation: new Cesium.HeadingPitchRoll(4.2892217081808806, -0.4799070147502502, 6.279789177843313),
                     endTransform : Cesium.Matrix4.IDENTITY
                 });

                 if (scene.clampToHeightSupported) {
                     tileset.initialTilesLoaded.addEventListener(start);
                 } else {
                     window.alert('This browser does not support clampToHeight.');
                 }

                 function start() {
                     clock.shouldAnimate = true;
                     var objectsToExclude = [entity];
                     scene.postRender.addEventListener(function() {
                         var position = positionProperty.getValue(clock.currentTime);
                         entity.position = scene.clampToHeight(position, objectsToExclude);
                     });
                 }
                 scene.camera.lookAt(target, offset);

             },
             webglInit2(){
                 const viewer = new Cesium.Viewer('threeMap',{
                     animation:false,
                     shouldAnimate:false,
                     timeline: false,    //时间线不显示
                     baseLayerPicker:false,
                     fullscreenButton: false, //全屏按钮不显示
                     navigationHelpButton:false,     //是否显示帮助信息控件
                     infoBox: false,
                     homeButton:false,       //是否显示home键
                     geocoder:false,         //是否显示地名查找控件        如果设置为true，则无法查询
                     sceneModePicker:false,  //是否显示投影方式控件  三维/二维
                 });
                 viewer._cesiumWidget._creditContainer.style.display = "none";
                 const tower = 'http://192.168.1.242:3000/model/tower-processed.glb';
                 const target = Cesium.Cartesian3.fromDegrees( 122.1143738349002,30.125011306697886 , 7.5);
                 const offset = new Cesium.Cartesian3(-37.048378684557974, -24.852967044804245,10.352023653686047);

                 const options = {
                     camera : viewer.scene.camera,
                     canvas : viewer.scene.canvas,
                     clampToGround: false //开启贴地
                 };
                 // 引入 kmz 地图
                 const kmzMap = viewer.dataSources.add(Cesium.KmlDataSource.load( 'http://192.168.1.242:3000/model/luowei.kmz', options));
                 /*kmzMap.then( viewer.flyTo(kmzMap));*/
                 kmzMap.then(dataSource=> {
                     const entities = dataSource.entities.values;
                     const pointArray = [];
                     const pointArray1 = [];
                     const property = new Cesium.SampledPositionProperty();
                     const start = Cesium.JulianDate.fromDate(new Date(2020, 3, 26, 18));
                     const stop = Cesium.JulianDate.addSeconds(start, 1000, new Cesium.JulianDate());
                     viewer.clock.startTime = start.clone();
                     viewer.clock.stopTime = stop.clone();
                     viewer.clock.currentTime = start.clone();
                     viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
                     viewer.clock.multiplier = 1;
                     viewer.clock.shouldAnimate = true;
                     for (let i = 0; i < entities.length; i++) {
                         const entity = entities[i];
                         if(entity.position) {
                             const ellipsoid=viewer.scene.globe.ellipsoid;
                             const cartographic=ellipsoid.cartesianToCartographic(entity.position._value);
                             const a = [Cesium.Math.toDegrees(cartographic.longitude),Cesium.Math.toDegrees(cartographic.latitude)];
                             pointArray.push({name:entity._name,position:entity.position._value});
                             pointArray1.push({name:entity._name,position:a});
                         }
                     }
                     window.localStorage.setItem('point',JSON.stringify(pointArray1))
                     // 创建电塔模型
                     let towerId = 0;
                     for(let i of pointArray) {
                         viewer.entities.add({
                             name : towerId+=1,
                             position : i.position,
                             model : {
                                 uri : tower
                             }
                         });
                     }
                     const lineArr = []
                     let num = 0;
                     for(let i of pointArray1) {
                         const position = Cesium.Cartesian3.fromDegrees(i.position[0], i.position[1], 50);
                         lineArr.push(position)
                         // 增加机器人运动轨迹以及机器人高度
                         property.addSample(Cesium.JulianDate.addSeconds(start, num+=10, new Cesium.JulianDate()),
                             Cesium.Cartesian3.fromDegrees(i.position[0], i.position[1], 48));
                     }
                     // 灯塔顶点连线
                     viewer.entities.add({
                         polyline : {
                             show:true,
                             positions : lineArr,
                             width : 1,
                             material : Cesium.Color.WHITE
                         }
                     });
                     // 创建机器人
                     createRobot()
                     function createRobot(){
                         // 调整机器人方向
                         let heading = Cesium.Math.toRadians(160);
                         let pitch = 0;
                         let roll = 0;
                         let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
                         const robotUrl = 'http://192.168.1.242:3000/model/robot-processed.glb'
                         let orientation = Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees( 122.1143738349002,30.125011306697886 , 57.5), hpr);
                         const robot = viewer.entities.add({
                             name : 'robot',
                             position: property,
                             availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                                 start : start,
                                 stop : stop
                             })]),
                             //position : Cesium.Cartesian3.fromDegrees( 122.1143738349002,30.125011306697886 , 57.5),
                             orientation: new Cesium.VelocityOrientationProperty(property),
                             model : {
                                 uri : robotUrl,
                                 scale:0.005,
                             }
                         });
                         viewer.trackedEntity = robot;
                     }
                     // 模型点击事件
                     const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                     handler.setInputAction(e=> {
                         const pick = viewer.scene.pick(e.position)
                         if(typeof pick.id.name  === 'number') {
                             this.miniVideoShow = true;
                             console.log(pick);
                         }
                     }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                     viewer.scene.camera.lookAt(target,offset);
                 });
             }
         }
    }
</script>

<style lang="scss" scoped>
    // 去除 video 标签的 button
    *::-webkit-media-controls-panel {
        display: none!important;
        -webkit-appearance: none;
    }

    *::--webkit-media-controls-play-button {
        display: none!important;
        -webkit-appearance: none;
    }


    *::-webkit-media-controls-start-playback-button {
        display: none!important;
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
                border: 1px solid red;
                width: 100%;
                height: 100%;
                video {
                    width: 100%;
                    height: 100%;
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
            /deep/canvas {
                width: 100% !important;
                height: 100%!important;
            }
            .miniTwoMap {
                position: absolute;
                width: 10.4vw;
                height: 10.5vh;
                right: 1.3vw;
                bottom: 0.6vw;
                border: 1px solid red;
                z-index: 1;
            }
            .trailer {
                position: absolute;
                width: 10.4vw;
                height: 10.5vh;
                right: 1.3vw;
                bottom: 0.6vw;
                border: 1px solid red;
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
            /deep/.swiper-button-prev, .swiper-button-next {
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
                        border:1px solid red;
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
                        transform: translate(-50%,-50%);
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
