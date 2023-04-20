<template>
  <div>
    <el-row>
      <el-col :span=24>
        <el-card class='card'>
          <h2>虚拟宠物医院学习系统 v1.0</h2>
          <h3>
            本系统是虚拟宠物医院的学习系统，使用者可通过学习系统了解宠物医院结构、科室、进行病例学习等。本系统包含医院导览、线上测试和职能学习三个模块。
          </h3>
          <h3>⭐医院导览：采用3D虚拟建模技术模拟医院科室，让用户身临其境感受各个科室的环境和器械。</h3>
          <h3>⭐线上测试：用户可通过参加线上测试，检验宠物医学知识的学习成果。</h3>
          <h3>⭐职能学习：包括角色扮演、病例学习以及真实病例学习。</h3>
          <div style="margin-left: 30px;">
            <h4>角色扮演：实习生可以选择前台、医助、兽医等岗位角色，以便认识掌握宠物医院的各工作岗位的工作内容、岗位责任、流程等。</h4>
            <h4>病例学习：可以按病例目录选择病例，学习病例的基本信息。</h4>
            <h4>真实病例学习：可以选择虚拟宠物进行诊疗，学习宠物医院对患病宠物诊疗的全过程。</h4>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      items: []
    }
  },
  methods: {},
  mounted() {
  }
}

</script>

<style lang='less' scoped>
.card {
  margin-top: 10px;
  height: 500px;

}
</style>