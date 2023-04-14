import Vue from 'vue';
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login'
import Register from '@/views/Register'

import HospitalMap from "../views/Detail/HospitalGuide/HospitalMap";
import OnlineTest from '../views/Detail/OnlineTest'
import DiseaseLearning from '../views/Detail/FunctionalLearning/DiseaseLearning'
import RolePlay from '../views/Detail/FunctionalLearning/RolePlay'
import RolePlayDetail from '../views/Detail/FunctionalLearning/RolePlayDetail'
import RealDiseaseLearning from '../views/Detail/FunctionalLearning/RealDiseaseLearning'
import RealDiseaseLearningDetail from '../views/Detail/FunctionalLearning/RealDiseaseLearningDetail'
import OnlineTestForm from '../views/Detail/OnlineTestForm'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/login',     // 后面改成增加注册，要改成/login
    meta: {
        login: true
    },
    children: [{
        path: 'home',
        name: 'home',
        component: Home,
        meta: {
            login: true
        }
    },
        // 医院导览
        {
            path: 'hospitalGuide/map',
            name: 'hospitalGuide_map',
            component: HospitalMap
        },
        //线上测试
        {
            path: '/onlineTest',
            name: 'onlineTest',
            component: OnlineTest
        },
        {
            path: 'onlineTest/test',
            name: 'onlineTest_test',
            component: OnlineTestForm
        },
        //病例学习
        {
            path: 'functionalLearning/diseaseLearning',
            name: 'functionalLearning_diseaseLearning',
            component: DiseaseLearning
        },
        //真实病例学习
        {
            path: 'functionalLearning/realDiseaseLearning',
            name: 'functionalLearning_realDiseaseLearning',
            component: RealDiseaseLearning
        },
        {
            path: 'functionalLearning/realDiseaseLearningDetail',
            name: 'functionalLearning_realDiseaseLearningDetail',
            component: RealDiseaseLearningDetail
        },
        //角色扮演
        {
            path: 'functionalLearning/rolePlay',
            name: 'functionalLearning_rolePlay',
            component: RolePlay
        },
        {
            path: 'functionalLearning/rolePlayDetail',
            name: 'functionalLearning_rolePlayDetail',
            component: RolePlayDetail
        },
    ]
},
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            login: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            login: false
        }
    },
    
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router