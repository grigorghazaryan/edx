(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{"6f7f":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-pa-sm"},[a("div",{staticClass:"q-pa-md q-gutter-sm"},[a("q-breadcrumbs",[a("q-breadcrumbs-el",{attrs:{icon:"dashboard",label:"Dashboard",to:"/"}}),a("q-breadcrumbs-el",{attrs:{label:"Allocations"}}),a("q-breadcrumbs-el",{attrs:{label:"Title 3"}})],1)],1),a("q-card",{staticClass:"bg-transparent no-shadow no-border"},[a("q-card-section",{staticClass:"q-pa-none"},[a("div",{staticClass:"row q-col-gutter-sm "},[a("div",{staticClass:"col-md-2 col-sm-12 col-xs-12"},[a("q-item",{staticClass:"q-pa-none q-ml-xs",staticStyle:{"background-color":"#fff"}},[a("q-item-section",{staticClass:" q-pa-lg q-mr-none text-white",staticStyle:{"background-color":"#fff"},attrs:{side:""}},[a("q-icon",{attrs:{name:"local_atm",color:"green",size:"24px"}})],1),a("q-item-section",{staticClass:"q-ml-none"},[a("q-item-label",{staticClass:"text-grey-7"},[t._v("Total")]),a("q-item-label",{staticClass:"text-dark text-h6 text-weight-bolder"},[t._v("$ "+t._s(t.total))])],1)],1)],1),a("div",{staticClass:"col-md-2 col-sm-12 col-xs-12"},[a("q-item",{staticClass:"q-pa-none q-ml-xs",staticStyle:{"background-color":"#fff"}},[a("q-item-section",{staticClass:" q-pa-lg q-mr-none text-white",staticStyle:{"background-color":"#fff"},attrs:{side:""}},[a("q-icon",{attrs:{name:"search",color:"pink",size:"24px"}})],1),a("q-item-section",{staticClass:"q-ml-none"},[a("q-item-label",{staticClass:"text-grey-7"},[t._v("Ratio (+/-)")]),a("q-item-label",{staticClass:"text-dark text-h6 text-weight-bolder"},[t._v("% 0.00")])],1)],1)],1)])])],1),a("div",{staticClass:"q-pa-sm q-mt-sm q-gutter-sm"},[a("q-table",{attrs:{title:"Title 3",data:t.data,columns:t.columns,filter:t.filter,"row-key":"name",loading:t.loading,"binary-state-sort":""},scopedSlots:t._u([{key:"loading",fn:function(){return[a("q-inner-loading",{attrs:{showing:"",color:"primary"}})]},proxy:!0},{key:"top-right",fn:function(e){return[a("q-input",{staticClass:"q-mr-md",attrs:{outlines:"",dense:"",placeholder:"Search"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}],null,!0),model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),a("q-select",{staticClass:"q-mr-md",staticStyle:{"min-width":"200px","max-width":"200px"},attrs:{dense:"",outlines:"",clearable:"",options:t.options,label:"Allocation"},on:{input:t.filterAllocation},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),a("q-btn",{staticClass:"q-mr-md",staticStyle:{"background-color":"#546bfa"},attrs:{square:"","text-color":"white",icon:"add","no-caps":""},on:{click:function(e){t.show_dialog=!0}}},[t._v("Add")]),a("q-btn",{attrs:{"icon-right":"archive",label:"Export to Excel",color:"teal","text-color":"white","no-caps":""},on:{click:t.exportTable}}),"list"===t.mode?a("q-btn",{staticClass:"q-px-sm",attrs:{flat:"",round:"",dense:"",icon:e.inFullscreen?"fullscreen_exit":"fullscreen"},on:{click:e.toggleFullscreen}},[a("q-tooltip",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{disable:t.$q.platform.is.mobile}},[t._v(t._s(e.inFullscreen?"Exit Fullscreen":"Toggle Fullscreen")+"\n          ")])],1):t._e(),a("div",{staticClass:"q-pa-sm q-gutter-sm"},[a("q-dialog",{model:{value:t.show_dialog,callback:function(e){t.show_dialog=e},expression:"show_dialog"}},[a("q-card",[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Create")])]),a("q-card-section",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-6 col-xs-12 q-mb-sm q-pr-sm"},[a("q-select",{attrs:{outlined:"",options:t.schools,label:"Choose a school"},model:{value:t.editedItem.school,callback:function(e){t.$set(t.editedItem,"school",e)},expression:"editedItem.school"}})],1),a("div",{staticClass:"col-md-6"},[a("q-input",{attrs:{outlined:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{mask:"YYYY-MM-DD"},model:{value:t.editedItem.date,callback:function(e){t.$set(t.editedItem,"date",e)},expression:"editedItem.date"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}],null,!0),model:{value:t.editedItem.date,callback:function(e){t.$set(t.editedItem,"date",e)},expression:"editedItem.date"}})],1),a("div",{staticClass:"col-md-6 q-pr-sm"},[a("q-input",{attrs:{disable:t.editedItem.status,outlined:"",label:"Preliminary Allocations"},model:{value:t.editedItem.allocation,callback:function(e){t.$set(t.editedItem,"allocation",e)},expression:"editedItem.allocation"}})],1),a("div",{staticClass:"col-md-6"},[a("q-input",{attrs:{disable:!t.editedItem.status,outlined:"",label:"Final Allocations"},model:{value:t.editedItem.finalAllocation,callback:function(e){t.$set(t.editedItem,"finalAllocation",e)},expression:"editedItem.finalAllocation"}})],1),a("div",{staticClass:"col-md-12 q-mt-md q-mb-md"},[a("div",{staticClass:"q-gutter-sm text-right"},[a("q-checkbox",{attrs:{label:"Allocation is Final"},model:{value:t.editedItem.status,callback:function(e){t.$set(t.editedItem,"status",e)},expression:"editedItem.status"}})],1)]),a("div",{staticClass:"col-md-12"},[a("q-input",{attrs:{type:"textarea",outlined:"",label:"Notes"},model:{value:t.editedItem.notes,callback:function(e){t.$set(t.editedItem,"notes",e)},expression:"editedItem.notes"}})],1),a("q-chip",{staticClass:"q-mt-md",attrs:{outline:"",square:"",color:"blue","text-color":"white"}},[t._v("\n                    Previous Year Allocations: $ "+t._s(t.editedItem.previousYear)+"\n                  ")])],1)]),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Confirm",color:"primary"},on:{click:t.addRow}})],1)],1)],1),a("q-dialog",{attrs:{persistent:""},model:{value:t.confirm,callback:function(e){t.confirm=e},expression:"confirm"}},[a("q-card",[a("q-card-section",{staticClass:"row items-center"},[a("span",{staticClass:"q-ml-sm"},[t._v("Are you sure to delete this item?")])]),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"No, thanks",color:"primary"}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Yes",color:"red"},on:{click:t.deleteItem}})],1)],1)],1)],1)]}},{key:"body",fn:function(e){return[a("q-tr",{attrs:{props:e}},[a("q-td",{key:"date",attrs:{props:e}},[t._v("\n              "+t._s(e.row.date)+"\n            ")]),a("q-td",{key:"school",attrs:{props:e}},[a("div",{staticClass:"text-pre-wrap"},[t._v(t._s(e.row.school))])]),a("q-td",{key:"allocation",attrs:{props:e}},[e.row.status?a("div",[t._v("$ "+t._s(e.row.finalAllocation)+" ")]):a("div",[t._v(" $ "+t._s(e.row.allocation)+" ")])]),a("q-td",{key:"previousYear",attrs:{props:e}},[t._v("\n              $ "+t._s(e.row.previousYear)+"\n            ")]),a("q-td",{key:"difference",attrs:{props:e}},[a("div",{style:{color:e.row.difference<0?"red":"green"}},[t._v("\n                "+t._s(e.row.difference)+"\n              ")])]),a("q-td",{key:"status",attrs:{props:e}},[1!=e.row.status?a("q-chip",{attrs:{square:"",color:"orange","text-color":"white"}},[t._v("\n                Preliminary\n              ")]):a("q-chip",{staticClass:"glossy",attrs:{square:"",color:"teal","text-color":"white"}},[t._v("\n                Final\n              ")])],1),a("q-td",{key:"actions",attrs:{props:e}},[a("q-btn",{staticClass:"q-mr-sm",attrs:{icon:"edit",color:"blue",size:"sm","no-caps":""},on:{click:function(a){return t.editItem(e.row)}}}),a("q-btn",{attrs:{icon:"delete_forever",color:"red",size:"sm","no-caps":""},on:{click:function(a){return t.openDeleteModal(e.row)}}})],1)],1)]}},{key:"bottom",fn:function(){return[a("div",{staticClass:"q-pa-md flex flex-center"},[a("q-pagination",{attrs:{max:t.pages,"max-pages":5,ellipsess:"","direction-links":!0},on:{input:t.changePagination},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}})],1)]},proxy:!0}])})],1)],1)},o=[],i=(a("7f7f"),a("f751"),a("28a5"),a("b178"));function l(t,e){var a=void 0!==e?e(t):t;return a=void 0===a||null===a?"":String(a),a=a.split('"').join('""'),'"'.concat(a,'"')}var n={data:function(){return{confirm:!1,loading:!1,pages:3,currentPage:1,pagination:{sortBy:"name",page:1,rowsPerPage:5},model:null,options:["Preliminary","Final"],filter:"",mode:"list",isFinal:!1,show_dialog:!1,editedIndex:-1,editedItem:{date:"",school:"",previousYear:"",difference:"",status:!1,notes:""},defaultItem:{date:"",school:"",previousYear:"",difference:"",status:!1,notes:""},columns:[{name:"date",align:"left",label:"Date",field:"date",sortable:!0},{name:"school",align:"left",label:"School",field:"school",sortable:!0},{name:"allocation",align:"left",label:"Allocation",field:"allocation",sortable:!0},{name:"previousYear",align:"left",label:"Previous Year",field:"previousYear",sortable:!0},{name:"difference",align:"left",label:"Difference",field:"difference",sortable:!0},{name:"status",align:"left",label:"Status",field:"status",sortable:!0},{name:"actions",align:"left",label:"Actions",field:"actions"}],data:[],tempData:[],schools:[]}},methods:{addRow:function(){var t,e,a=this.editedIndex>-1?this.editedItem.previousYear:Math.floor(100*Math.random()),s=t-a;this.editedItem.status?(e=this.editedItem.finalAllocation,s=e-a):(t=this.editedItem.allocation,s=t-a);var o={date:this.editedItem.date,school:this.editedItem.school,allocation:t,finalAllocation:e,previousYear:a,difference:s,status:this.editedItem.status,notes:this.editedItem.notes};this.editedIndex>-1?Object.assign(this.data[this.editedIndex],o):this.data.unshift(o),this.close()},openDeleteModal:function(t){this.confirm=!0,this.item=t},deleteItem:function(){var t=this.item,e=this.data.indexOf(t);this.data.splice(e,1)},editItem:function(t){this.editedIndex=this.data.indexOf(t),this.editedItem=Object.assign({},t),this.show_dialog=!0},close:function(){var t=this;this.show_dialog=!1,setTimeout((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}),300)},exportTable:function(){var t=this,e=[this.columns.map((function(t){return l(t.label)}))].concat(this.data.map((function(e){return t.columns.map((function(t){return l("function"===typeof t.field?t.field(e):e[void 0===t.field?t.name:t.field],t.format)})).join(",")}))).join("\r\n"),a=Object(i["d"])("table-export.csv",e,"text/csv");!0!==a&&this.$q.notify({message:"Browser denied file download...",color:"negative",icon:"warning"})},changePagination:function(t){var e=this;this.currentPage=t,this.loading=!0,this.pagination.page=t,setTimeout((function(){e.loading=!1;for(var t=[],a=0;a<5;a++){var s=Math.floor(10*Math.random());s=!!(s%2);var o=Math.floor(100*Math.random()),i=void 0,l=void 0,n=i-o;s?(l=Math.floor(100*Math.random()),n=l-o):(i=Math.floor(100*Math.random()),n=i-o);var r={date:"2020-09-1"+a+1,school:"American School N"+a+1,allocation:i,finalAllocation:l,previousYear:o,difference:n,status:s,notes:""};t.push(r)}e.data=t,e.tempData=t}),650)},filterAllocation:function(){this.model?"Preliminary"==this.model?this.data=this.tempData.filter((function(t){return 0==t.status})):this.data=this.tempData.filter((function(t){return 1==t.status})):this.data=this.tempData}},created:function(){for(var t=[],e=0;e<5;e++){var a=Math.floor(10*Math.random());a=!!(a%2);var s=Math.floor(100*Math.random()),o=void 0,i=void 0,l=o-s;a?(i=Math.floor(100*Math.random()),l=i-s):(o=Math.floor(100*Math.random()),l=o-s);var n={date:"2020-09-1"+e+1,school:"American School N"+e+1,allocation:o,finalAllocation:i,previousYear:s,difference:l,status:a,notes:""};t.push(n)}this.data=t,this.tempData=t;for(var r=[],c=0;c<this.data.length;c++)r.push(this.data[c].school);this.schools=r},computed:{total:function(){for(var t=0,e=0;e<this.data.length;e++){var a=void 0;a=this.data[e].status?parseFloat(this.data[e].finalAllocation):parseFloat(this.data[e].allocation),t+=a}return t.toFixed(2)}}},r=n,c=a("2877"),d=Object(c["a"])(r,s,o,!1,null,null,null);e["default"]=d.exports}}]);