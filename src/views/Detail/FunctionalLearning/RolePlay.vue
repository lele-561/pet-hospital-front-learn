<template>
    <div>
        <!-- 选择角色 -->
        <div class="block" v-show="!isDetail">
            <el-row :gutter="24">
                <el-col :span="8">
                  <el-card class="card" :body-style="{ padding: '0px' }" shadow="hover" @click.native="selectRole('前台')">
                    <img src="https://l.b2b168.com/2022/03/07/15/202203071555327960284.jpg" class="image">
                    <div style="margin: 5px; text-align: center;">
                        <h1><i class="el-icon-thumb"></i> 前台</h1>
                      <!-- <el-button type="primary" icon="el-icon-thumb" round style="margin-bottom: 10px;">前台</el-button> -->
                    </div>
                  </el-card>
                </el-col>

                <el-col :span="8">
                    <el-card class="card" :body-style="{ padding: '0px' }" shadow="hover" @click.native="selectRole('兽医')">
                      <img src="https://www.houstonansweringservices.com/site/wp-content/uploads/2018/08/veterinarian.jpg" class="image">
                      <div style="margin: 5px; text-align: center;">
                        <h1><i class="el-icon-thumb"></i> 兽医</h1>
                      <!-- <el-button type="primary" icon="el-icon-thumb" round style="margin-bottom: 10px;">前台</el-button> -->
                    </div>
                    </el-card>
                </el-col>

                <el-col :span="8">
                    <el-card class="card" :body-style="{ padding: '0px' }" shadow="hover" @click.native="selectRole('医助')">
                      <img src="https://media.sortly.com/wp-content/uploads/2022/01/20040903/Veterinary-hospital-inventory-1110x628.jpg" class="image">
                      <div style="margin: 5px; text-align: center;">
                        <h1><i class="el-icon-thumb"></i> 医助</h1>
                    </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>


    </div>
</template>
  
<script>
    import {getFormData, postFormData} from "@/utils/api";
    export default {
    name: "RolePlay",
    components: {
    },
    data() {
        return {
            isDetail: false,
            action_infos: [],
            rowData: [],
            colData: [],
        }
    },
    methods: {
        selectRole(type) {
            this.$router.push({name: 'functionalLearning_rolePlayDetail', query: {id: type}});
        }
    },
    mounted() {
        
    },
    
}
</script>

<style scoped>
.block{
    margin: 50px;
    width: 70%;
    text-align: center;
}
.card {
    border-radius: 7%;

}
.image {
    width: 500px;
    height: 300px;
    display: block;
}



</style>
