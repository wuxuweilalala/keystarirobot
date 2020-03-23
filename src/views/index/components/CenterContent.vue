<template>
    <section class="centerContent">
        <RouteHeader />
        <div class="mapWrapper" id="map"></div>
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
    import FBXLoader from 'three-fbxloader-offical';
    import 'ol/ol.css';
    import Map from 'ol/Map';
    import Feature from 'ol/Feature';
    import {LineString, Point, Polygon} from 'ol/geom';
    import {fromLonLat} from 'ol/proj';
    import View from 'ol/View';
    import TileLayer from 'ol/layer/Tile';
    import { Vector as VectorLayer} from 'ol/layer';
    import {OSM, TileDebug,TileJSON, Vector as VectorSource} from 'ol/source';
    import {Fill, Icon, Stroke, Style} from 'ol/style';
    import XYZ from 'ol/source/XYZ';
    import WebGLPointsLayer from 'ol/layer/WebGLPoints';
    export default {
        name: "CenterContent",
        components:{
            RouteHeader,
            Swiper,
            SwiperSlide
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
                mesh: null
            }
        },
        mounted() {
           /* this.threeInit();
            this.animate();*/
           this.mapInit()
        },
         methods:{
            threeInit(){

                const container = this.$refs.container;
                console.log(container);
                this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
                this.camera.position.z = 1;

                this.scene = new THREE.Scene();

                const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
                const material = new THREE.MeshNormalMaterial();

                this.mesh = new THREE.Mesh( geometry, material );
                this.scene.add( this.mesh );

                this.renderer = new THREE.WebGLRenderer( { antialias: true } );
                this.renderer.setSize( window.innerWidth, window.innerHeight );
                container.appendChild( this.renderer.domElement );
            },
             animate(){
                 requestAnimationFrame( this.animate );

                 this.mesh.rotation.x += 0.01;
                 this.mesh.rotation.y += 0.02;

                 this.renderer.render( this.scene, this.camera );
             },
             mapInit(){
                 var london = fromLonLat([120.153576,29.287459]);//伦敦的坐标
                 var lineFeature = new Feature(
                     new LineString([london, fromLonLat([120.19, 30.26])]));
                 var pointFeature = new Feature(new Point(london));
                 var pointFeature1 = new Feature(new Point(fromLonLat([120.19, 30.26])));
                 var map = new Map({
                     layers: [
                         new TileLayer({
                             source: new OSM()
                         }),
                         new VectorLayer({
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
                         })
                     ],
                     target: 'map',
                     controls:[],
                     view: new View({
                         center: london,
                          zoom:6
                     })
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
            border: 1px solid red;
            margin: 1.9vh 0 1.85vh 0;
            /deep/canvas {
                width: 100% !important;
                height: 100%!important;
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
