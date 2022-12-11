import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import L from './assets/leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-rotatedmarker'
import 'vue2-leaflet-canvas-marker'
import 'leaflet.smoothzoom'
import 'leaflet-rotate'
import "babel-polyfill"
import PubSub from 'pubsub-js'
import {Input,Tooltip,Dropdown,DropdownMenu,DropdownItem, MessageBox, Notification, Button, Loading, Row, Col, Menu, MenuItem, Submenu, MenuItemGroup, Select, Option, Tabs, TabPane, Form, FormItem, Message, Checkbox, CheckboxGroup, Switch, Table, TableColumn, Carousel, CarouselItem, Image, Backtop, Card, Upload, Tree, Link} from 'element-ui'
import Highlight from '@/utils/highlight'
Vue.use(Highlight)
Vue.use(VueRouter)
Vue.component(Input.name,Input)
Vue.component(Tooltip.name,Tooltip)
Vue.component(Dropdown.name,Dropdown)
Vue.component(DropdownMenu.name,DropdownMenu)
Vue.component(DropdownItem.name,DropdownItem)
Vue.component(MessageBox.name,MessageBox)
Vue.component(Notification)
Vue.component(Button.name,Button)
Vue.component(Row.name,Row)
Vue.component(Col.name,Col)
Vue.component(Menu.name,Menu)
Vue.component(MenuItem.name,MenuItem)
Vue.component(Submenu.name,Submenu)
Vue.component(MenuItemGroup.name,MenuItemGroup)
Vue.component(Select.name,Select)
Vue.component(Option.name,Option)
Vue.component(Tabs.name,Tabs)
Vue.component(TabPane.name,TabPane)
Vue.use(Loading.directive)
Vue.component(Form.name,Form)
Vue.component(FormItem.name,FormItem)
Vue.component(MessageBox)
Vue.component(Message)
Vue.component(Checkbox.name,Checkbox)
Vue.component(CheckboxGroup.name,CheckboxGroup)
Vue.component(Switch.name,Switch)
Vue.component(Table.name,Table)
Vue.component(TableColumn.name,TableColumn)
Vue.component(Carousel.name,Carousel)
Vue.component(CarouselItem.name,Carousel)
Vue.component(Image.name,Image)
Vue.component(Backtop.name,Backtop)
Vue.component(Card.name,Card)
Vue.component(Upload.name,Upload)
Vue.component(Tree.name,Tree)
Vue.component(Link.name)
Vue.prototype.$axios = axios
Vue.prototype.L = L
Vue.prototype.qs = qs
Vue.config.productionTip = false
Vue.prototype.$notify = Notification
Vue.prototype.$alert = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.pubsub = PubSub
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
