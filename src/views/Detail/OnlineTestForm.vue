<template>
    <div class="outside">
        <h3>{{ exam_info.exam_name }}</h3>
        <div class="score">总分：{{ total_score }}</div>
        <el-form ref="operateFormData" :model="operateFormData" :inline="inline" label-width="10px" :disabled="isDisabled">
            <el-form-item v-for="( item, index ) in questions_info" :key="item.question_id">
                <div>
                    <span>{{ index+1 }}.</span>
                    {{ item.title }}
                </div>
                <el-radio-group ref="answersGroup" :index="index" v-model="operateFormData.answers[index]" style="margin-left: 25px;" >
                    <el-radio style="margin: 7px;" label="1">A. {{ item.optionA }}</el-radio><br/>
                    <el-radio style="margin: 7px;" label="2">B. {{ item.optionB }}</el-radio><br/>
                    <el-radio style="margin: 7px;" label="3">C. {{ item.optionC }}</el-radio><br/>
                    <el-radio style="margin: 7px;" label="4">D. {{ item.optionD }}</el-radio><br/>
                </el-radio-group>
                <div v-if="isDisabled" style="color: darkgreen; font-weight: bold;">
                    <span>正确答案：</span>
                    {{ item.answer }}
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="footer">
            <el-button type="" @click="back('operateFormData')">退出</el-button>
            <el-button v-show="!isDisabled" type="primary" @click="confirm('operateFormData')">提交</el-button>
        </div>
    </div>

</template>
  
<script>
    import {getFormData, postFormData} from "@/utils/api";
    export default {
    name: 'OnlineTestForm',

    data() {
        return {
            inline: false,
            isShow: false,
            isDisabled: false,
            total_score: 0,
            exam_info: [],
            questions_info: [],
            question_score: 0,
            question_num: 0,

            // 表单数据，不一定都显示，但会传回后端
            operateFormData: {
                answers: []
            },
        }
    },
    methods: {
        validateAnswer() {
            console.log(this.operateFormData.answers.length + ' ' + this.questions_info.length)
            if(this.operateFormData.answers.length < this.questions_info.length) {
                return false
            }
            return true
        },
        calculateScore() {
            console.log(this.question_score)
            var ans = this.operateFormData.answers
            for(let i = 0; i < ans.length; i++) {
                if(ans[i] === this.questions_info[i].answer_num) {
                    this.total_score = this.total_score + this.question_score
                }
            }
            console.log("total = "+this.total_score)
            postFormData('/exam/updateUserExam', {history_score: this.total_score, user_id: '1122', exam_id: this.$route.query.id}).then((resp) => {
                console.log("submit")
            })
        },
        num2answer(string) {
            if(string === '1') {
                return 'A'
            }
            else if (string === '2') {
                return 'B'
            }
            else if (string === '3') {
                return 'C'
            }
            else if (string === '4') {
                return 'D'
            }
        },
        getOneExam() {
            getFormData('/examManage/getOneExam', {exam_id: this.$route.query.id}).then((resp) => {
                this.exam_info = resp.data.result.exam_info
                var paper_id = resp.data.result.exam_info.paper_info.paper_id
                this.getOnePaper(paper_id)
            })
        },
        getOnePaper(paper_id) {
            getFormData('/examManage/getOnePaper', {paper_id: paper_id}).then((resp) => {
                var old_resp = resp.data.result.paper_info.questions
                for(let i = 0; i < old_resp.length; i++) {
                    var temp_info = {
                        question_id: old_resp[i].question_id,
                        title: old_resp[i].title,
                        optionA: old_resp[i].optionA,
                        optionB: old_resp[i].optionB,
                        optionC: old_resp[i].optionC,
                        optionD: old_resp[i].optionD,
                        answer: this.num2answer(old_resp[i].answer),
                        answer_num: old_resp[i].answer
                    }
                    this.questions_info.push(temp_info)
                }
                // this.questions_info = resp.data.result.paper_info.questions
                this.question_score = resp.data.result.paper_info.question_score
                this.question_num = resp.data.result.paper_info.question_num
                // this.operateFormData.questions = this.questions_info
            })
            console.log(this.questions_info)
        },
        back() {
            if(this.isDisabled === true) {
                this.$confirm('确认退出吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({name: 'onlineTest'});
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消退出'});
                });
            }
            else {
                this.$confirm('还有题目未提交，退出后将不计本次成绩，确认退出吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({name: 'onlineTest'});
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消退出'});
                });
            }

        },
        confirm(formName) {
            if(this.validateAnswer()) {
                this.$confirm('确认提交吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.isDisabled = true
                    console.log(this.operateFormData.answers)
                    this.calculateScore()
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消提交'});
                });
            }
            else {
                this.$confirm('还有题目未完成，确认提交吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.isDisabled = true
                    console.log("eooooooooooooo")
                    console.log(this.operateFormData.answers)
                    this.calculateScore()
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消提交'});
                });
            }
            
        },
    //   resetForm() {
    //     this.$refs.form.resetFields()
    //   }
    }, 
    mounted() {
        this.getOneExam()
    },
    beforeDestroy() {
    //   this.$bus.$off('toFormValid')
    }
    }
</script>

<style>
.outside {
    width: 70%; margin-left: 10%; margin-top:5%; margin-bottom: 5%;
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