import{d as w,e as p,i as x,o as n,c as i,a,F as r,a7 as _,J as g,T as c,P as m,V as S,ak as k,ax as f,ay as y,az as I}from"./@vue-BQofRocO.js";import{_ as z}from"./plugin-vueexport-helper-DlAUqK2U.js";const C="/win2008ui/ico/user_pic.png",o=e=>(y("data-v-e15a96b7"),e=e(),I(),e),M={class:"lr-box"},B={class:"l-box"},L=["onClick"],N=o(()=>a("div",{class:"zw"},null,-1)),$=o(()=>a("span",null,null,-1)),F={id:"sub_menu",class:"shadow-window"},V=["onClick"],D=["src","alt"],E={class:"r-box"},T=o(()=>a("div",{class:"user_pic"},[a("img",{src:C,alt:"user_pic"})],-1)),A={class:"app"},J=o(()=>a("div",{class:"app"},"文档",-1)),P=o(()=>a("span",null,null,-1)),U=f('<div class="app" data-v-e15a96b7>网络</div><span data-v-e15a96b7></span><div class="app" data-v-e15a96b7>控制面板</div><div class="app" data-v-e15a96b7>设备和打印机</div><div class="app" data-v-e15a96b7>管理工具</div><div class="app" data-v-e15a96b7>帮助和支持</div><div class="app" data-v-e15a96b7>运行...</div><span data-v-e15a96b7></span><div class="app" data-v-e15a96b7>Windows 安全</div>',9),W={class:"b-box"},j=o(()=>a("div",{class:"search"},null,-1)),q=w({__name:"StartMenu",props:{switch_menu_show:{type:Function},open_app:{type:Function},appList:{type:{}},menu_app_list:{type:[]}},setup(e){const l=p(!1),h=p(""),u=p(""),b=()=>{localStorage.removeItem("user_name"),localStorage.removeItem("openedApps"),window.location.reload()};return x(()=>{var d;(d=document.getElementById("start_menu_box"))==null||d.focus()}),(d,t)=>(n(),i("div",{id:"start_menu_box",class:"shadow-window",tabindex:"-1",onBlur:t[4]||(t[4]=(...s)=>e.switch_menu_show&&e.switch_menu_show(...s))},[a("div",M,[a("div",B,[(n(!0),i(r,null,_(e.menu_app_list,s=>(n(),i("div",{class:"app",onClick:v=>e.open_app(s),style:g({backgroundImage:"url("+e.appList[s].icon+")",backgroundSize:"32px 32px"})},c(e.appList[s].zhName),13,L))),256)),N,$,a("div",{class:"app",id:"show_all_apps",onMouseover:t[0]||(t[0]=s=>l.value=!0),onMouseout:t[1]||(t[1]=s=>l.value=!1)},[m(a("div",F,[(n(!0),i(r,null,_(e.appList,(s,v)=>(n(),i("div",{class:"sub_menu_app",onClick:G=>e.open_app(v)},[a("img",{src:s.icon,alt:s.zhName},null,8,D),a("a",null,c(s.zhName),1)],8,V))),256))],512),[[S,l.value]])],32)]),a("div",E,[T,a("div",A,c(h.value),1),J,P,a("div",{class:"app",onClick:t[2]||(t[2]=s=>e.open_app("computer"))},"计算机"),U])]),a("div",W,[m(a("input",{type:"text",placeholder:" 搜索程序和文件","onUpdate:modelValue":t[3]||(t[3]=s=>u.value=s),disabled:"true"},null,512),[[k,u.value]]),j,a("div",{class:"logout",onClick:b},"注销")])],32))}}),O=z(q,[["__scopeId","data-v-e15a96b7"]]);export{O as default};