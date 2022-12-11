import VueRouter from "vue-router";
//import Airport from "../pages/Airport"
import Chart from '../pages/Chart'
import Checklist from "../pages/Checklist"
//import Enroute from "../pages/Enroute"
import Other from "../pages/Other"
import Personal from "../pages/Personal"
import Supplement from "../pages/Supplement"
import Develop from "../pages/Develop"
import Login from '../components/Login'
import About from '../pages/About'
import Index from '../pages/About/Index'
import Download from '../pages/About/Download'
import Development from '../pages/About/Develop'
import API from '../pages/About/API'
import APIv1 from '../pages/About/APIv1'
import DonateUs from '../pages/About/DonateUs'
export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/Chart',
        },
        {
            path:'/Index',
            redirect:'/Chart',
        },
        {
            path:'/Login',
            name:'Login',
            component:Login
        },
        {
            path:'/Airport',
            redirect:'/Chart',
        },
        {
            path:'/Checklist',
            name:'Checklist',
            component:Checklist,
            meta:{
                keepAlive:true
            },
            beforeRouteLeave(to,from,next){
                to.meta.keepAlive = true
                next(0)
              }
        },
        {
            path:'/Enroute',
            redirect:'/Chart',
        },
        {
            path:'/Chart',
            name:'Chart',
            component:Chart,
            meta:{
                keepAlive:true
            },
            beforeRouteLeave(to,from,next){
                to.meta.keepAlive = true
                next(0)
              }
        },
        {
            path:'/Other',
            name:'Other',
            component:Other
        },
        {
            path:'/Personal',
            name:'Personal',
            component:Personal
        },
        {
            path:'/Supplement',
            name:'Supplement',
            component:Supplement
        },
        {
            path:'/Develop',
            name:'Develop',
            component:Develop
        },
        {
            path:'/About',
            name:'About',
            component:About,
            children:[
                {
                    path:'Index',
                    name:'Index',
                    component:Index
                },
                {
                    path:'Download',
                    name:'Download',
                    component:Download
                },
                {
                    path:'Development',
                    name:'Development',
                    component:Development
                },
                {
                    path:'API',
                    name:'API',
                    component:API
                },
                {
                    path:'APIv1',
                    name:'APIv1',
                    component:APIv1
                },
                {
                    path:'DonateUs',
                    name:'DonateUs',
                    component:DonateUs
                },
                {
                    path:'Donate',
                    redirect:'/About/DonateUs'
                }
            ]
        },
        {
            path:'/*',
            redirect:'/Chart',
        }
    ],
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}