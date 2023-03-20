<template>
  <!--  <div>-->
  <!--    <el-row>-->
  <!--      <el-col :span=24>-->
  <!--        <el-card class="card">-->
  <!--          <h2>虚拟宠物医院学习系统 v1.0</h2>-->
  <!--        </el-card>-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--  </div>-->

  <div id="pano" style="width:100%;height:100%;">
    <noscript>
      <table style="width:100%;height:100%;">
        <tr style="vertical-align:middle;">
          <td>
            <div style="text-align:center;">
              ERROR:
              <br/>
              <br/>Javascript not activated
              <br/>
              <br/>
            </div>
          </td>
        </tr>
      </table>
    </noscript>
  </div>
</template>

<script>
var krpano = null;

function krpano_onready_callback(krpano_interface) {
  krpano = krpano_interface;
}


export default {
  name: 'Home',
  data() {
    return {
      items: []
    }
  },
  methods: {
    async getHotspots(currentPage, pageSize) {
      const dataTest = await getHotspot({
        pageNum: currentPage,
        pageSize: pageSize
      });
      //实现js和xml交互
      krpano.call('set(hotspot[spot_0_2].title,' + dataTest.data.message + ')')
    }
  },
  mounted: function () {
    embedpano({
      swf: "../../static/vtour/tour.swf",
      xml: "../../static/vtour/tour.xml",
      target: "pano",
      html5: "auto",
      mobilescale: 1.0,
      passQueryParameters: true,
      onready: krpano_onready_callback //回调函数，获取Krpano 对象
    });
    this.getHotspots(1, 3);
  },
}

</script>

<style lang="less" scoped>
.card {
  margin-top: 10px;
  height: 500px;

}
</style>