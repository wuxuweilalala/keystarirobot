<template>
    <section class="centerContent">
        <RouteHeader />
       <div class="mapWrapper" id="map" ref="earthContainer">
           <!--<div class="three" ref="container" ></div>-->
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
    import { Vector as VectorLayer} from 'ol/layer';
    import {OSM, TileDebug,TileJSON, Vector as VectorSource} from 'ol/source';
    import {Fill, Icon, Stroke, Style,Circle as CircleStyle} from 'ol/style';
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
            }
        },
        mounted() {
            // this.mapInit();
            this.webglInit2();
        },
         methods:{
             mapInit(){
                 const point = JSON.parse(window.localStorage.getItem('point'));
                 const postitionArr = [];
                 for(let i of point) {
                     postitionArr.push([i.position.z,i.position.y])
                 }
                 console.log(postitionArr);
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
                 const london = fromLonLat([120.153576,29.287459]);//浙江中心的坐标
                 console.log( fromLonLat([120.19, 30.26]));
                 const lineFeature = new Feature(
                     new LineString([london, fromLonLat([120.19, 30.26])]));
                 const pointFeature = new Feature(new Point(london));
                 const pointFeature1 = new Feature(new Point(fromLonLat([120.19, 30.26])));
                 const map = new Map({
                     layers: [raster,   new VectorLayer({
                         source: new VectorSource({
                             features: [lineFeature,pointFeature,pointFeature1]
                         }),
                         style: new Style({
                             image:new Icon ({
                                 anchorXUnits: 'pixels',
                                 anchorYUnits: 'pixels',
                                 crossOrigin: 'anonymous',
                                 color: [255, 255, 0, 1],
                                 scale:0.1,
                                 src: require('@/assets/icons/edit.svg')
                             }),
                             stroke: new Stroke({
                                 width: 10,
                                 color: [255, 255, 0, 1]
                             }),
                         })
                     })],
                     controls:[],
                     target: 'map',
                     view: new View({
                         center: fromLonLat([120.153576,29.287459]),
                         zoom: 8,
                         minZoom: 8,
                         // [minx, miny, maxx, maxy] 浙江省
                         // lng = [118.01, 123.10]  # 经度
                         // lat = [27.045, 31.42]   # 纬度
                         extent: [fromLonLat([118.01])[0], fromLonLat([27.045])[0],
                             fromLonLat([123.50])[0], fromLonLat([31.42])[0]]
                     })
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
                         }
                     });
                 }
                 const viewer = new Cesium.Viewer('map')
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
                     createModel(url, lon, lat, height);
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
                 const viewer = new Cesium.Viewer('map')
                 var options = {
                     camera : viewer.scene.camera,
                     canvas : viewer.scene.canvas,
                     clampToGround: true //开启贴地
                 };
                 const a = viewer.dataSources.add(Cesium.KmlDataSource.load( 'http://192.168.1.242:3000/model/luowei.kmz', options));
                 a.then( viewer.flyTo(a));

                 a.then(function(dataSource) {
                     console.log(dataSource._camera.position);
                     const entities = dataSource.entities.values;
                     console.log(entities);
                     let pointArray = [];
                     for (let i = 0; i < entities.length; i++) {
                         const entity = entities[i];
                         if(entity.position) {
                             pointArray.push({name:entity._name,position:entity.position._value})
                         }
                         /*   var cartographicPosition = Cesium.Cartographic.fromCartesian(entity.position.getValue(Cesium.JulianDate.now()));
                            var latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
                            var longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
                            console.log(latitude);
                            console.log(longitude);*/
                         // 设置每个entity的样式
                       /*  entity.billboard.disableDepthTestDistance = Number.POSITIVE_INFINITY; //去掉地形遮挡
                         entity.billboard.color = Cesium.Color.WHITE;
                         entity.billboard.image =  '../data/kml/img.jpg';*/
                     }
                     window.localStorage.setItem('point',JSON.stringify(pointArray))
                 });


             },
             createModel(url, height) {
                 this.viewer.entities.removeAll();
                 let position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height);
                 let heading = Cesium.Math.toRadians(135);
                 let pitch = 0;
                 let roll = 0;
                 let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
                 let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
                 console.log(this.viewer.entities)
                 let entity = this.viewer.entities.add({
                     name : url,
                     position : position,
                     orientation : orientation,
                     model : {
                         uri : url,
                         minimumPixelSize : 128,
                         maximumScale : 20000
                     }
                 });
                 this.viewer.trackedEntity = entity;
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
