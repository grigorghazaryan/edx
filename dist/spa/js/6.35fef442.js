(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{1294:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-pa-sm"},[a("q-card",{staticClass:"bg-transparent no-shadow no-border q-mb-md q-mt-md"},[a("q-card-section",{staticClass:"q-pa-none"},[a("div",{staticClass:"row q-col-gutter-sm "},[a("div",{staticClass:"col-md-3 col-sm-12 col-xs-12"},[a("q-card",[a("q-item",{staticClass:"q-pa-none",staticStyle:{"background-color":"#546bfa"}},[a("q-item-section",{staticClass:"q-pa-md q-ml-none  text-white"},[a("q-item-label",{staticClass:"text-white text-h6 text-weight-bolder"},[t._v("$ 720k")]),a("q-item-label",[t._v("Monthly Income")])],1),a("q-item-section",{staticClass:"q-mr-md text-white",attrs:{side:""}},[a("q-icon",{attrs:{name:"fas fa-dollar-sign",color:"white",size:"44px"}})],1)],1)],1)],1),a("div",{staticClass:"col-md-3 col-sm-12 col-xs-12"},[a("q-card",[a("q-item",{staticClass:"q-pa-none",staticStyle:{"background-color":"#3a9688"}},[a("q-item-section",{staticClass:" q-pa-md q-ml-none  text-white"},[a("q-item-label",{staticClass:"text-white text-h6 text-weight-bolder"},[t._v("20")]),a("q-item-label",[t._v("Weekly Sales")])],1),a("q-item-section",{staticClass:"q-mr-md text-white",attrs:{side:""}},[a("q-icon",{attrs:{name:"fas fa-chart-bar",color:"white",size:"44px"}})],1)],1)],1)],1),a("div",{staticClass:"col-md-3 col-sm-12 col-xs-12"},[a("q-card",[a("q-item",{staticClass:"q-pa-none ",staticStyle:{"background-color":"#7cb342"}},[a("q-item-section",{staticClass:" q-pa-md q-ml-none  text-white"},[a("q-item-label",{staticClass:"text-white text-h6 text-weight-bolder"},[t._v("321")]),a("q-item-label",[t._v("New Customers")])],1),a("q-item-section",{staticClass:"q-mr-md text-white",attrs:{side:""}},[a("q-icon",{attrs:{name:"fas fa-chart-line",color:"white",size:"44px"}})],1)],1)],1)],1),a("div",{staticClass:"col-md-3 col-sm-12 col-xs-12"},[a("q-card",[a("q-item",{staticClass:"q-pa-none",staticStyle:{"background-color":"#f88c2b"}},[a("q-item-section",{staticClass:" q-pa-md q-ml-none  text-white"},[a("q-item-label",{staticClass:"text-white text-h6 text-weight-bolder"},[t._v("82")]),a("q-item-label",[t._v("Active Users")])],1),a("q-item-section",{staticClass:"q-mr-md text-white",attrs:{side:""}},[a("q-icon",{attrs:{name:"person",color:"white",size:"44px"}})],1)],1)],1)],1)])])],1),a("div",{staticClass:"q-pa-sm q-gutter-sm"},[a("q-table",{attrs:{title:"Treats",data:t.data,columns:t.columns,"row-key":"name","binary-state-sort":""},scopedSlots:t._u([{key:"top",fn:function(){return[a("q-btn",{attrs:{dense:"",color:"secondary",label:"Add Row","no-caps":""},on:{click:function(e){t.show_dialog=!0}}}),a("div",{staticClass:"q-pa-sm q-gutter-sm"},[a("q-dialog",{model:{value:t.show_dialog,callback:function(e){t.show_dialog=e},expression:"show_dialog"}},[a("q-card",[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Add new item!")])]),a("q-card-section",[a("div",{staticClass:"row"},[a("q-input",{attrs:{label:"Dessert Name"},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}}),a("q-input",{attrs:{label:"Calories"},model:{value:t.editedItem.calories,callback:function(e){t.$set(t.editedItem,"calories",e)},expression:"editedItem.calories"}}),a("q-input",{attrs:{label:"Fat"},model:{value:t.editedItem.fat,callback:function(e){t.$set(t.editedItem,"fat",e)},expression:"editedItem.fat"}}),a("q-input",{attrs:{label:"Carbs"},model:{value:t.editedItem.carbs,callback:function(e){t.$set(t.editedItem,"carbs",e)},expression:"editedItem.carbs"}}),a("q-input",{attrs:{label:"Protein"},model:{value:t.editedItem.protein,callback:function(e){t.$set(t.editedItem,"protein",e)},expression:"editedItem.protein"}}),a("q-input",{attrs:{label:"Sodium"},model:{value:t.editedItem.sodium,callback:function(e){t.$set(t.editedItem,"sodium",e)},expression:"editedItem.sodium"}}),a("q-input",{attrs:{label:"Calcium"},model:{value:t.editedItem.calcium,callback:function(e){t.$set(t.editedItem,"calcium",e)},expression:"editedItem.calcium"}}),a("q-input",{attrs:{label:"Iron"},model:{value:t.editedItem.iron,callback:function(e){t.$set(t.editedItem,"iron",e)},expression:"editedItem.iron"}})],1)]),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"OK",color:"primary"},on:{click:t.addRow}})],1)],1)],1)],1)]},proxy:!0},{key:"body",fn:function(e){return[a("q-tr",{attrs:{props:e}},[a("q-td",{key:"desc",attrs:{props:e}},[t._v("\n            "+t._s(e.row.name)+"\n            "),a("q-popup-edit",{model:{value:e.row.name,callback:function(a){t.$set(e.row,"name",a)},expression:"props.row.name"}},[a("q-input",{attrs:{dense:"",autofocus:"",counter:""},model:{value:e.row.name,callback:function(a){t.$set(e.row,"name",a)},expression:"props.row.name"}})],1)],1),a("q-td",{key:"calories",attrs:{props:e}},[t._v("\n            "+t._s(e.row.calories)+"\n            "),a("q-popup-edit",{attrs:{title:"Update calories",buttons:""},model:{value:e.row.calories,callback:function(a){t.$set(e.row,"calories",a)},expression:"props.row.calories"}},[a("q-input",{attrs:{type:"number",dense:"",autofocus:""},model:{value:e.row.calories,callback:function(a){t.$set(e.row,"calories",a)},expression:"props.row.calories"}})],1)],1),a("q-td",{key:"fat",attrs:{props:e}},[a("div",{staticClass:"text-pre-wrap"},[t._v(t._s(e.row.fat))]),a("q-popup-edit",{model:{value:e.row.fat,callback:function(a){t.$set(e.row,"fat",a)},expression:"props.row.fat"}},[a("q-input",{attrs:{type:"textarea",dense:"",autofocus:""},model:{value:e.row.fat,callback:function(a){t.$set(e.row,"fat",a)},expression:"props.row.fat"}})],1)],1),a("q-td",{key:"carbs",attrs:{props:e}},[t._v("\n            "+t._s(e.row.carbs)+"\n            "),a("q-popup-edit",{attrs:{title:"Update carbs",buttons:"",persistent:""},model:{value:e.row.carbs,callback:function(a){t.$set(e.row,"carbs",a)},expression:"props.row.carbs"}},[a("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.carbs,callback:function(a){t.$set(e.row,"carbs",a)},expression:"props.row.carbs"}})],1)],1),a("q-td",{key:"protein",attrs:{props:e}},[t._v(t._s(e.row.protein))]),a("q-td",{key:"sodium",attrs:{props:e}},[t._v(t._s(e.row.sodium))]),a("q-td",{key:"calcium",attrs:{props:e}},[t._v(t._s(e.row.calcium))]),a("q-td",{key:"iron",attrs:{props:e}},[t._v(t._s(e.row.iron))]),a("q-td",{key:"actions",attrs:{props:e}},[a("q-btn",{attrs:{color:"blue",label:"Update",size:"sm","no-caps":""},on:{click:function(a){return t.editItem(e.row)}}}),a("q-btn",{attrs:{color:"red",label:"Delete",size:"sm","no-caps":""},on:{click:function(a){return t.deleteItem(e.row)}}})],1)],1)]}}])})],1)],1)},i=[],o=(a("f751"),a("7f7f"),{name:"Tables",data:function(){return{show_dialog:!1,editedIndex:-1,editedItem:{name:"",calories:0,fat:0,carbs:0,protein:0,sodium:0,calcium:"0%",iron:"0%"},defaultItem:{name:"",calories:0,fat:0,carbs:0,protein:0,sodium:0,calcium:"0%",iron:"0%"},columns:[{name:"desc",required:!0,label:"Dessert (100g serving)",align:"left",field:function(t){return t.name},format:function(t){return"".concat(t)},sortable:!0},{name:"calories",align:"center",label:"Calories",field:"calories",sortable:!0},{name:"fat",label:"Fat (g)",field:"fat",sortable:!0,style:"width: 10px"},{name:"carbs",label:"Carbs (g)",field:"carbs"},{name:"protein",label:"Protein (g)",field:"protein"},{name:"sodium",label:"Sodium (mg)",field:"sodium"},{name:"calcium",label:"Calcium (%)",field:"calcium",sortable:!0,sort:function(t,e){return parseInt(t,10)-parseInt(e,10)}},{name:"iron",label:"Iron (%)",field:"iron",sortable:!0,sort:function(t,e){return parseInt(t,10)-parseInt(e,10)}},{name:"actions",label:"Actions",field:"actions"}],data:[{name:"Frozen Yogurt",calories:159,fat:6,carbs:24,protein:4,sodium:87,calcium:"14%",iron:"1%"},{name:"Ice cream sandwich",calories:237,fat:9,carbs:37,protein:4.3,sodium:129,calcium:"8%",iron:"1%"},{name:"Eclair",calories:262,fat:16,carbs:23,protein:6,sodium:337,calcium:"6%",iron:"7%"},{name:"Cupcake",calories:305,fat:3.7,carbs:67,protein:4.3,sodium:413,calcium:"3%",iron:"8%"},{name:"Gingerbread",calories:356,fat:16,carbs:49,protein:3.9,sodium:327,calcium:"7%",iron:"16%"},{name:"Jelly bean",calories:375,fat:0,carbs:94,protein:0,sodium:50,calcium:"0%",iron:"0%"},{name:"Lollipop",calories:392,fat:.2,carbs:98,protein:0,sodium:38,calcium:"0%",iron:"2%"},{name:"Honeycomb",calories:408,fat:3.2,carbs:87,protein:6.5,sodium:562,calcium:"0%",iron:"45%"},{name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{name:"KitKat",calories:518,fat:26,carbs:65,protein:7,sodium:54,calcium:"12%",iron:"6%"}]}},methods:{addRow:function(){this.editedIndex>-1?Object.assign(this.data[this.editedIndex],this.editedItem):this.data.push(this.editedItem),this.close()},deleteItem:function(t){var e=this.data.indexOf(t);confirm("Are you sure you want to delete this item?")&&this.data.splice(e,1)},editItem:function(t){this.editedIndex=this.data.indexOf(t),this.editedItem=Object.assign({},t),this.show_dialog=!0},close:function(){var t=this;this.show_dialog=!1,setTimeout((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}),300)}}}),r=o,n=(a("fcc5"),a("2877")),l=Object(n["a"])(r,s,i,!1,null,null,null);e["default"]=l.exports},"5b99":function(t,e,a){},fcc5:function(t,e,a){"use strict";var s=a("5b99"),i=a.n(s);i.a}}]);