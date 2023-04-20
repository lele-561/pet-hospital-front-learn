<template>
    <div>
        <div>
            <common-table-operator :tableData="tableData" :tableLabel="tableLabel" @test="handleTest" :text="'参加考试'"
            ></common-table-operator>
            <div style="text-align: center; margin-top: 10px">
              <el-pagination :page-count="totalPages" :page-size="pageSize" :pager-count='7' background
                             layout="prev, pager, next, jumper" @current-change="handleCurrentChange">
              </el-pagination>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import {getFormData, postFormData} from "@/utils/api";
  import CommonForm from "@/components/CommonForm.vue";
  import CommonTableOperator from "@/components/CommonTableOperator.vue"
  
  export default {
    name: "OnlineTest",
    components: {
      CommonForm, CommonTableOperator
    },
    data() {
      return {
        disease_type_id: -1,
        operateType: "add",
        isShow: false,

        pageSize: 10,
        totalPages: 1,
        currentPage: 1,

        questions: [],

        formValid: true,
        input: "",
        // 表单配置，显示在页面的所有内容
        operateFormLabel: [
        ],
        // 表单数据，不一定都显示，但会传回后端
        operateFormData: {
        },
        // 表格配置
        tableData: [],
        tableLabel: [
          {prop: "exam_name", label: '考试名称'},
          {prop: "start_time", label: '考试开始时间'},
          {prop: "end_time", label: '考试结束时间'},
          {prop: "is_done", label: '考试状态'},
          {prop: "history_score", label: '历史得分'},
        ]
      };
    },
    methods: {
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage
            this.loadAllExams()
        },
        loadAllExams() {
            postFormData('/exam/getAllExams', {user_id: '1233' , currentPage: this.currentPage}).then((resp) => {
                var old_resp = resp.data.result.infos
                for(let i = 0; i < old_resp.length; i++) {
                    var is_done_val = '未完成'
                    if(old_resp[i].is_done) {
                        is_done_val = '已完成'
                    }
                    var temp_info = {
                        exam_id: old_resp[i].exam_id,
                        exam_name: old_resp[i].exam_name,
                        start_time: old_resp[i].start_time,
                        end_time: old_resp[i].end_time,
                        is_done: is_done_val,
                        history_score: old_resp[i].history_score
                    }
                    this.tableData.push(temp_info)
                }
                this.totalPages = resp.data.result.totalPages
                this.currentPage = resp.data.result.currentPage
            })
            // console.log(this.tableData)
        },
        handleTest(row) {
            // this.operateType = 'edit';
            // this.getOneExam(row)
            this.$router.push({name: 'onlineTest_test', query: {id: row.exam_id}});
        },
    },
    mounted() {
        this.currentPage = 1
        this.loadAllExams()

    },
};
</script>

<style lang="less" scoped>
.header-button {
display: inline;
float: right;
margin-top: 2%;
}

.search {
display: inline;
margin-top: 2%;
float: right;
}
</style>