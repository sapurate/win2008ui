const __vite__fileDeps=["static/js/jz_nav-DcBjpCRJ.js","static/js/axios-B4uVmeYG.js","static/js/@vue-BQofRocO.js","static/js/plugin-vueexport-helper-DlAUqK2U.js","static/css/jz_nav-BXyIV4Ev.css","static/js/jz_set-71-O-FgD.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_ as b}from"./index-ErPw_cqS.js";import{aA as I,e as m,s as L,i as P,ah as S,o as y,c as E,a,T,I as N,U as k,O as B,S as C,P as _,ak as D,a8 as V,M,Q as O,R as A,V as $,J as H,aw as R}from"./@vue-BQofRocO.js";import{_ as W}from"./plugin-vueexport-helper-DlAUqK2U.js";import"./element-plus-CijDGmYU.js";import"./lodash-es-CiJSjksT.js";import"./@vueuse-BHo4bikI.js";import"./@element-plus-DLLdXfoS.js";import"./@popperjs-D9SI2xQl.js";import"./@ctrl-r5W6hzzQ.js";import"./dayjs-Ct2Knyoi.js";import"./async-validator-DKvM95Vc.js";import"./memoize-one-BdPwpGay.js";import"./normalize-wheel-es-B6fDCfyv.js";import"./@floating-ui-B55MhO6l.js";const z=(e,s,n)=>{const d=e[s];return d?typeof d=="function"?d():Promise.resolve(d):new Promise((r,p)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(p.bind(null,new Error("Unknown variable dynamic import: "+s+(s.split("/").length!==n?". Note that variables only represent file names one level deep.":""))))})},F=["id"],U=["id"],j={class:"dragTitle"},K={class:"btn-group"},X=["id"],Y=["value"],q=["id"],J=["src"],Q={__name:"Window",props:{appName:{type:String,default:"未定义"},w:{type:String,default:"800px"},h:{type:String,default:"600px"},title:{type:String,default:"未定义"},url:{type:String,default:""},vuePath:{type:String,default:null},active_app_list:{type:Array,default:null},set_active_winodw:{type:Function},mix_app:{type:Function},close_app:{type:Function}},setup(e){I(t=>({"9f3762dc":d.left,"262ad52c":d.top}));const s=m(!1),n=e,d={left:n.active_app_list.indexOf(n.appName)*20,top:n.active_app_list.indexOf(n.appName)*20},r=m({left:"",top:""}),p=L(),w=()=>{p.value=R(()=>z(Object.assign({"./winapp/jz_nav.vue":()=>b(()=>import("./jz_nav-DcBjpCRJ.js"),__vite__mapDeps([0,1,2,3,4])),"./winapp/jz_set.vue":()=>b(()=>import("./jz_set-71-O-FgD.js"),__vite__mapDeps([5,1,2]))}),`./winapp/${n.vuePath}.vue`,3))},g=()=>{const t=document.getElementById(n.appName+"Window");s.value?(t.style.left=r.value.left,t.style.top=r.value.top,s.value=!1,u.value=!0):(r.value.left=t.style.left,r.value.top=t.style.top,t.style.left="0",t.style.top="0",s.value=!0,u.value=!1)},v=m(""),x=()=>{const t=`https://www.baidu.com/s?wd=${encodeURIComponent(v.value)}`;window.open(t,"_blank")},u=m(!0);return P(()=>{var h;const t=document.getElementById(n.appName+"Window"),o=document.getElementById(n.appName+"Header");let c,l;o.addEventListener("mousedown",i=>{u.value&&(c=i.pageX-t.offsetLeft,l=i.pageY-t.offsetTop,document.addEventListener("mousemove",f))}),t.addEventListener("mousedown",i=>{i.altKey&&u.value&&(c=i.pageX-t.offsetLeft,l=i.pageY-t.offsetTop,document.addEventListener("mousemove",f))}),o.addEventListener("dblclick",i=>{u.value=!1,g()}),document.addEventListener("mouseup",()=>{document.removeEventListener("mousemove",f)});const f=i=>{t.style.left=`${i.pageX-c}px`,t.style.top=`${i.pageY-l}px`};w(),(h=document.getElementById(n.appName+"Window"))==null||h.focus()}),(t,o)=>{const c=S("el-button");return y(),E("div",{id:e.appName+"Window",class:N(["dragAssembly shadow-window",{max:s.value,activate:e.active_app_list[e.active_app_list.length-1]==e.appName}]),tabindex:"-1",style:H({width:e.w,height:e.h,zIndex:e.active_app_list.indexOf(e.appName)+70})},[a("div",{id:e.appName+"Header",class:N(["dragHeader",{activate:e.active_app_list[e.active_app_list.length-1]==e.appName}])},[a("span",j,[a("b",null,T(e.title),1)]),a("div",K,[a("div",{class:"el-icon-close shadow-btn",onClick:o[0]||(o[0]=l=>e.mix_app(e.appName))},"🗕"),a("div",{class:"el-icon-close shadow-btn",onClick:g,style:{"margin-left":"3px"}},"🗖"),a("div",{class:"el-icon-close shadow-btn",onClick:o[1]||(o[1]=l=>e.close_app(e.appName))},"✕")])],10,U),a("div",{id:e.appName+"Header2",class:"dragHeader2"},[a("input",{class:"url",readonly:"",value:"🖥︎ ▾ 计算机 ▾ 应用 ▾ "+e.vuePath},null,8,Y),k(c,{class:"btn",onClick:w,style:{"margin-left":"-23px",background:"linear-gradient(#90CDA4, #229832, #90CDA4)",border:"1px solid #B0E2BE"}},{default:B(()=>[C(" ♻︎ ")]),_:1}),_(a("input",{class:"search shadow-window-1","onUpdate:modelValue":o[2]||(o[2]=l=>v.value=l),onKeyup:V(x,["enter"])},null,544),[[D,v.value]]),k(c,{class:"btn",onClick:x,style:{margin:"0 1px",background:"linear-gradient(#AEB5E4, #2650AC, #AEB5E4)",border:"1px solid #CBD1FA"}},{default:B(()=>[C(" 🔍︎ ")]),_:1})],8,X),a("div",{id:e.appName+"dragBody",class:"dragBody"},[e.url==""?(y(),M(O(p.value),{key:0})):A("",!0),e.url!=""?(y(),E("iframe",{key:1,src:e.url,style:{width:"100%",height:"100%"},frameborder:"0"},null,8,J)):A("",!0)],8,q),_(a("div",{class:"unactivate",onMousedown:o[3]||(o[3]=l=>e.set_active_winodw(e.appName))},null,544),[[$,e.active_app_list[e.active_app_list.length-1]!=e.appName]])],14,F)}}},pe=W(Q,[["__scopeId","data-v-e59b8d5b"]]);export{pe as default};