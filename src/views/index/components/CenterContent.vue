<template>
    <section class="centerContent">
        <RouteHeader />
       <div class="mapWrapper" id="map" v-show="twoShow">

        </div>
        <div class="mapWrapper" id="threeMap"   v-show="!twoShow" ></div>
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
    import * as THREE from 'three';
    import RouteHeader from "@/components/RouteHeader";
    import 'ol/ol.css';
    import Map from 'ol/Map';
    import Feature from 'ol/Feature';
    import {LineString, Point, Polygon} from 'ol/geom';
    import {fromLonLat} from 'ol/proj';
    import View from 'ol/View';
    import TileLayer from 'ol/layer/Tile';
    import GPX from 'ol/format/GPX';
    import KML from 'ol/format/KML';
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
                currentTower:[]
            }
        },
        mounted() {
            if(this.twoShow) {
                this.mapInit();
            }else {
                this.webglInit2();
            }

        },
         methods:{
             mapInit(){
                 const point = JSON.parse(window.localStorage.getItem('point'));
                 const positionArr = [];
                 const pointFeatureArr = [];

                 for(let i of point) {
                     positionArr.push(fromLonLat(i.position));
                     const a = new Feature(new Point(fromLonLat(i.position)));
                     // 设置文字
                     a.setStyle(new Style({
                         text: new Text({
                             font: '12px Microsoft YaHei',
                             text: i.name,
                             fill: new Fill({
                                 color: '#fff'
                             })
                         }),
                         image:new Icon ({
                             anchorXUnits: 'pixels',
                             anchorYUnits: 'pixels',
                             crossOrigin: 'anonymous',
                             color: [255, 255, 0, 1],
                             scale:0.09,
                             src: require('@/assets/icons/edit.svg')
                         }),
                     }) )
                     // 设置点
                     pointFeatureArr.push(a)
                 }
                 console.log(positionArr);
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
                 map.on('click',(e)=>{
                     if(map.hasFeatureAtPixel(e.pixel)) {
                         this.webglInit2();
                         this.twoShow = false;
                     }
                 })

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
                     console.log(position);
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
                 const url = 'http://192.168.1.242:3000/model/tower/tower.gltf';
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
                 const tileset = scene.primitives.add(
                     new Cesium.Cesium3DTileset({
                         url: Cesium.IonResource.fromAssetId(40866)
                     })
                 );

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
                 const viewer = new Cesium.Viewer('threeMap');
                 const tower = 'http://192.168.1.242:3000/model/tower/tower.gltf';
                 const target = Cesium.Cartesian3.fromDegrees( 122.1143738349002,30.125011306697886 , 7.5);
                 const offset = new Cesium.Cartesian3(-37.048378684557974, -24.852967044804245,10.352023653686047);
                 // 创建飞机
                 createRobot()
                 function createRobot(){
                     let heading = Cesium.Math.toRadians(135);
                     let pitch = 0;
                     let roll = 0;
                     let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
                     let orientation = Cesium.Transforms.headingPitchRollQuaternion(Cesium.Cartesian3.fromDegrees( 122.1143738349002,30.125011306697886 , 57.5), hpr);
                     viewer.entities.add({
                         name : 'http://192.168.1.242:3000/model/CesiumAir/Cesium_Air.glb',
                         position : Cesium.Cartesian3.fromDegrees( 122.1143738349002,30.125011306697886 , 57.5),
                         orientation,
                         path : {
                             resolution : 1,
                             material : new Cesium.PolylineGlowMaterialProperty({
                                 glowPower : 0.1,
                                 color : Cesium.Color.YELLOW
                             }),
                             width : 10
                         },
                         model : {
                             uri : 'http://192.168.1.242:3000/model/CesiumAir/Cesium_Air.glb',
                         }
                     });
                 }
                 const options = {
                     camera : viewer.scene.camera,
                     canvas : viewer.scene.canvas,
                     clampToGround: false //开启贴地
                 };
                 const a = viewer.dataSources.add(Cesium.KmlDataSource.load( 'http://192.168.1.242:3000/model/luowei.kmz', options));
                 /*a.then( viewer.flyTo(a));*/
                 a.then(function(dataSource) {
                     const entities = dataSource.entities.values;
                     const pointArray = [];
                     const pointArray1 = [];
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
                     for(let i of pointArray.slice(0,10)) {
                         // 创建模型
                         viewer.entities.add({
                             name : tower,
                             position : i.position,
                             model : {
                                 uri : tower
                             }
                         });

                     }
                     // 顶点连线
                     const lineArr = []
                     for(let i of pointArray1) {
                         const position = Cesium.Cartesian3.fromDegrees(i.position[0], i.position[1], 50);
                         console.log(position);
                         lineArr.push(position)

                     }
                     viewer.entities.add({
                         polyline : {
                             // This callback updates positions each frame.
                             show:true,
                             positions : lineArr,
                             width : 1,
                             material : Cesium.Color.WHITE
                         }
                     });
                     viewer.scene.camera.lookAt(target,offset);
                 });
             }
         }
    }
</script>

<style lang="scss" scoped>
    .centerContent {
        width: 69.2vw;
        margin-right: 1vw;
        .mapWrapper {
            height: 69.2vh;
            margin: 1.9vh 0 1.85vh 0;
            position: relative;
            z-index: 0;
            /deep/canvas {
                width: 100% !important;
                height: 100%!important;
            }
            .three {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 1;
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
