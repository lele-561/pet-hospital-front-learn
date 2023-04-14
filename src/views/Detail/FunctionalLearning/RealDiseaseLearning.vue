<template>
  <div>
      <div>
          <common-table-operator :tableData="tableData" :tableLabel="tableLabel" @test="handleTest" :text="'学习病例'"
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
  name: "RealDiseaseLearning",
  components: {
    CommonForm, CommonTableOperator
  },
  data() {
    return {
      pageSize: 10,
      totalPages: 1,
      currentPage: 1,

      // 表格配置
      tableData: [],
      tableLabel: [
        {prop: "name", label: '宠物名称'},
        {prop: "type", label: '宠物类别'},
        {prop: "gender", label: '性别'},
        {prop: "age", label: '年龄'},
      ]
    };
  },
  methods: {
      handleCurrentChange: function (currentPage) {
          this.currentPage = currentPage
          this.loadAllPets()
      },
      loadAllPets() {
          getFormData('/petProfile/getAllPetProfiles', {currentPage: this.currentPage}).then((resp) => {
              this.tableData = resp.data.result.petProfiles
              this.totalPages = resp.data.result.totalPages
              this.currentPage = resp.data.result.currentPage
          })
      },
      handleTest(row) {
          this.$router.push({name: 'functionalLearning_realDiseaseLearningDetail', query: {id: row.id}});
      },
      
  },
  mounted() {
      this.currentPage = 1
      this.loadAllPets()

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