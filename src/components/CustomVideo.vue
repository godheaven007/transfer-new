<template>
  <div class="video-wrap">
    <div class="video-overlay"></div>
    <div class="video-container">
      <div class="video-title">{{ title }}</div>
      <video :src="url" controls="controls" autoplay>
        <source :src="url" type="video/mp4">
      </video>
      <div class="video-close" @click="closeVideo"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomVideo",
  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    closeVideo() {
      this.$emit('emptyInstance');
      this.$destroy();
      this.$el.remove();
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
  @import "@/assets/scss/mixin.scss";

  .video-wrap{
    .video-overlay{
      @include position(fixed);
      background-color:#333333;
      opacity:.4;
      z-index:10;
    }
    @keyframes slideDown{
      from{
        top:-50%;
        opacity:0;
      }
      to{
        top:50%;
        opacity:1;
      }
    }
    @keyframes slideUp{
      from{
        top:50%;
        opacity:1;
      }
      to{
        top:-50%;
        opacity:0;
      }
    }
    .video-container{
      position: absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      z-index:10;
      width:1000px;
      height:536px;
      background-color: #fff;
      opacity:1;
      &.slideDown{
        animation:slideDown .6s linear;
        top:50%;
      }
      &.slideUp{
        animation:slideUp .6s linear;
      }
      .video-title {
        text-indent: 20px;
        height: 42px;
        line-height: 42px;
      }
      .video-close{
        position:absolute;
        top:10px;
        right:10px;
        @include bgImg(20px,20px,'/imgs/icon-close.png');
        cursor:pointer;
        z-index:11;
      }
      video{
        width:100%;
        height:100%;
        object-fit:cover;
        outline:none;
      }
    }
  }
</style>