<template>
<div>
    <div class="contentWrapper">
        <LeftSide />
        <CenterContent />
        <RightSide />
    </div>
</div>
</template>

<script>
    import LeftSide from "./components/LeftSide";
    import CenterContent from "./components/CenterContent";
    import RightSide from "./components/RightSide";

    export default {
        name: "index",
        components:{
            LeftSide,
            CenterContent,
            RightSide
        }
    }
</script>

<style lang="scss" scoped>
.contentWrapper {
    display: flex;
    margin-top: 1.7vh;
    height: 91.66vh;
}
</style>
