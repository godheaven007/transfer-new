<template>
  <div class="container">
    <div class="header">
      <Header></Header>
    </div>
    <div class="main">
      <router-view/>
    </div>
<!--    <div class="footer">-->
<!--      <Footer></Footer>-->
<!--    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'Home',
  components: {
    Header, Footer
  }
}
</script>

<style scoped lang="scss">
  .container {
    min-width: 1400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
      width: 100%;
      height: 78px;
    }
    .main{
      overflow-y: scroll;
      width: 100%;
      height: calc(100% - 78px);
    }
    .footer{
      height: 100px;
    }
  }
</style>
