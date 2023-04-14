<template>
    <div class="outside">
        <el-row>
            <el-descriptions :column="5" border>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-info"></i>
                    宠物名称
                  </template>
                  {{ petData.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-grid"></i>
                    宠物种类
                  </template>
                  {{ petData.type }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label" >
                    <i class="el-icon-s-data"></i>
                    性别
                  </template>
                  {{ petData.gender }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label" >
                      <i class="el-icon-s-data"></i>
                      年龄
                    </template>
                    {{ petData.age }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label" >
                      <i class="el-icon-s-data"></i>
                      重量
                    </template>
                    {{ petData.weight }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label" :span="5">
                      <i class="el-icon-s-data"></i>
                      病情描述
                    </template>
                    {{ petData.description }}
                </el-descriptions-item>
            </el-descriptions>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form style="margin-top: 30px;" ref="operateFormData" :rules="rules" :model="operateFormData" :inline="inline" label-width="80px" :disabled="isDisabled">
                    <el-form-item label="诊断结果" prop="diagnosis">
                        <el-input type="textarea" v-model="operateFormData.diagnosis" placeholder='请输入诊断结果'
                          :maxlength='500'>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="疾病类别" prop="disease">
                        <cascader
                          :url="url"
                          @change="handleChange"
                        ></cascader>
                        </el-form-item>
                    <el-form-item label="病例检查" prop="examination">
                        <el-select v-model="operateFormData.examination" multiple clearable placeholder="请选择检查项目">
                          <el-option
                            v-for="item in examinations"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="诊疗方案" prop="treatment">
                        <el-select v-model="operateFormData.treatment" multiple clearable placeholder="请选择诊疗药品">
                          <el-option
                            v-for="item in medicines"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>      
                </el-form>

            </el-col>
            <el-col :span="12" v-show="isDisabled">
                <el-descriptions style="margin-top: 30px;" :column="1" border>
                  <el-descriptions-item >
                    <template slot="label">
                      <i class="el-icon-info"></i>
                      疾病类别
                    </template>
                    <el-tag style="margin-right: 5px;" v-for="(item, index) in petData.diseases" :key="index">
                      {{ item.name }}
                    </el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item>
                    <template slot="label" >
                      <i class="el-icon-s-data"></i>
                      总价（元）
                    </template>
                    {{ price.total_price }}
                  </el-descriptions-item>
                  <el-descriptions-item  :span="2">
                    <template slot="label" >
                      <i class="el-icon-s-data"></i>
                      所选检查项目价格（元）
                    </template>
                    {{ price.examination_price }}
                  </el-descriptions-item>
                  <el-descriptions-item  :span="2">
                    <template slot="label" >
                      <i class="el-icon-s-data"></i>
                      所选诊疗方案价格（元）
                    </template>
                    {{ price.treatment_price }}
                  </el-descriptions-item>


                    <el-descriptions-item :span="2">
                      <template slot="label">
                        <i class="el-icon-s-grid"></i>
                        参考检查项目
                      </template>
                      <el-tag style="margin-right: 5px; " v-for="(item, index) in petData.checkups" :key="index">
                        {{ item.name }}
                      </el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item :span="2">
                      <template slot="label" >
                        <i class="el-icon-s-data"></i>
                        参考诊疗方案
                      </template>
                      <el-tag style="margin-right: 5px;"  type="success" v-for="(item, index) in petData.medicines" :key="index">
                        {{ item.name }}
                      </el-tag>
                    </el-descriptions-item>

                </el-descriptions>
            </el-col>
        </el-row>
        <div slot="footer" class="footer">
            <el-button type="" @click="back('operateFormData')">退出</el-button>
            <el-button v-show="!isDisabled" type="primary" @click="confirm('operateFormData')">提交检查结果</el-button>
        </div>
    </div>

</template>
  
<script>
    import {getFormData, postFormData} from "@/utils/api";
    import Cascader from "@/components/CommonCascader.vue";
    export default {
    name: 'RealDiseaseLearningDetail',
    components: {
        Cascader
    },
    data() {
        return {
            inline: false,
            isShow: false,
            isDisabled: false,

            url: '/diseaseManage/getDiseaseTypes',
            petData: {},

            examinations: [],
            medicines: [],
            price: {},

            // 表单数据，不一定都显示，但会传回后端
            operateFormData: {
                disease: [],
                diagnosis: '',
                examination: [],
                treatment: [],
            },

            rules: {
                disease: [
                    {required: true, message: '请选择疾病所属类型', trigger: 'change'},
                ],
                examination: [
                    {required: true, message: '请选择相关检查项目', trigger: 'change'}
                ],
                diagnosis: [
                    {required: true, message: '请填写病例诊断结果', trigger: 'blur'},
                    {min: 2, message: '诊断结果不得少于2个字', trigger: 'blur'},
                    {max: 500, message: '诊断结果不得多于500个字', trigger: 'blur'}
                ],
                treatment: [
                    {required: true, message: '请选择相关诊疗方案', trigger: 'change'}
                ],
            },
        }
    },
    methods: {
        handleChange(value) {
            console.log(value)
            this.operateFormData.disease = value
        },
        validateAnswer() {
            console.log(this.operateFormData.answers.length + ' ' + this.questions_info.length)
            if(this.operateFormData.answers.length < this.questions_info.length) {
                return false
            }
            return true
        },


        getOnePet() {
            getFormData('/petProfile/getOnePetProfile', {id: this.$route.query.id}).then((resp) => {
                this.petData = resp.data.result
            })
        },

        back() {
            if(this.isDisabled === true) {
                this.$confirm('确认退出吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({name: 'functionalLearning_realDiseaseLearning'});
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消退出'});
                });
            }
            else {
                this.$confirm('还有项目未填写，确认退出吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({name: 'functionalLearning_realDiseaseLearning'});
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消退出'});
                });
            }

        },
        confirm(formName) {
        this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.operateFormData)
                    this.isDisabled = true
                    postFormData('/learn/getTotalPrice').then((resp) => {
                        this.price = resp.data.result
                    })
                }
                });
        },
        loadAllData() {
            this.getOnePet()
            this.loadExaminations()
            this.loadMedicines()
        },
        loadExaminations() { 
        getFormData('/checkup/getAllCheckups').then((resp) => {
            this.examinations = resp.data.result.checkups
        })
        },
        loadMedicines() { 
        getFormData('/medicine/getAllMedicines').then((resp) => {
            this.medicines = resp.data.result.medicines
        })
        },

    }, 
    mounted() {
        this.loadAllData()
    },
    beforeDestroy() {
    //   this.$bus.$off('toFormValid')
    }
    }
</script>

<style>
.outside {
   margin-left: 10%; margin-top:5%; margin-bottom: 5%;
}

.outside .score {
    text-align: right; margin-right: 50px;
    font-weight: bold;
}

.footer {
    text-align: right;
    margin: 10px;
}
</style>