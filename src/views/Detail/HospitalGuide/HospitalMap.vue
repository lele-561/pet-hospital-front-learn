<template>
  <div style="width:100%;height:95%;margin-top:1%;margin-bottom:1%;display:flex;">
    <div id="pano" style="width:60%;height:100%;margin-right:1%;">
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
    <div style="width:40%;flex: 1">
      <el-card style="height: 100%">
        <el-descriptions title='当前位于：' size="middle" :column=3 border>
          <el-descriptions-item label="科室">{{ department.name }}</el-descriptions-item>
          <el-descriptions-item label="电话">{{ department.phoneNumber }}</el-descriptions-item>
          <el-descriptions-item label="负责人">
            <el-tag>{{ department.directorName }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="介绍">{{ department.functions }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions class="equipment" title="现在选择的器械是：" :style="{display: equipmentShow}" size="middle" :column=1
                         border>
          <el-descriptions-item label="器械名">{{ equipment.name }}</el-descriptions-item>
          <el-descriptions-item label="说明">{{ equipment.functions }}</el-descriptions-item>
          <el-descriptions-item label="操作流程">
            <el-select v-model="role" placeholder="请选择角色" size="small" clearable>
              <el-option
                  v-for="item in roleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
              <div style="margin-top: 1%;height: 110px;overflow-y: auto">{{ processContent }}</div>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script>
import {getFormData} from "../../../utils/api";

var krpano = null;

function krpano_onready_callback(krpano_interface) {
  krpano = krpano_interface;
}

export default {
  name: 'HospitalMap',
  data() {
    return {
      equipmentShow: 'none',
      department: '',
      equipment: '',
      departmentTitle: '',
      equipmentTitle: '',
      role: '',
      processContent: '',
      roleOptions: [
        {value: '医助', label: '医助'},
        {value: '兽医', label: '兽医'},
      ],
    }
  },
  methods: {
    getDepartment(departmentName) {
      console.log('departmentName', departmentName)
      if (departmentName === '中间走廊1' || departmentName === '中间走廊2' || departmentName === '右边走廊1'
          || departmentName === '右边走廊2' || departmentName === '左边走廊1' || departmentName === '左边走廊2')
        this.department = {
          name: departmentName.slice(0, -1),
          phoneNumber: '无',
          directorName: '无',
          functions: '无'
        }
      else
        getFormData('/department/getOneDepartment', {name: departmentName}).then((resp) => {
          this.department = resp.data.result
        })
    },
    getEquipment(equipmentName) {
      console.log('equipmentName', equipmentName)
      getFormData('/department/getOneEquipment', {name: equipmentName}).then((resp) => {
        this.equipment = resp.data.result
      })
    },
  },
  watch: {
    'role': {
      handler() {
        if (this.role === '' || this.equipment === '')
          this.processContent = ''
        else {
          if (this.role === '兽医')
            this.processContent = this.equipment.process['兽医']
          else if (this.role === '医助')
            this.processContent = this.equipment.process['医助']
        }
      }
    },

  },
  mounted() {
    // 监听localhostStorage的数据变化，结合utils/tool.js配合使用
    const that = this
    window.addEventListener('setItemEvent', function (e) {
      var newValue = e.newValue
      var parts = newValue.split('_')
      that.role = ''
      // 场景转换
      if (parts[0] === 'scene') { // sceneNo_xx
        that.equipmentShow = 'none'
        that.getDepartment(parts[1])
      } else if (parts[1] === 'map') { // hotspot_map_xx
        that.equipmentShow = 'none'
        that.getDepartment(parts[2])
      }
      // 器械转换
      else {  // hotspot_No_xx
        that.equipmentShow = ''
        that.getEquipment(parts[2])
      }
    })
    embedpano({
      swf: "../../static/vtour/tour.swf",
      xml: "../../static/vtour/tour.xml",
      target: "pano",
      html5: "auto",
      mobilescale: 1.0,
      passQueryParameters: true,
      onready: krpano_onready_callback //回调函数，获取Krpano 对象
    });
  },
}
</script>

<style lang="less" scoped>
.equipment {
  margin-top: 5%;
  margin-bottom: 100%;
  height: 50px;
}
</style>