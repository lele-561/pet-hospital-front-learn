import Vue from 'vue';
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login'
import Register from '@/views/Register'

import HospitalMap from "../views/Detail/HospitalGuide/HospitalMap";
import RoomDetail from "../views/Detail/HospitalGuide/RoomDetail";

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
        {
            path: 'hospitalGuide/room',
            name: 'hospitalGuide_room',
            component: RoomDetail
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
    }
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