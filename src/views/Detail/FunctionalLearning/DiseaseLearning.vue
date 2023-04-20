<template>
    <!-- TODO: 视频上传未尝试，多选文件上传 -->
    <div>
        <!-- 收集表单 -->
        <el-dialog ref="dialog" title='病例信息' :visible.sync="isShow">
            <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-info"></i>
                    病例名称
                  </template>
                  {{ operateFormData.disease_name }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-grid"></i>
                    病例类别
                  </template>
                  {{ operateFormData.disease_type_name }}
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                  <template slot="label" >
                    <i class="el-icon-s-data"></i>
                    基本情况
                  </template>
                  {{ operateFormData.symptom }}
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                  <template slot="label">
                    <i class="el-icon-s-order"></i>
                    病例检查
                  </template>
                  <el-tag style="margin-right: 5px;" v-for="(item, index) in operateFormData.examination" :key="index">
                    {{ item }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                  <template slot="label">
                    <i class="el-icon-document"></i>
                    诊断结果
                  </template>
                  {{ operateFormData.diagnosis }}
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                    <template slot="label">
                      <i class="el-icon-files"></i>
                      诊疗方案
                    </template>
                    <el-tag style="margin-right: 5px;" type="success" v-for="(item, index) in operateFormData.treatment" :key="index">
                        {{ item }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item :span="2">
                    <template slot="label">
                      <i class="el-icon-film"></i>
                      影像资料
                    </template>
                    <div v-if="fileList.length === 0" style="color: darkgray;">
                        <span>暂无影像资料。</span>
                      </div>
                      <el-row :gutter="10">
                        <el-col :span="8" v-for="(file, index) in fileList" :key="index" style="padding-bottom: 10px;" >
                          <el-card :body-style="{ padding: '0px' }" shadow="hover">
                            <div class="image" v-if="file.type === 'image'">
                              <el-image  :src="file.url" ></el-image>
                            </div>
                            <div class="video" v-else-if="file.type === 'video'">
                              <video controls style="max-width: 100%;" :src="file.url"></video>
                            </div>
                            <div style="padding: 10px;">
                              <div>
                                <template slot="label">
                                    <i class="el-icon-info"></i>
                                    影像资料
                                  </template>
                                  {{ file.description }}
                                <!-- <el-input prefix-icon="el-icon-info" size="medium" v-model="file.description"></el-input> -->
                              </div>
                            </div>
                          </el-card>
                        </el-col>
                      </el-row>
                  </el-descriptions-item>
              </el-descriptions>
            <div slot="footer" class="dialog-footer">
                <el-button type="" @click="isShow = false">返回</el-button>
            </div>
        </el-dialog>
  
        <!-- 搜索框 -->
        <el-form :inline="true" style="margin-top:12px">
            <el-form-item>
            <el-select v-model="value" clearable placeholder="请选择病类" ref="selectorSearch" @change="handleSearchChange" @clear="handleClear">
                <el-option
                v-for="item in big_diseases"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
            <el-input v-model="input" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="">
            <el-button type="success" icon="el-icon-search" @click="search">搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- 表格部分 -->
        <div>
            <el-row class="rowClass" v-for="(colArr, index) in rowData" :key="index" :gutter="24">
            <el-col v-for="(btn, index) in colArr" :key="btn.disease_id" :span="4">
                <el-button class="buttonClass" plain @click="editDisease" :id="btn.disease_id">{{ btn.disease_name }}</el-button>
            </el-col>
            </el-row>
        </div>
    </div>
</template>
  
<script>
    import {getFormData, postFormData} from "@/utils/api";
    import CommonForm from "@/components/CommonForm.vue";
    import CommonTableOperator from "@/components/CommonTableOperator.vue"

    export default {
    name: "DiseaseLearning",
    components: {
        CommonForm, CommonTableOperator
    },
    data() {
    return {
      isShow: false,
      // isFullScreen: true,
      input: "",

      big_diseases: [],
      examinations: [],
      treatments: [],
      value: "",
      disease_type: "", //用于搜索，因为大病没有id
      fileList: [],
      fileSrc: 'https://pethospitalresources.blob.core.windows.net/pethospicalfiles/',

      
      operateFormData: {
        disease_id: -1,
        disease_type_name: '',
        disease_name: "",
        symptom: "",
        examination: [],
        diagnosis: "",
        treatment: [],
        file_info: [],
      },

      // 表格配置
      tableData: [],
      rowData: [],
      colData: [],
    };
  },
  methods: {
    handleClear() {
      this.disease_type = ""
      this.search()
    },
    handleSearchChange(value) {
      let obj = {}
      obj = this.big_diseases.find((item) => {
        return item.value === value
      }
      )
      this.disease_type = obj.label
      this.search()
    },
    handleChange(value) {
      this.operateFormData.disease_type_name = value
    },
    id2examination(value) {
      let obj = {}
      // console.log(this.examinations)
      obj = this.examinations.find((item) => {
        return item.id === value
      }
      )
      // console.log(obj)
      return obj.name
    },
    id2treatment(value) {
      let obj = {}
      obj = this.treatments.find((item) => {
        return item.id === value
      }
      )
      // console.log(obj)
      return obj.name
    },
    getOneDisease(e) {
      let id = e.currentTarget.getAttribute("id")
      getFormData('/diseaseManage/getOneDisease', {disease_id: id}).then((resp) => {
        this.operateFormData = resp.data.result.disease_info
        // console.log(resp.data.result.disease_info)
        for(let i = 0; i < this.operateFormData.examination.length; i++) {
            this.operateFormData.examination[i] = this.id2examination(this.operateFormData.examination[i])
        }
        for(let i = 0; i < this.operateFormData.treatment.length; i++) {
            this.operateFormData.treatment[i] = this.id2treatment(this.operateFormData.treatment[i])
        }
        for(let i = 0; i < resp.data.result.disease_info.file_info.length; i++) {
          const fileItem = {
            name: resp.data.result.disease_info.file_info[i].name,
            url: this.fileSrc + resp.data.result.disease_info.file_info[i].url,
            type: resp.data.result.disease_info.file_info[i].type,
            description: resp.data.result.disease_info.file_info[i].description
          };
          this.fileList.push(fileItem)
        }
      })
    },
    loadAllData() {
      this.loadBigDiseases()
      this.loadExaminations()
      this.loadMedicines()
    },
    loadBigDiseases() { 
      getFormData('/diseaseManage/getBigDisease').then((resp) => {
        var old_resp = resp.data.result.big_disease
        for(let i = 0; i < old_resp.length; i++) {
          var temp_info = {
            value: old_resp[i], 
            label: old_resp[i]
          }
          this.big_diseases.push(temp_info)
        }
      })
    },
    loadExaminations() { 
      getFormData('/checkup/getAllCheckups', {content: '', currentPage: 0}).then((resp) => {
        this.examinations = resp.data.result
      })
    },
    loadMedicines() { 
      getFormData('/medicine/getAllMedicines', {content: '', currentPage: 0}).then((resp) => {
        this.treatments = resp.data.result
      })
    },
    search() {
      postFormData('/diseaseManage/searchDisease', {disease_type: this.disease_type, search_text: this.input, currentPage: -1}).then((resp) => {
        this.tableData = resp.data.result.infos
        this.rowData = []
        this.colData = []
        if(this.tableData.length <= 6) {
          this.rowData.push(this.tableData)
        }
        else {
          this.tableData.forEach((item, index, cols) => {
            this.colData.push(item)
            if((index + 1) % 6 === 0) {
              this.rowData.push(this.colData)
              this.colData = []
            }
          })
          this.rowData.push(this.colData)
        }
      })
    },

    editDisease(e) {
      this.isShow = true;
      this.fileList = []
      this.getOneDisease(e)
    },
  },
  mounted() {
    this.search()
    this.loadAllData()
  },
}
</script>

<style scoped>
.buttonClass {
  width : 100%;
}
.rowClass {
  padding-bottom: 10px;
}

.image {
  max-width: 100%;
  display: block;
}

.video {
  display: flex; 
  justify-content: center;
}

</style>

