(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"223a":function(t,e,a){"use strict";var s=a("8aa9"),i=a.n(s);i.a},"2d8b":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-pa-sm"},[a("q-card",{staticClass:"bg-transparent no-shadow no-border q-mb-md q-mt-md"},[a("q-card-section",{staticClass:"q-pa-none"},[a("div",{staticClass:"row q-col-gutter-sm "},[a("div",{staticClass:"col-md-2 col-sm-12 col-xs-12"},[a("q-card",[a("q-item",{staticClass:"q-pa-none",staticStyle:{"background-color":"#546bfa"}},[a("q-item-section",{staticClass:"q-pa-md q-ml-none  text-white"},[a("q-item-label",{staticClass:"text-white text-h6 text-weight-bolder"},[t._v("$ 45789")]),a("q-item-label",[t._v("Total")])],1),a("q-item-section",{staticClass:"q-mr-md text-white",attrs:{side:""}},[a("q-icon",{attrs:{name:"fas fa-dollar-sign",color:"white",size:"44px"}})],1)],1)],1)],1),a("div",{staticClass:"col-md-2 col-sm-12 col-xs-12"},[a("q-card",[a("q-item",{staticClass:"q-pa-none",staticStyle:{"background-color":"#3a9688"}},[a("q-item-section",{staticClass:" q-pa-md q-ml-none  text-white"},[a("q-item-label",{staticClass:"text-white text-h6 text-weight-bolder"},[t._v("$ 0.0")]),a("q-item-label",[t._v("Ratio (+/-)")])],1),a("q-item-section",{staticClass:"q-mr-md text-white",attrs:{side:""}},[a("q-icon",{attrs:{name:"fas fa-chart-bar",color:"white",size:"44px"}})],1)],1)],1)],1)])])],1),a("div",{staticClass:"q-pa-sm q-gutter-sm"},[a("q-table",{attrs:{title:"Title 4",data:t.data,"hide-header":"grid"===t.mode,columns:t.columns,filter:t.filter,"row-key":"name","binary-state-sort":""},scopedSlots:t._u([{key:"body",fn:function(e){return[a("q-tr",{attrs:{props:e}},[a("q-td",{key:"dpi",attrs:{props:e}},[t._v("\n              "+t._s(e.row.dpi)+"\n            ")]),a("q-td",{key:"date",attrs:{props:e}},[t._v("\n              "+t._s(e.row.date)+"\n            ")]),a("q-td",{key:"school",attrs:{props:e}},[a("div",{staticClass:"text-pre-wrap"},[t._v(t._s(e.row.school))])]),a("q-td",{key:"allocation",attrs:{props:e}},[t._v("\n              "+t._s(e.row.allocation)+"\n            ")]),a("q-td",{key:"previousYear",attrs:{props:e}},[t._v("\n              "+t._s(e.row.previousYear)+"\n            ")]),a("q-td",{key:"difference",attrs:{props:e}},[t._v("\n              "+t._s(e.row.difference)+"\n            ")]),a("q-td",{key:"status",attrs:{props:e}},["Preliminary"==e.row.status?a("q-chip",{attrs:{square:"",color:"orange","text-color":"white"}},[t._v("\n                "+t._s(e.row.status)+"\n              ")]):a("q-chip",{staticClass:"glossy",attrs:{square:"",color:"teal","text-color":"white"}},[t._v("\n                "+t._s(e.row.status)+"\n              ")])],1),a("q-td",{key:"actions",attrs:{props:e}},[a("q-btn",{staticClass:"q-mr-sm",attrs:{icon:"edit",color:"blue",size:"sm","no-caps":""},on:{click:function(a){return t.editItem(e.row)}}}),a("q-btn",{attrs:{icon:"delete_forever",color:"red",size:"sm","no-caps":""},on:{click:function(a){return t.deleteItem(e.row)}}})],1)],1)]}},{key:"top-right",fn:function(e){return[a("q-input",{staticClass:"q-mr-md",attrs:{outlines:"",dense:"",placeholder:"Search"},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}],null,!0),model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),a("q-select",{staticClass:"q-mr-md",staticStyle:{"min-width":"200px","max-width":"200px"},attrs:{dense:"",outlines:"",clearable:"",options:t.options,label:"Allocation"},model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),a("q-select",{staticClass:"q-mr-md",staticStyle:{"min-width":"150px","max-width":"150px"},attrs:{dense:"",outlines:"",clearable:"",options:t.optionsDescending,label:"ID Descending"},model:{value:t.modelDescending,callback:function(e){t.modelDescending=e},expression:"modelDescending"}}),a("q-btn",{staticClass:"q-mr-md",staticStyle:{"background-color":"#546bfa"},attrs:{square:"","text-color":"white",icon:"add","no-caps":""},on:{click:function(e){t.show_dialog=!0}}},[t._v("Add")]),a("q-btn",{attrs:{"icon-right":"archive",label:"Export to Excel",color:"teal","text-color":"white","no-caps":""},on:{click:t.exportTable}}),"list"===t.mode?a("q-btn",{staticClass:"q-px-sm",attrs:{flat:"",round:"",dense:"",icon:e.inFullscreen?"fullscreen_exit":"fullscreen"},on:{click:e.toggleFullscreen}},[a("q-tooltip",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{disable:t.$q.platform.is.mobile}},[t._v(t._s(e.inFullscreen?"Exit Fullscreen":"Toggle Fullscreen")+"\n          ")])],1):t._e(),a("div",{staticClass:"q-pa-sm q-gutter-sm"},[a("q-dialog",{model:{value:t.show_dialog,callback:function(e){t.show_dialog=e},expression:"show_dialog"}},[a("q-card",[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Create")])]),a("q-card-section",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 q-mb-sm q-pr-sm"},[a("q-input",{attrs:{outlined:"",label:"School"},model:{value:t.editedItem.school,callback:function(e){t.$set(t.editedItem,"school",e)},expression:"editedItem.school"}})],1),a("div",{staticClass:"col-md-6"},[a("q-input",{attrs:{outlined:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{mask:"YYYY-MM-DD HH:mm"},model:{value:t.editedItem.date,callback:function(e){t.$set(t.editedItem,"date",e)},expression:"editedItem.date"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0},{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"access_time"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-time",{attrs:{mask:"YYYY-MM-DD HH:mm",format24h:""},model:{value:t.editedItem.date,callback:function(e){t.$set(t.editedItem,"date",e)},expression:"editedItem.date"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}],null,!0),model:{value:t.editedItem.date,callback:function(e){t.$set(t.editedItem,"date",e)},expression:"editedItem.date"}})],1),a("div",{staticClass:"col-md-6 q-pr-sm"},[a("q-input",{attrs:{disable:t.isFinal,outlined:"",label:"Preliminary Allocations"},model:{value:t.editedItem.allocation,callback:function(e){t.$set(t.editedItem,"allocation",e)},expression:"editedItem.allocation"}})],1),a("div",{staticClass:"col-md-6"},[a("q-input",{attrs:{disable:!t.isFinal,outlined:"",label:"Final Allocations"},model:{value:t.editedItem.allocation,callback:function(e){t.$set(t.editedItem,"allocation",e)},expression:"editedItem.allocation"}})],1),a("div",{staticClass:"col-md-12 q-mt-md q-mb-md"},[a("div",{staticClass:"q-gutter-sm text-right"},[a("q-checkbox",{attrs:{label:"Allocation is Final"},model:{value:t.isFinal,callback:function(e){t.isFinal=e},expression:"isFinal"}})],1)]),a("div",{staticClass:"col-md-12"},[a("q-input",{attrs:{type:"textarea",outlined:"",label:"Notes"}})],1),a("q-chip",{staticClass:"q-mt-md",attrs:{outline:"",square:"",color:"blue","text-color":"white",label:"Previous Year Allocations: $2792.84"}})],1)]),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Confirm",color:"primary"},on:{click:t.addRow}})],1)],1)],1)],1)]}}])})],1)],1)},i=[],o=(a("7f7f"),a("f751"),a("28a5"),a("b178"));function l(t,e){var a=void 0!==e?e(t):t;return a=void 0===a||null===a?"":String(a),a=a.split('"').join('""'),'"'.concat(a,'"')}var n={data:function(){return{model:null,options:["Preliminary","Final"],modelDescending:null,optionsDescending:["ID Ascending","ID Descending"],filter:"",mode:"list",isFinal:!1,show_dialog:!1,editedIndex:-1,editedItem:{dpi:"",date:"",school:"",profDev:"",materials:"",grandTotal:"",allocation:""},defaultItem:{name:"",calories:0,fat:0,carbs:0,protein:0,sodium:0,calcium:"0%",iron:"0%"},columns:[{name:"dpi",required:!0,label:"DPI",align:"left",field:function(t){return t.dpi},format:function(t){return"".concat(t)},sortable:!0},{name:"date",align:"left",label:"Date",field:"date",sortable:!0},{name:"school",align:"left",label:"School",field:"school",sortable:!0},{name:"allocation",align:"left",label:"Allocation",field:"allocation",sortable:!0},{name:"previousYear",align:"left",label:"Previous Year",field:"previousYear",sortable:!0},{name:"difference",align:"left",label:"Difference",field:"difference",sortable:!0},{name:"status",align:"left",label:"Status",field:"status",sortable:!0},{name:"actions",align:"left",label:"Actions",field:"actions"}],data:[{dpi:101,date:"21/09/2020",school:"American School N1",instruction:"$ 189.78",allocation:"$ 10.22",previousYear:"$ 200.00",difference:"$ 4455.00",status:"Preliminary"},{dpi:102,date:"21/09/2020",school:"American School N2",instruction:"$ 174.78",allocation:"$ 17.22",previousYear:"$ 240.00",difference:"$ 7855.00",status:"Final"}]}},methods:{addRow:function(){this.editedIndex>-1?Object.assign(this.data[this.editedIndex],this.editedItem):this.data.push(this.editedItem),this.close()},deleteItem:function(t){var e=this.data.indexOf(t);confirm("Are you sure you want to delete this item?")&&this.data.splice(e,1)},editItem:function(t){this.editedIndex=this.data.indexOf(t),this.editedItem=Object.assign({},t),this.show_dialog=!0},close:function(){var t=this;this.show_dialog=!1,setTimeout((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}),300)},exportTable:function(){var t=this,e=[this.columns.map((function(t){return l(t.label)}))].concat(this.data.map((function(e){return t.columns.map((function(t){return l("function"===typeof t.field?t.field(e):e[void 0===t.field?t.name:t.field],t.format)})).join(",")}))).join("\r\n"),a=Object(o["d"])("table-export.csv",e,"text/csv");!0!==a&&this.$q.notify({message:"Browser denied file download...",color:"negative",icon:"warning"})}}},c=n,r=(a("223a"),a("2877")),d=Object(r["a"])(c,s,i,!1,null,"020fc489",null);e["default"]=d.exports},"8aa9":function(t,e,a){}}]);