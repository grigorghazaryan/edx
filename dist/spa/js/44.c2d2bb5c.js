(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[44],{"3a1f":function(t,e,n){"use strict";n.r(e);var a,o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"q-pa-sm edx-background"},[n("div",{staticClass:"q-pa-sm q-mt-sm q-gutter-sm"},[t._m(0),n("q-table",{attrs:{data:t.data,columns:t.columns,"row-key":"id",loading:t.loading,"binary-state-sort":"",pagination:t.pagination},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"loading",fn:function(){return[n("q-inner-loading",{attrs:{showing:"",color:"primary"}})]},proxy:!0},{key:"top-right",fn:function(e){return[n("q-input",{staticClass:"q-mr-md",staticStyle:{"min-width":"250px","max-width":"250px"},attrs:{outlines:"",dense:"",placeholder:"Search"},on:{keyup:t.keyUpFilter,keydown:t.keyDownFilter},scopedSlots:t._u([{key:"append",fn:function(){return[n("q-icon",{attrs:{name:"search"}})]},proxy:!0}],null,!0),model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),"list"===t.mode?n("q-btn",{staticClass:"q-px-sm",attrs:{flat:"",round:"",dense:"",icon:e.inFullscreen?"fullscreen_exit":"fullscreen"},on:{click:e.toggleFullscreen}},[n("q-tooltip",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{disable:t.$q.platform.is.mobile}},[t._v(t._s(e.inFullscreen?"Exit Fullscreen":"Toggle Fullscreen")+"\n            ")])],1):t._e()]}},{key:"body",fn:function(e){return[n("q-tr",{attrs:{props:e}},[n("q-td",{key:"name",staticClass:"cursor-pointer",attrs:{props:e},on:{click:function(n){return t.changeRoute(e.row.id,e.row.name)}}},[t._v("\n              "+t._s(e.row.name)+" \n            ")])],1)]}},{key:"bottom",fn:function(){return[n("div",{staticClass:"q-pa-md flex flex-center"},[n("q-pagination",{attrs:{"max-pages":6,max:t.pages,"direction-links":!0,color:"edx-pagination"},on:{click:function(e){return t.changePagination(t.current)}},model:{value:t.current,callback:function(e){t.current=e},expression:"current"}}),n("div",{staticClass:"row justify-center items-center"},[n("span",{staticClass:"q-mr-md"},[t._v("Rows Per page")]),n("q-select",{attrs:{dense:"",outlined:"",options:t.rowsPerPageArr},on:{input:t.changeRowsPerPage},model:{value:t.pagination.rowsPerPage,callback:function(e){t.$set(t.pagination,"rowsPerPage",e)},expression:"pagination.rowsPerPage"}})],1)],1)]},proxy:!0}])})],1)])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"edx-header-parent"},[n("span",{staticClass:"edx-header-text"},[t._v("Schools")])])}],s=(n("7f7f"),n("bc3a")),r=n.n(s),c=n("a1bc"),l=500,u={data:function(){return{loading:!0,pagination:{rowsPerPage:10},current:1,count:10,columns:[{name:"name",align:"left",label:"Name",field:"date",sortable:!0}],data:[],rowsPerPageArr:["5","10","25","50","75","100"],mode:"list",filter:""}},methods:{schoolsParsing:function(t){for(var e=[],n=0;n<t.length;n++){var a={id:t[n].id,name:t[n].school_name};e.push(a)}return e},getSchools:function(t,e){var n=this,a={method:"GET",url:c["a"].getSchools+"?limit="+t+"&page="+e,headers:{Accept:"application/json"}};r()(a).then((function(t){n.pages=t.data.pagesCount;var e=t.data.schools,a=n.schoolsParsing(e);n.data=a,n.loading=!1}))},changeRoute:function(t,e){this.$router.push({path:"/Services/"+t,query:{name:e}})},changePagination:function(t){this.current=t,this.getSchools(this.count,this.current)},changeRowsPerPage:function(){this.count=this.pagination.rowsPerPage,this.current=1,this.getSchools(this.count,this.current)},filterSchools:function(){var t=this;this.loading=!0,console.log("send request");var e={method:"GET",url:c["a"].filterSchool+this.filter,headers:{Accept:"application/json"}};r()(e).then((function(e){t.pages=e.data.pagesCount;var n=e.data.schools,a=t.schoolsParsing(n);t.data=a,t.loading=!1})).catch((function(e){t.loading=!1}))},keyUpFilter:function(){clearTimeout(a),a=setTimeout(this.doneTyping,l)},keyDownFilter:function(){clearTimeout(a)},doneTyping:function(){(this.filter.length>1||0==this.filter.length)&&this.filterSchools()}},created:function(){this.getSchools(this.count,this.current)},computed:{routeTab:function(){if(this.$route.query.name)return"".concat(this.$route.query.name);var t=this.$route.path.substring(1);return t}}},p=u,d=n("2877"),h=Object(d["a"])(p,o,i,!1,null,null,null);e["default"]=h.exports}}]);