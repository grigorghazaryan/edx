(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"008d":function(t,e,a){"use strict";var o=a("6b45"),s=a.n(o);s.a},"6b45":function(t,e,a){},cceb:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-pa-sm"},[a("div",{staticClass:"q-pa-md q-gutter-sm"},[a("q-breadcrumbs",[a("q-breadcrumbs-el",{attrs:{icon:"dashboard",label:"Dashboard",to:"/"}}),a("q-breadcrumbs-el",{attrs:{label:"Allocations"}}),a("q-breadcrumbs-el",{attrs:{label:"Title 2"}})],1)],1),a("q-card",{staticClass:"bg-transparent no-shadow no-border"},[a("q-card-section",{staticClass:"q-pa-none"},[a("div",{staticClass:"row q-col-gutter-sm "},[a("div",{staticClass:"col-md-2 col-sm-12 col-xs-12"},[a("q-item",{staticClass:"q-pa-none q-ml-xs",staticStyle:{"background-color":"#fff"}},[a("q-item-section",{staticClass:" q-pa-lg q-mr-none text-white",staticStyle:{"background-color":"#fff"},attrs:{side:""}},[a("q-icon",{attrs:{name:"groups",color:"light-blue",size:"24px"}})],1),a("q-item-section",{staticClass:"q-ml-none"},[a("q-item-label",{staticClass:"text-grey-7"},[t._v("PD")]),a("q-item-label",{staticClass:"text-dark text-h6 text-weight-bolder"},[t._v("$ "+t._s(t.pd))])],1)],1)],1),a("div",{staticClass:"col-md-2 col-sm-12 col-xs-12"},[a("q-item",{staticClass:"q-pa-none q-ml-xs",staticStyle:{"background-color":"#fff"}},[a("q-item-section",{staticClass:" q-pa-lg q-mr-none text-white",staticStyle:{"background-color":"#fff"},attrs:{side:""}},[a("q-icon",{attrs:{name:"menu_book",color:"pink",size:"24px"}})],1),a("q-item-section",{staticClass:"q-ml-none"},[a("q-item-label",{staticClass:"text-grey-7"},[t._v("Materials")]),a("q-item-label",{staticClass:"text-dark text-h6 text-weight-bolder"},[t._v("$ "+t._s(t.materials))])],1)],1)],1),a("div",{staticClass:"col-md-2 col-sm-12 col-xs-12"},[a("q-item",{staticClass:"q-pa-none q-ml-xs",staticStyle:{"background-color":"#fff"}},[a("q-item-section",{staticClass:" q-pa-lg q-mr-none text-white",staticStyle:{"background-color":"#fff"},attrs:{side:""}},[a("q-icon",{attrs:{name:"local_atm",color:"green",size:"24px"}})],1),a("q-item-section",{staticClass:"q-ml-none"},[a("q-item-label",{staticClass:"text-grey-7"},[t._v("Grand Total")]),a("q-item-label",{staticClass:"text-dark text-h6 text-weight-bolder"},[t._v("$ "+t._s(t.grandTotal))])],1)],1)],1),a("div",{staticClass:"col-md-2 col-sm-12 col-xs-12"},[a("q-item",{staticClass:"q-pa-none q-ml-xs",staticStyle:{"background-color":"#fff"}},[a("q-item-section",{staticClass:" q-pa-lg q-mr-none text-white",staticStyle:{"background-color":"#fff"},attrs:{side:""}},[a("q-icon",{attrs:{name:"search",color:"pink",size:"24px"}})],1),a("q-item-section",{staticClass:"q-ml-none"},[a("q-item-label",{staticClass:"text-grey-7"},[t._v("Total PD (+/-)")]),a("q-item-label",{staticClass:"text-dark text-h6 text-weight-bolder"},[t._v("% 9.04")])],1)],1)],1),a("div",{staticClass:"col-md-2 col-sm-12 col-xs-12"},[a("q-item",{staticClass:"q-pa-none q-ml-xs",staticStyle:{"background-color":"#fff"}},[a("q-item-section",{staticClass:" q-pa-lg q-mr-none text-white",staticStyle:{"background-color":"#fff"},attrs:{side:""}},[a("q-icon",{attrs:{name:"timeline",color:"purple",size:"24px"}})],1),a("q-item-section",{staticClass:"q-ml-none"},[a("q-item-label",{staticClass:"text-grey-7"},[t._v("Last Year (+/-)")]),a("q-item-label",{staticClass:"text-dark text-h6 text-weight-bolder"},[t._v("% 9.42")])],1)],1)],1),a("div",{staticClass:"col-md-2 col-sm-12 col-xs-12"},[a("q-item",{staticClass:"q-pa-none q-ml-xs",staticStyle:{"background-color":"#fff"}},[a("q-item-section",{staticClass:" q-pa-lg q-mr-none text-white",staticStyle:{"background-color":"#fff"},attrs:{side:""}},[a("q-icon",{attrs:{name:"timeline",color:"orange",size:"24px"}})],1),a("q-item-section",{staticClass:"q-ml-none"},[a("q-item-label",{staticClass:"text-grey-7"},[t._v("From Last Year (+/-)")]),a("q-item-label",{staticClass:"text-dark text-h6 text-weight-bolder"},[t._v("% 8.42")])],1)],1)],1)])])],1),a("div",{staticClass:"q-pa-sm q-mt-sm q-gutter-sm"},[a("q-table",{attrs:{title:"Title 2",data:t.data,columns:t.columns,filter:t.filter,"row-key":"name",loading:t.loading,"binary-state-sort":""},scopedSlots:t._u([{key:"loading",fn:function(){return[a("q-inner-loading",{attrs:{showing:"",color:"primary"}})]},proxy:!0},{key:"top-right",fn:function(e){return[a("q-select",{staticClass:"q-mr-md",staticStyle:{"min-width":"200px","max-width":"200px"},attrs:{dense:"",outlines:"",clearable:"",options:t.schoolYears,label:"School year"},on:{input:t.filterAllocation},model:{value:t.schoolYear,callback:function(e){t.schoolYear=e},expression:"schoolYear"}}),a("q-input",{staticClass:"q-mr-md",attrs:{outlines:"",dense:"",placeholder:"Search"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}],null,!0),model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),a("q-select",{staticClass:"q-mr-md",staticStyle:{"min-width":"200px","max-width":"200px"},attrs:{dense:"",outlines:"",clearable:"",options:t.options,label:"Allocation"},on:{input:t.filterAllocation},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),a("q-btn",{staticClass:"q-mr-md",staticStyle:{"background-color":"#546bfa"},attrs:{square:"","text-color":"white",icon:"add","no-caps":""},on:{click:function(e){t.show_dialog=!0}}},[t._v("Add")]),a("q-btn",{attrs:{"icon-right":"archive",label:"Export to Excel",color:"teal","text-color":"white","no-caps":""},on:{click:t.exportTable}}),"list"===t.mode?a("q-btn",{staticClass:"q-px-sm",attrs:{flat:"",round:"",dense:"",icon:e.inFullscreen?"fullscreen_exit":"fullscreen"},on:{click:e.toggleFullscreen}},[a("q-tooltip",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{disable:t.$q.platform.is.mobile}},[t._v(t._s(e.inFullscreen?"Exit Fullscreen":"Toggle Fullscreen")+"\n          ")])],1):t._e(),a("div",{staticClass:"q-pa-sm q-gutter-sm"},[a("q-dialog",{model:{value:t.show_dialog,callback:function(e){t.show_dialog=e},expression:"show_dialog"}},[a("q-card",[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Create")])]),a("q-card-section",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-6 col-xs-12 q-mb-sm q-pr-sm"},[a("q-select",{attrs:{outlined:"",options:t.schools,label:"Choose a school"},model:{value:t.editedItem.school,callback:function(e){t.$set(t.editedItem,"school",e)},expression:"editedItem.school"}})],1),a("div",{staticClass:"col-sm-6 col-xs-12"},[a("q-input",{attrs:{outlined:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{mask:"YYYY-MM-DD"},model:{value:t.editedItem.date,callback:function(e){t.$set(t.editedItem,"date",e)},expression:"editedItem.date"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}],null,!0),model:{value:t.editedItem.date,callback:function(e){t.$set(t.editedItem,"date",e)},expression:"editedItem.date"}})],1),a("div",{staticClass:"col-12 q-mt-md"},[a("p",[t._v("Preliminary Allocations")])]),a("div",{staticClass:"col-sm-6 col-xs-12  q-mb-sm q-pr-sm"},[a("q-input",{attrs:{disable:t.editedItem.allocation,outlined:"",label:"Professional Dev"},model:{value:t.editedItem.profDev,callback:function(e){t.$set(t.editedItem,"profDev",e)},expression:"editedItem.profDev"}})],1),a("div",{staticClass:"col-sm-6 col-xs-12  q-mb-sm"},[a("q-input",{attrs:{disable:t.editedItem.allocation,outlined:"",label:"Materials"},model:{value:t.editedItem.materials,callback:function(e){t.$set(t.editedItem,"materials",e)},expression:"editedItem.materials"}})],1),a("div",{staticClass:"col-12 q-mt-md"},[a("p",[t._v("Final Allocations")])]),a("div",{staticClass:"col-sm-6 col-xs-12  q-mb-sm q-pr-sm"},[a("q-input",{attrs:{disable:!t.editedItem.allocation,outlined:"",label:"Professional Dev"},model:{value:t.editedItem.profDevFinal,callback:function(e){t.$set(t.editedItem,"profDevFinal",e)},expression:"editedItem.profDevFinal"}})],1),a("div",{staticClass:"col-sm-6 col-xs-12  q-mb-sm"},[a("q-input",{attrs:{disable:!t.editedItem.allocation,outlined:"",label:"Materials"},model:{value:t.editedItem.materialsFinal,callback:function(e){t.$set(t.editedItem,"materialsFinal",e)},expression:"editedItem.materialsFinal"}})],1),a("div",{staticClass:"col-12 q-mt-md q-mb-md"},[a("div",{staticClass:"q-gutter-sm text-right"},[a("q-checkbox",{attrs:{label:"Allocation is Final"},model:{value:t.editedItem.allocation,callback:function(e){t.$set(t.editedItem,"allocation",e)},expression:"editedItem.allocation"}})],1)]),a("div",{staticClass:"col-12"},[a("q-input",{attrs:{type:"textarea",outlined:"",label:"Notes"},model:{value:t.editedItem.notes,callback:function(e){t.$set(t.editedItem,"notes",e)},expression:"editedItem.notes"}})],1),a("div",{staticClass:"col-12"},[a("q-chip",{staticClass:"q-mt-md",attrs:{outline:"",square:"",color:"blue","text-color":"white",label:"Previous Year PD: $45835.58 Previous Year Materials: $185.38"}})],1)])]),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Confirm",color:"primary"},on:{click:t.addRow}})],1)],1)],1),a("q-dialog",{attrs:{persistent:""},model:{value:t.confirm,callback:function(e){t.confirm=e},expression:"confirm"}},[a("q-card",[a("q-card-section",{staticClass:"row items-center"},[a("span",{staticClass:"q-ml-sm"},[t._v("Are you sure to delete this item?")])]),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"No, thanks",color:"primary"}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Yes",color:"red"},on:{click:t.deleteItem}})],1)],1)],1)],1)]}},{key:"body",fn:function(e){return[a("q-tr",{attrs:{props:e}},[a("q-td",{key:"date",attrs:{props:e}},[t._v("\n              "+t._s(e.row.date)+"\n            ")]),a("q-td",{key:"school",attrs:{props:e}},[a("div",{staticClass:"text-pre-wrap"},[t._v(t._s(e.row.school))])]),a("q-td",{key:"profDev",attrs:{props:e}},[e.row.allocation?a("div",[t._v("$ "+t._s(e.row.profDevFinal)+" ")]):a("div",[t._v(" $ "+t._s(e.row.profDev)+" ")])]),a("q-td",{key:"materials",attrs:{props:e}},[e.row.allocation?a("div",[t._v("$ "+t._s(e.row.materialsFinal)+" ")]):a("div",[t._v(" $ "+t._s(e.row.materials)+" ")])]),a("q-td",{key:"grandTotal",attrs:{props:e}},[t._v("\n              $ "+t._s(e.row.grandTotal)+"\n            ")]),a("q-td",{key:"allocation",attrs:{props:e}},[1!=e.row.allocation?a("q-chip",{staticClass:"edx-q-chip-button",attrs:{square:"","text-color":"orange"}},[t._v("\n                Preliminary\n              ")]):a("q-chip",{staticClass:"edx-q-chip-button",attrs:{square:"","text-color":"green"}},[t._v("\n                Final\n              ")])],1),a("q-td",{key:"actions",attrs:{props:e}},[a("q-btn",{staticClass:"q-mr-sm",attrs:{icon:"edit",color:"blue",size:"sm","no-caps":""},on:{click:function(a){return t.editItem(e.row)}}}),a("q-btn",{attrs:{icon:"delete_forever",color:"red",size:"sm","no-caps":""},on:{click:function(a){return t.openDeleteModal(e.row)}}})],1)],1)]}},{key:"bottom",fn:function(){return[a("div",{staticClass:"q-pa-md flex flex-center"},[a("q-pagination",{attrs:{max:t.pages,"max-pages":5,ellipsess:"","direction-links":!0},on:{input:t.changePagination},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}})],1)]},proxy:!0}])})],1)],1)},s=[],l=(a("7f7f"),a("f751"),a("28a5"),a("b178"));function i(t,e){var a=void 0!==e?e(t):t;return a=void 0===a||null===a?"":String(a),a=a.split('"').join('""'),'"'.concat(a,'"')}var n={data:function(){return{confirm:!1,loading:!1,pages:3,currentPage:1,pagination:{sortBy:"name",page:1,rowsPerPage:5},model:null,options:["Preliminary","Final"],schoolYear:null,schoolYears:["School Year 20-21","School Year 19-20","School Year 18-19"],isFinal:!1,filter:"",mode:"list",show_dialog:!1,editedIndex:-1,editedItem:{date:"",school:"",profDev:"",profDevFinal:"",allocation:!1,materials:"",materialsFinal:"",notes:""},defaultItem:{date:"",school:"",profDev:"",profDevFinal:"",allocation:"",materials:"",materialsFinal:"",notes:""},columns:[{name:"date",align:"left",label:"Date",field:"date",sortable:!0},{name:"school",align:"left",label:"School",field:"school",sortable:!0},{name:"profDev",align:"left",label:"Professional Development",field:"profDev",sortable:!0},{name:"materials",align:"left",label:"Materials",field:"materials",sortable:!0},{name:"grandTotal",align:"left",label:"Grand Total",field:"grandTotal",sortable:!0},{name:"allocation",align:"left",label:"Allocation",field:"allocation",sortable:!0},{name:"actions",align:"left",label:"Actions",field:"actions"}],data:[],tempData:[],schools:[]}},methods:{addRow:function(){var t,e=this.editedItem.profDev,a=this.editedItem.profDevFinal,o=this.editedItem.materials,s=this.editedItem.materialsFinal;t=this.editedItem.allocation?(parseFloat(a)+parseFloat(s)).toFixed(2):(parseFloat(e)+parseFloat(o)).toFixed(2);var l={date:this.editedItem.date,school:this.editedItem.school,profDev:e,profDevFinal:a,materials:o,materialsFinal:s,grandTotal:t,allocation:this.editedItem.allocation,notes:this.editedItem.notes};this.editedIndex>-1?Object.assign(this.data[this.editedIndex],l):this.data.unshift(l),this.close()},openDeleteModal:function(t){this.confirm=!0,this.item=t},deleteItem:function(){var t=this.item,e=this.data.indexOf(t);this.data.splice(e,1)},editItem:function(t){this.editedIndex=this.data.indexOf(t),this.editedItem=Object.assign({},t),this.show_dialog=!0},close:function(){var t=this;this.show_dialog=!1,setTimeout((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}),300)},exportTable:function(){var t=this,e=[this.columns.map((function(t){return i(t.label)}))].concat(this.data.map((function(e){return t.columns.map((function(t){return i("function"===typeof t.field?t.field(e):e[void 0===t.field?t.name:t.field],t.format)})).join(",")}))).join("\r\n"),a=Object(l["d"])("table-export.csv",e,"text/csv");!0!==a&&this.$q.notify({message:"Browser denied file download...",color:"negative",icon:"warning"})},changePagination:function(t){var e=this;this.currentPage=t,this.loading=!0,this.pagination.page=t,setTimeout((function(){e.loading=!1;for(var t=[],a=0;a<5;a++){var o=Math.floor(10*Math.random());o=!!(o%2);var s=void 0,l=void 0,i=void 0,n=void 0,r=void 0;o?l=parseFloat(Math.floor(1e3*Math.random())).toFixed(2):s=parseFloat(Math.floor(1e3*Math.random())).toFixed(2),o?n=parseFloat(Math.floor(1e3*Math.random())).toFixed(2):i=parseFloat(Math.floor(1e3*Math.random())).toFixed(2),r=o?(parseFloat(l)-parseFloat(n)).toFixed(2):(parseFloat(s)-parseFloat(i)).toFixed(2);var c={date:"2020-09-1"+a+1,school:"American School N"+a+1,profDev:s,profDevFinal:l,materials:i,materialsFinal:n,grandTotal:r,allocation:o,notes:""};t.push(c)}e.data=t,e.tempData=t}),550)},filterAllocation:function(){this.model?"Preliminary"==this.model?this.data=this.tempData.filter((function(t){return 0==t.allocation})):this.data=this.tempData.filter((function(t){return 1==t.allocation})):this.data=this.tempData}},created:function(){for(var t=[],e=0;e<5;e++){var a=Math.floor(10*Math.random());a=!!(a%2);var o=void 0,s=void 0,l=void 0,i=void 0,n=void 0;a?s=parseFloat(Math.floor(1e3*Math.random())).toFixed(2):o=parseFloat(Math.floor(1e3*Math.random())).toFixed(2),a?i=parseFloat(Math.floor(1e3*Math.random())).toFixed(2):l=parseFloat(Math.floor(1e3*Math.random())).toFixed(2),n=a?(parseFloat(s)+parseFloat(i)).toFixed(2):(parseFloat(o)+parseFloat(l)).toFixed(2);var r={date:"2020-09-1"+e+1,school:"American School N"+e+1,profDev:o,profDevFinal:s,materials:l,materialsFinal:i,grandTotal:n,allocation:a,notes:""};t.push(r)}this.data=t,this.tempData=t;for(var c=[],d=0;d<this.data.length;d++)c.push(this.data[d].school);this.schools=c},computed:{pd:function(){for(var t=0,e=0;e<this.data.length;e++){var a=void 0;a=this.data[e].profDev?parseFloat(this.data[e].profDev):parseFloat(this.data[e].profDevFinal),t+=a}return t.toFixed(2)},materials:function(){for(var t=0,e=0;e<this.data.length;e++){var a=void 0;a=this.data[e].materials?parseFloat(this.data[e].materials):parseFloat(this.data[e].materialsFinal),t+=a}return t.toFixed(2)},grandTotal:function(){for(var t=0,e=0;e<this.data.length;e++){var a=parseFloat(this.data[e].grandTotal);t+=a}return t.toFixed(2)}}},r=n,c=(a("008d"),a("2877")),d=Object(c["a"])(r,o,s,!1,null,"2b5a340f",null);e["default"]=d.exports}}]);