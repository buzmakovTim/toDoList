(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{104:function(t,e,n){},105:function(t,e,n){},130:function(t,e,n){"use strict";n.r(e);var i,c,a=n(0),o=n.n(a),s=n(10),r=n.n(s),d=(n(104),function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,186)).then((function(e){var n=e.getCLS,i=e.getFID,c=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),i(t),c(t),a(t),o(t)}))}),l=n(42),u=(n(105),n(175)),j=n(176),b=n(166),f=n(132),O=n(171),h=n(177),p=n(13),m=n(178),g=n(8),T=n(79),x=n.n(T).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"cb837fe2-1523-4fe4-be8e-89a2fb123dce"}});!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(i||(i={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(c||(c={}));var v,I=function(){return x.get("todo-lists")},S=function(t){return x.post("todo-lists",{title:t})},k=function(t){return x.delete("todo-lists/".concat(t))},y=function(t,e){return x.put("todo-lists/".concat(t),{title:e})},C=function(t){return x.get("todo-lists/".concat(t,"/tasks"))},E=function(t,e){return x.delete("todo-lists/".concat(t,"/tasks/").concat(e))},L=function(t,e){return x.post("todo-lists/".concat(t,"/tasks"),{title:e})},A=function(t,e,n){return x.put("todo-lists/".concat(t,"/tasks/").concat(e),n)},D=function(t){return x.post("auth/login",t)},_=function(){return x.get("auth/me")},w=function(){return x.delete("auth/login")},N=function(t,e){t(B(e))},P=function(t,e){if(e.messages.length){var n=e.messages[0];t(B(n))}else t(B("Some error occurred"));t(z("failed"))},R=n(39),F=[],G=function(t,e){return{type:"CHANGE-TODOLIST-TITLE",id:t,title:e}},M=function(t,e){return{type:"CHANGE-TODOLIST-FILTER",id:t,filter:e}};!function(t){t[t.success=0]="success",t[t.error=1]="error",t[t.captcha=10]="captcha"}(v||(v={}));var H={isLoggedIn:!1},K=function(t){return{type:"login/SET-IS-LOGGED-IN",value:t}},U={status:"idle",error:null,isInitialized:!1},z=function(t){return{type:"APP/SET-STATUS",status:t}},B=function(t){return{type:"APP/ERROR-RESET",error:t}},V=function(t){return{type:"APP/IS-INITIALIZED",isInitialized:t}},Z=function(){return function(t){console.log("App initializing!"),t(z("loading")),_().then((function(e){e.data.resultCode===v.success?(t(K(!0)),t(V(!0)),t(z("succeeded"))):t(z("failed"))})).catch((function(e){N(t,e.message)})).finally((function(){t(V(!0))}))}},q=n(183),Y=n(180),J=n(2);function Q(t){return Object(J.jsx)(Y.a,Object(g.a)({elevation:6,variant:"filled"},t))}function X(){var t=Object(p.c)((function(t){return t.app.error})),e=Object(p.b)(),n=function(t,n){"clickaway"!==n&&e(B(null))};return Object(J.jsx)(q.a,{open:null!=t,autoHideDuration:6e3,onClose:n,children:Object(J.jsx)(Q,{onClose:n,severity:"error",children:t})})}var $,W=n(14),tt=n(167),et=n(185),nt=n(168),it=n(169),ct=n(179),at=n(170),ot=n(181),st=n(89),rt=function(){var t=Object(p.b)(),e=Object(p.c)((function(t){return t.auth.isLoggedIn})),n=Object(st.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<4&&(e.password="Password to short"):e.password="Required",e},onSubmit:function(e){var i;t((i=e,function(t){t(z("loading")),D(i).then((function(e){e.data.resultCode===v.success?(t(K(!0)),t(z("succeeded"))):P(t,e.data)})).catch((function(e){N(t,e.message)}))})),n.resetForm()}});return e?Object(J.jsx)(W.a,{to:"/"}):Object(J.jsx)(tt.a,{container:!0,justify:"center",children:Object(J.jsx)(tt.a,{item:!0,xs:4,children:Object(J.jsxs)(et.a,{children:[Object(J.jsxs)(nt.a,{children:[Object(J.jsxs)("p",{children:["To log in get registered",Object(J.jsx)("a",{style:{textDecoration:"none"},href:"https://social-network.samuraijs.com/",target:"_blank",children:" here"})]}),Object(J.jsx)("p",{children:"or use common test account credentials:"}),Object(J.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(J.jsx)("p",{children:"Password: free"})]}),Object(J.jsx)("form",{onSubmit:n.handleSubmit,children:Object(J.jsxs)(it.a,{children:[Object(J.jsx)(ct.a,Object(g.a)({label:"Email",margin:"normal"},n.getFieldProps("email"))),n.touched.email&&n.errors.email&&Object(J.jsx)("div",{style:{color:"red"},children:n.errors.email}),Object(J.jsx)(ct.a,Object(g.a)({type:"password",label:"Password",margin:"normal"},n.getFieldProps("password"))),n.touched.password&&n.errors.password&&Object(J.jsx)("div",{style:{color:"red"},children:n.errors.password}),Object(J.jsx)(at.a,{label:"Remember me",control:Object(J.jsx)(ot.a,Object(g.a)({},n.getFieldProps("rememberMe")))}),Object(J.jsx)(O.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})})]})})})},dt=n(131),lt=n(40),ut=n(172),jt=n(85),bt=n.n(jt),ft=o.a.memo((function(t){console.log("AddItemForm has called");var e=Object(a.useState)(""),n=Object(lt.a)(e,2),i=n[0],c=n[1],o=Object(a.useState)(!1),s=Object(lt.a)(o,2),r=s[0],d=s[1],l=function(){""!==i.trim()?(t.addItem(i.trim()),c("")):d(!0)};return Object(J.jsxs)("div",{className:bt.a.itemForm,children:[Object(J.jsx)(ct.a,{disabled:t.disable,size:"small",variant:"outlined",error:r,value:i,onChange:function(t){return c(t.currentTarget.value)},onKeyPress:function(t){!1!==r&&d(!1),"Enter"===t.key&&l()},label:"Title",helperText:r&&"Title is required!",onBlur:function(){return d(!1)}}),Object(J.jsx)(b.a,{disabled:t.disable,onClick:l,style:{width:"5px"},color:"primary",children:Object(J.jsx)(ut.a,{style:{marginLeft:"25px"}})})]})})),Ot=n(86),ht=n.n(Ot),pt=o.a.memo((function(t){console.log("Editable Span");var e=Object(a.useState)(!1),n=Object(lt.a)(e,2),i=n[0],c=n[1],o=Object(a.useState)(""),s=Object(lt.a)(o,2),r=s[0],d=s[1];return i?Object(J.jsx)("input",{value:r,onChange:function(t){return d(t.currentTarget.value)},onBlur:function(){c(!1),t.onChangeTitle(r)},autoFocus:!0}):Object(J.jsx)("span",{onDoubleClick:function(){d(t.title),c(!0)},children:t.title})})),mt=n(173),gt={};!function(t){t[t.success=0]="success",t[t.error=1]="error",t[t.captcha=10]="captcha"}($||($={}));var Tt=function(t,e){return function(n){n(z("loading")),L(t,e).then((function(t){if(t.data.resultCode===$.success){var e=t.data.data.item;n(function(t){return{type:"ADD-TASK",task:t}}(e)),n(z("succeeded"))}else t.data.messages.length?n(B(t.data.messages[0])):n(B("Some error occurred")),n(z("failed"))}))}},xt=n(87),vt=n.n(xt),It=o.a.memo((function(t){var e=Object(p.b)(),n=Object(a.useCallback)((function(n){var i,c,a;e((i=t.todolistId,c=t.task.id,a=n,function(t,e){t(z("loading"));var n=e().tasks[i].find((function(t){return t.id===c}));if(n){var o={title:a,status:n.status,description:n.description,startDate:n.startDate,priority:n.priority,deadline:n.deadline};A(i,c,o).then((function(e){t(function(t,e,n){return{type:"CHANGE-TASK-TITLE",taskId:t,title:e,todolistId:n}}(c,a,i)),t(z("succeeded"))}))}}))}),[]),c=Object(a.useCallback)((function(n){var c,a,o,s=n.currentTarget.checked;e((c=t.todolistId,a=t.task.id,o=s?i.Completed:i.New,function(t,e){t(z("loading"));var n=e().tasks[c].find((function(t){return t.id===a}));if(n){var i={title:n.title,status:o,description:n.description,startDate:n.startDate,priority:n.priority,deadline:n.deadline};A(c,a,i).then((function(e){t(function(t,e,n){return{type:"CHANGE-TASK-STATUS",taskId:t,status:e,todolistId:n}}(a,o,c)),t(z("failed"))}))}}))}),[t.task.id,t.todolistId]);return Object(J.jsx)("div",{className:t.task.status===i.Completed?"isDone":"",children:Object(J.jsxs)("div",{className:vt.a.taskLine,children:[Object(J.jsxs)("div",{children:[Object(J.jsx)(ot.a,{color:"primary",checked:t.task.status===i.Completed,onChange:c}),Object(J.jsx)(pt,{title:t.task.title,onChangeTitle:n})]}),Object(J.jsx)("div",{children:Object(J.jsx)(b.a,{onClick:function(){var n,i;e((n=t.todolistId,i=t.task.id,function(t){t(z("loading")),E(n,i).then((function(e){e.data.resultCode===$.success&&(t(function(t,e){return{type:"REMOVE-TASK",todolistId:e,taskId:t}}(i,n)),t(z("succeeded")))}))}))},children:Object(J.jsx)(mt.a,{})})})]})},t.task.id)})),St=o.a.memo((function(t){var e=Object(p.c)((function(e){return e.tasks[t.todolistId]})),n=Object(p.b)();Object(a.useEffect)((function(){var e;n((e=t.todolistId,function(t){console.log("Fetching task!!! for: "+e),t(z("loading")),C(e).then((function(n){t(function(t,e){return{type:"SET-TUSKS",todoId:t,tasks:e}}(e,n.data.items)),t(z("succeeded"))}))}))}),[n]);var c=Object(a.useCallback)((function(){n(M(t.todolistId,"all"))}),[M,t.todolistId]),o=Object(a.useCallback)((function(){n(M(t.todolistId,"active"))}),[M,t.todolistId]),s=Object(a.useCallback)((function(){n(M(t.todolistId,"completed"))}),[M,t.todolistId]),r=Object(a.useCallback)((function(){t.removeTodoList(t.todolistId)}),[t.removeTodoList,t.todolistId]),d=Object(a.useCallback)((function(e){var i,c;n((i=t.todolistId,c=e,function(t){t(z("loading")),y(i,c).then((function(e){e.data.resultCode===v.success?(t(G(i,c)),t(z("succeeded"))):P(t,e.data)})).catch((function(e){N(t,e.message)}))}))}),[G,t.todolistId]),l=Object(a.useCallback)((function(e){n(Tt(t.todolistId,e))}),[t.todolistId,Tt]),u=e;return"completed"===t.filter&&(u=e.filter((function(t){return t.status===i.Completed}))),"active"===t.filter&&(u=e.filter((function(t){return t.status===i.New}))),Object(J.jsxs)("div",{children:[Object(J.jsxs)("div",{className:ht.a.titleDiv,children:[Object(J.jsx)(pt,{title:t.title,onChangeTitle:d}),Object(J.jsx)(b.a,{onClick:r,disabled:"loading"===t.entityStatus,children:Object(J.jsx)(mt.a,{})})]}),Object(J.jsx)(ft,{addItem:l,disable:"loading"===t.entityStatus}),Object(J.jsx)("div",{children:u.map((function(e){return Object(J.jsx)(It,{task:e,todolistId:t.todolistId},e.id)}))}),Object(J.jsxs)("div",{children:[Object(J.jsx)(O.a,{size:"small",style:{margin:"5px"},variant:"all"===t.filter?"contained":"outlined",color:"primary",onClick:c,children:"All"}),Object(J.jsx)(O.a,{size:"small",style:{margin:"5px"},color:"primary",variant:"active"===t.filter?"contained":"outlined",onClick:o,children:"Active"}),Object(J.jsx)(O.a,{size:"small",style:{margin:"5px",width:"100px"},color:"primary",variant:"completed"===t.filter?"contained":"outlined",onClick:s,children:"Completed"})]})]})}));var kt=function(){var t=Object(p.b)(),e=Object(p.c)((function(t){return t.todolist})),n=Object(p.c)((function(t){return t.auth.isLoggedIn}));Object(a.useEffect)((function(){t(Z()),t((function(t,e){console.log("Fetching todos"),t(z("loading")),I().then((function(e){t({type:"SET-TODOLISTS",todolists:e.data}),t(z("succeeded"))})).catch((function(e){N(t,e.message)}))}))}),[]);var i=Object(a.useCallback)((function(e,n){t(G(e,n))}),[t]),c=Object(a.useCallback)((function(e){var n;t((n=e,function(t){t(z("loading")),t({type:"CHANGE-ENTITY-STATUS",todolistId:n,entityStatus:"loading"}),k(n).then((function(e){e.data.resultCode===v.success?(t({type:"REMOVE-TODOLIST",id:n}),t(z("succeeded"))):P(t,e.data)})).catch((function(e){N(t,e.message)}))}))}),[t]),o=Object(a.useCallback)((function(e){t(function(t){return function(e){e(z("loading")),S(t).then((function(t){if(t.data.resultCode===v.success){var n=t.data.data.item;e({type:"ADD-TODOLIST",todolist:n}),e(z("succeeded"))}else P(e,t.data)})).catch((function(t){N(e,t.message)}))}}(e))}),[t]);return n?Object(J.jsxs)(J.Fragment,{children:[Object(J.jsx)(tt.a,{container:!0,style:{padding:"20px"},children:Object(J.jsx)(ft,{addItem:o,disable:!1})}),Object(J.jsx)(tt.a,{container:!0,spacing:3,style:{padding:"20px"},children:e.map((function(t){return Object(J.jsx)(tt.a,{item:!0,children:Object(J.jsx)(dt.a,{elevation:5,style:{padding:"20px"},children:Object(J.jsx)(St,{todolistId:t.id,title:t.title,filter:t.filter,removeTodoList:c,changeTodoListTitle:i,entityStatus:t.entityStatus})})},t.id)}))}),Object(J.jsx)(X,{})]}):Object(J.jsx)(W.a,{to:"/login"})},yt=n(174);var Ct=function(){var t=Object(p.b)(),e=Object(p.c)((function(t){return t.app.status})),n=Object(p.c)((function(t){return t.auth.isLoggedIn})),i=Object(p.c)((function(t){return t.app.isInitialized})),c=Object(a.useCallback)((function(){t((function(t){t(z("loading")),w().then((function(e){e.data.resultCode===v.success?(t(K(!1)),t(z("succeeded"))):P(t,e.data)})).catch((function(e){N(t,e.message)}))}))}),[t]);return Object(a.useEffect)((function(){t(Z())}),[]),i?Object(J.jsxs)("div",{className:"App",children:[Object(J.jsxs)(u.a,{position:"static",children:[Object(J.jsxs)(j.a,{style:{justifyContent:"space-between"},children:[Object(J.jsx)(b.a,{color:"inherit",children:Object(J.jsx)(h.a,{})}),Object(J.jsx)(f.a,{variant:"h6",children:"TodoLists"}),n&&Object(J.jsx)(O.a,{variant:"outlined",color:"inherit",onClick:c,children:"LOGOUT"})]}),"loading"===e&&Object(J.jsx)(m.a,{})]}),Object(J.jsxs)(W.d,{children:[Object(J.jsx)(W.b,{exact:!0,path:"/",render:function(){return Object(J.jsx)(kt,{})}}),Object(J.jsx)(W.b,{path:"/login",render:function(){return Object(J.jsx)(rt,{})}}),Object(J.jsx)(W.b,{path:"/404",render:function(){return Object(J.jsx)("h1",{style:{textAlign:"center",fontSize:"40px"},children:" 404 page not found"})}}),Object(J.jsx)(W.a,{from:"*",to:"/404"})]}),Object(J.jsx)(X,{})]}):Object(J.jsx)("div",{style:{position:"fixed",top:"49%",left:"49%"},children:Object(J.jsx)(yt.a,{})})},Et=n(57),Lt=n(88),At=Object(Et.b)({todolist:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(g.a)(Object(g.a)({},t),{},{filter:"all",entityStatus:"idle"})}));case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!=e.id}));case"ADD-TODOLIST":return[Object(g.a)(Object(g.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(R.a)(t));case"CHANGE-TODOLIST-TITLE":var n=t.find((function(t){return t.id===e.id}));return n&&(n.title=e.title),Object(R.a)(t);case"CHANGE-TODOLIST-FILTER":var i=t.find((function(t){return t.id===e.id}));return i&&(i.filter=e.filter),Object(R.a)(t);case"CHANGE-ENTITY-STATUS":return t.map((function(t){return t.id===e.todolistId?Object(g.a)(Object(g.a)({},t),{},{filter:"all",entityStatus:e.entityStatus}):t}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:gt,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TODOLISTS":var n=Object(g.a)({},t);return e.todolists.forEach((function(t){n[t.id]=[]})),n;case"SET-TUSKS":var i=Object(g.a)({},t);return i[e.todoId]=e.tasks,i;case"REMOVE-TASK":var c=Object(g.a)({},t),a=t[e.todolistId],o=a.filter((function(t){return t.id!==e.taskId}));return c[e.todolistId]=o,c;case"ADD-TASK":var s=Object(g.a)({},t),r=s[e.task.todoListId],d=[e.task].concat(Object(R.a)(r));return s[e.task.todoListId]=d,s;case"CHANGE-TASK-STATUS":var l=Object(g.a)({},t),u=l[e.todolistId];return l[e.todolistId]=u.map((function(t){return t.id===e.taskId?Object(g.a)(Object(g.a)({},t),{},{status:e.status}):t})),l;case"CHANGE-TASK-TITLE":var j=Object(g.a)({},t),b=j[e.todolistId];return j[e.todolistId]=b.map((function(t){return t.id===e.taskId?Object(g.a)(Object(g.a)({},t),{},{title:e.title}):t})),j;case"ADD-TODOLIST":var f=Object(g.a)({},t);return f[e.todolist.id]=[],f;case"REMOVE-TODOLIST":var O=Object(g.a)({},t);return delete O[e.id],O;default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":return Object(g.a)(Object(g.a)({},t),{},{status:e.status});case"APP/ERROR-RESET":return Object(g.a)(Object(g.a)({},t),{},{error:e.error});case"APP/IS-INITIALIZED":return Object(g.a)(Object(g.a)({},t),{},{isInitialized:e.isInitialized});default:return t}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:H,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(g.a)(Object(g.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),Dt=Object(Et.c)(At,Object(Et.a)(Lt.a));window.store=Dt,r.a.render(Object(J.jsxs)(l.a,{children:[Object(J.jsx)(o.a.StrictMode,{children:Object(J.jsx)(p.a,{store:Dt,children:Object(J.jsx)(Ct,{})})}),","]}),document.getElementById("root")),d()},85:function(t,e,n){t.exports={itemForm:"AddItemForm_itemForm__iA_oL"}},86:function(t,e,n){t.exports={taskInput:"Todolist_taskInput__1juvQ",todolistContainer:"Todolist_todolistContainer__x3M-K",title:"Todolist_title__G_6nD",titleDiv:"Todolist_titleDiv__2_8tm",addTaskButton:"Todolist_addTaskButton__3GCnp",ListDeleteButton:"Todolist_ListDeleteButton__1Dpdk",buttonRemoveTask:"Todolist_buttonRemoveTask__16_x7",error:"Todolist_error__2E9a0",errorMessage:"Todolist_errorMessage__2F5Xe"}},87:function(t,e,n){t.exports={taskLine:"Task_taskLine__MG8R8"}}},[[130,1,2]]]);
//# sourceMappingURL=main.8653beee.chunk.js.map