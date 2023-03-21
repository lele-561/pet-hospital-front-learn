<template>
  <div style="width:100%;height:95%;margin-top:1%;margin-bottom:1%;display:flex;">
    <div id="pano" style="width:80%;height:100%;margin-right:1%;">
      <noscript>
        <table style="width:100%;height:100%;flex: 1">
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
    <div style="width:20%;flex: 1">
      <el-card style="height: 100%">66666</el-card>
    </div>
  </div>
</template>

<script>
var krpano = null;

function krpano_onready_callback(krpano_interface) {
  krpano = krpano_interface;
}

export default {
  name: 'HospitalMap',
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
</style>