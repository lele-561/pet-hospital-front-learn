<template>
    <div>
        <!-- action列表 -->
        <div class="list" v-show="!isDetail"> 
            <el-button round icon="el-icon-back" @click="backToRole">退出</el-button>
            <div style="margin: 50px;">
                <el-row class="rowClass" v-for="(colArr, index) in rowData" :key="index" :gutter="24">
                <el-col v-for="(btn, index) in colArr" :key="index" :span="8">
                    <el-button class="buttonClass" plain @click="viewAction" :id="btn.procedure_id">{{ btn.action }}</el-button>
                </el-col>
                </el-row>
            </div>
        </div>
        <!-- 具体步骤内容 -->
        <div>
            <div class="block" v-show="isDetail">
                <el-button round icon="el-icon-back" @click="back">退出</el-button>
                <el-button type="primary" round icon="el-icon-arrow-right" @click="add">下一步</el-button>
                <h1 style="margin-left: 25px;">{{ curr_action }}</h1>
                <el-timeline style="margin: 30px;">
                  <el-timeline-item v-for="(item, index) in actions" :key="index">
                    <el-card>
                      <!-- <h1>第{{ item.procedure_id }}步</h1> -->
                      <div v-html="item.next_step"></div>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
            </div>
        </div>


        
    </div>
</template>
  
<script>
    import {getFormData, postFormData} from "@/utils/api";
    import CommonForm from "@/components/CommonForm.vue";
    import CommonTableOperator from "@/components/CommonTableOperator.vue"

    export default {
    name: "RolePlayDetail",
    components: {
        CommonForm, CommonTableOperator
    },
    data() {
        return {
            isDetail: false,
            action_infos: [],
            rowData: [],
            colData: [],
            actions: [],
            curr_id: 0,
            curr_action: ''
        }
    },
    methods: {
        add() {
            if(this.actions[this.actions.length-1].is_last_step === true) {
                this.$message({
                    message: '已是最后一步！',
                    type: 'success'
                });
            }
            else {
                postFormData('/rolePlay/getNextStep', {procedure_id: this.curr_id, curr_step: this.actions.length+1}).then((resp) => {
                    // console.log(resp.data.result)
                    this.actions.push(resp.data.result)
                })
            }
        },
        viewAction(e) {
            let id = e.currentTarget.getAttribute("id")
            // console.log(id)
            this.curr_id = id
            // console.log(this.action_infos)
            let obj = {}
                obj = this.action_infos.find((item) => {
                    return item.procedure_id === parseInt(id)
                }
                )
            this.curr_action = obj.action
            postFormData('/rolePlay/getNextStep', {procedure_id: this.curr_id, curr_step: 1}).then((resp) => {
                // console.log(resp.data.result)
                this.actions.push(resp.data.result)
            })
            this.isDetail = true
        },
        backToRole() {
            this.$router.push({name: 'functionalLearning_rolePlay'});
        },
        back() {
            this.isDetail = false
            this.actions = []
            this.curr_id = 0
        },
        getRoleDetail() {
            // console.log(this.$route.query.id)
            getFormData('/rolePlay/getAllActions', {role_type: this.$route.query.id}).then((resp) => {
                this.action_infos = resp.data.result.action_infos
                this.rowData = []
                this.colData = []
                if(this.action_infos.length <= 3) {
                    this.rowData.push(this.action_infos)
                }
                else {
                    this.action_infos.forEach((item, index, cols) => {
                        this.colData.push(item)
                        if((index + 1) % 3 === 0) {
                        this.rowData.push(this.colData)
                        this.colData = []
                        }
                    })
                    this.rowData.push(this.colData)
                }
            })
        }
    },
    mounted() {
        this.getRoleDetail()
    },
    
}
</script>

<style scoped>
.block{
    margin: 50px;
    width: 70%;
}
.buttonClass {
    width : 100%;

  }
.list .rowClass {
    padding-bottom: 10px;
}
.list {
    margin: 50px;
}
</style>
