(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e761f5e"],{"39ef":function(t,e,a){"use strict";var s=a("42b6"),i=a.n(s);i.a},"42b6":function(t,e,a){},"6fb5":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),a("div",{staticClass:"container text-endless"},[a("form",{staticClass:"form-signin my-5 ml-auto mr-auto border border-1",on:{submit:function(e){return e.preventDefault(),t.singIn(e)}}},[a("h1",{staticClass:"h3 mb-5 mt-2 font-weight-normal text-warning text-center"},[t._v("管理者 登入")]),a("label",{staticClass:"text-left",attrs:{for:"inputEmail"}},[t._v("Email address")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.username,expression:"user.username"}],staticClass:"form-control",attrs:{type:"email",id:"inputEmail",placeholder:"Email address",required:"",autofocus:""},domProps:{value:t.user.username},on:{input:function(e){e.target.composing||t.$set(t.user,"username",e.target.value)}}}),a("label",{staticClass:"text-left",attrs:{for:"inputPassword"}},[t._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{type:"password",id:"inputPassword",placeholder:"Password",required:""},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}}),t._m(0),a("button",{staticClass:"btn btn-warning btn-block",attrs:{type:"submit"}},[t._v("Sign in")])])]),t._m(1)],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"checkbox mb-3"},[a("label",[a("input",{attrs:{type:"checkbox",value:"remember-me"}}),t._v(" Remember me ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal fade",attrs:{id:"resignModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("尚未驗證")]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),a("div",{staticClass:"modal-body"},[t._v(" 請重新登入 ")]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("關閉")])])])])])}],r=a("5530"),n=a("2f62"),o={name:"LOGIN",data:function(){return{user:{username:"",password:""}}},methods:{singIn:function(){var t=this.user;this.$store.dispatch("loginModules/singin",t)}},computed:Object(r["a"])({},Object(n["c"])("loginModules",["isLoading"]))},l=o,d=(a("39ef"),a("2877")),u=Object(d["a"])(l,s,i,!1,null,"2b666fd7",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-0e761f5e.9312de1b.js.map