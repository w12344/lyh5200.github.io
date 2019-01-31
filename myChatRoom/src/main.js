import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"
import './styles/default.css';

// 使用museui组件
import MuseUI from "muse-ui"
import 'muse-ui/dist/muse-ui.css'
import "./styles/main.style";
import socket from "./socket"

import {queryString} from "@utils/queryString"

import vuePicturePreview from "./components/photo-viewer"

Vue.use(vuePicturePreview);

Vue.use(MuseUI)
Vue.config.productionTip = false;

const Notification = window.Notification;

// 提示
const popNotice = function(msgInfo){
  if(Notification.permission == "granted"){
    let content = "";
    if(msgInfo.img != ""){
      // content = '[图片]'；
    }else{
      content = msgInfo.msg;
    }
    const notification = new Notification(`[${msgInfo.roomid}]提示`,{
      body:content,
      icon:msgInfo.src
    });

    notification.onclick = function(){
      notification.close()
    }
  }
}

//websocket 消息接受
socket.on('content',()=>{
  console.log(content);
  const roomId = queryString(window.localtion.href,'roomid');
  const userId = store.state.userInfo.userid;
  if(userId){
    socket.emit('login',{name:userId})
  }
  if(roomId){
    const obj ={
      name:userId,
      src:store.state.userInfo.src,
      roomid:roomId
    }
  socket.emit('room',obj)
  }
})

// 下线通知
socket.on('disconnect',()=>{
  console.log(disconnect);
})


socket.on("message",function(obj){
  store.commit('addRoomDetailInfos',[obj]);
  console.log(Notification.permission);
  if(Notification.permission == 'granted'){
    popNotice(obj)
  }else if(Notification.permission !=='denied'){
    Notification.requestPermission(function(persission){
      popNotice(obj)
    })
  }
})


document.addEventListener('touchstart',(e)=>{
  if(e.target.className.indexOf('emoji')>-1 || e.target.parentNode.className.indexOf('emoji')>-1){
    store.commit('setEmoji',true)
  }else{
    store.commit('setEmoji',false);
  }
})


document.addEventListenter('click',(e)=>{
  if(e.target.className.indexOf('emoji')>-1 || e.target.parentNode.className.indexOf('emoji')>-1){
    store.commit('setEmoji',true)
  }else{
    store.commit('setEmoji',false)
  }
})

new Vue({
  el:"app",
  router,
  store,
  template:"<App/>",
  components:{App}
})