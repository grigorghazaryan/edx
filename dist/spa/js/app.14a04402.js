(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{0:function(n,e,t){n.exports=t("2f39")},"17dc":function(n,e,t){},"2f39":function(n,e,t){"use strict";t.r(e);var r=t("a34a"),a=t.n(r),o=(t("a481"),t("96cf"),t("c973")),u=t.n(o),c=(t("5c7d"),t("573e"),t("7d6e"),t("e54f"),t("62f2"),t("5b0d"),t("b6d8"),t("2b0e")),i=t("1f91"),l=t("42d2"),s=t("b178");c["a"].use(s["c"],{config:{},lang:i["a"],iconSet:l["a"]});var p=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{attrs:{id:"q-app"}},[t("router-view")],1)},f=[],b={name:"App"},h=b,d=(t("5c0b"),t("2877")),m=Object(d["a"])(h,p,f,!1,null,null,null),v=m.exports,w=t("2f62");c["a"].use(w["a"]);var x=function(){var n=new w["a"].Store({modules:{},strict:!1});return n},k=t("8c4f"),y=[{path:"/",component:function(){return t.e(5).then(t.bind(null,"713b"))},children:[{path:"",component:function(){return Promise.all([t.e(0),t.e(14)]).then(t.bind(null,"ec95"))}},{path:"/Profile",component:function(){return t.e(9).then(t.bind(null,"4336"))}},{path:"/TreeTable",component:function(){return t.e(20).then(t.bind(null,"75bc"))}},{path:"/Tables",component:function(){return t.e(18).then(t.bind(null,"8c1a"))}},{path:"/Administration1",component:function(){return t.e(10).then(t.bind(null,"836d"))}},{path:"/Allocations/Title1",component:function(){return t.e(6).then(t.bind(null,"1294"))}},{path:"/Allocations/Title2",component:function(){return t.e(7).then(t.bind(null,"cceb"))}},{path:"/Allocations/Title3",component:function(){return t.e(12).then(t.bind(null,"6f7f"))}},{path:"/Allocations/Title4",component:function(){return t.e(13).then(t.bind(null,"2d8b"))}},{path:"/Allocations/esser",component:function(){return t.e(11).then(t.bind(null,"1e47"))}},{path:"/Inventory1",component:function(){return t.e(16).then(t.bind(null,"4ab6"))}},{path:"/TeacherCosts",component:function(){return t.e(19).then(t.bind(null,"7f3b"))}},{path:"/Expenses",component:function(){return t.e(15).then(t.bind(null,"a7b0"))}},{path:"/Budget",component:function(){return t.e(1).then(t.bind(null,"5b7e"))}},{path:"/Budget",component:function(){return t.e(1).then(t.bind(null,"5b7e"))}},{path:"/Reimbursement",component:function(){return t.e(17).then(t.bind(null,"58b5"))}}]},{path:"/Login-1",component:function(){return t.e(4).then(t.bind(null,"b9cd"))}}];y.push({path:"*",component:function(){return t.e(8).then(t.bind(null,"e51e"))}});var A=y;c["a"].use(k["a"]);var g=function(){var n=new k["a"]({scrollBehavior:function(){return{x:0,y:0}},routes:A,mode:"history",base:"/"});return n},T=function(){return B.apply(this,arguments)};function B(){return B=u()(a.a.mark((function n(){var e,t,r;return a.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if("function"!==typeof x){n.next=6;break}return n.next=3,x({Vue:c["a"]});case 3:n.t0=n.sent,n.next=7;break;case 6:n.t0=x;case 7:if(e=n.t0,"function"!==typeof g){n.next=14;break}return n.next=11,g({Vue:c["a"],store:e});case 11:n.t1=n.sent,n.next=15;break;case 14:n.t1=g;case 15:return t=n.t1,e.$router=t,r={router:t,store:e,render:function(n){return n(v)}},r.el="#q-app",n.abrupt("return",{app:r,store:e,router:t});case 20:case"end":return n.stop()}}),n)}))),B.apply(this,arguments)}var P=t("a925"),V={failed:"Action failed",success:"Action was successful"},$={"en-us":V};c["a"].use(P["a"]);var q=new P["a"]({locale:"en-us",fallbackLocale:"en-us",messages:$}),C=function(n){var e=n.app;e.i18n=q},E=t("bc3a"),J=t.n(E);c["a"].prototype.$axios=J.a;var L=t("1321"),S=t.n(L);c["a"].component("apexchart",S.a);var _=t("b256"),j=t("9ce1");function I(){return O.apply(this,arguments)}function O(){return O=u()(a.a.mark((function n(){var e,t,r,o,u,i,l,s,p;return a.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,T();case 2:e=n.sent,t=e.app,r=e.store,o=e.router,u=!0,i=function(n){u=!1,window.location.href=n},l=window.location.href.replace(window.location.origin,""),s=[C,void 0,void 0,_["a"],j["default"]],p=0;case 11:if(!(!0===u&&p<s.length)){n.next=29;break}if("function"===typeof s[p]){n.next=14;break}return n.abrupt("continue",26);case 14:return n.prev=14,n.next=17,s[p]({app:t,router:o,store:r,Vue:c["a"],ssrContext:null,redirect:i,urlPath:l});case 17:n.next=26;break;case 19:if(n.prev=19,n.t0=n["catch"](14),!n.t0||!n.t0.url){n.next=24;break}return window.location.href=n.t0.url,n.abrupt("return");case 24:return console.error("[Quasar] boot error:",n.t0),n.abrupt("return");case 26:p++,n.next=11;break;case 29:if(!1!==u){n.next=31;break}return n.abrupt("return");case 31:new c["a"](t);case 32:case"end":return n.stop()}}),n,null,[[14,19]])}))),O.apply(this,arguments)}I()},"5b0d":function(n,e,t){},"5c0b":function(n,e,t){"use strict";var r=t("17dc"),a=t.n(r);a.a}},[[0,3,0]]]);