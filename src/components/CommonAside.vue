<template>
  <!-- 左侧菜单 -->
  <el-menu
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      alive-text-color="#C5A553"
      class="el-menu-vertical-demo"
      text-color="#fff">
    <h2>虚拟宠物医院</h2>
    <h3>学习系统</h3>
    <!-- :index跳转路由使用 -->
    <el-menu-item v-for="item in noChildren" :key="item.path" :index="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path"
                          class="el-menu-vertical-demo">
        <el-menu-item :index="subItem.path" @click="clickMenu(subItem)">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menu: [{
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      },
        {
          path: '/hospitalGuide',
          name: 'hospitalGuide_map',
          label: '医院导览',
          icon: 'location',
          url: 'hospitalGuide/hospitalGuide'
        },
        {
          path: '/functionalLearning',
          label: '职能学习',
          icon: 's-custom',
          children: [
            {
              path: 'functionalLearning/rolePlay',
              name: 'functionalLearning_rolePlay',
              label: '角色扮演',
              icon: 'collection-tag',
              url: 'rolePlay/rolePlay'
            },
            {
              path: 'functionalLearning/diseaseLearning',
              name: 'functionalLearning_diseaseLearning',
              label: '病例学习',
              icon: 'collection-tag',
              url: 'diseaseLearning/diseaseLearning'
            },
            {
              path: 'functionalLearning/RealDiseaseLearning',
              name: 'functionalLearning_realDiseaseLearning',
              label: '真实病例学习',
              icon: 'collection-tag',
              url: 'realDiseaseLearning/realDiseaseLearning'
            },
          ]
        },
        {
          path: '/onlineTest',
          name: 'onlineTest',
          label: '线上测试',
          icon: 's-claim',
          url: 'onlineTest/onlineTest'
          // children: [
          //   {
          //     path: '/',
          //     name: '',
          //     label: '',
          //     icon: 'collection-tag',
          //     url: '/'
          //   },
          // ]
        }],
    };
  },
  methods: {
    clickMenu(item) {
      this.$router.push({name: item.name});
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    hasChildren() {
      return this.menu.filter(item => item.children)
    },
  }
}
</script>


<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 8px;
  background-color: #1e2d40;
}

.el-menu {
  height: 100%;
  border: none;

  h2 {
    color: #fff;
    text-align: center;
    line-height: 40px;
  }

  h3 {
    color: #fff;
    text-align: center;
    line-height: 10px;
  }
}
</style>

