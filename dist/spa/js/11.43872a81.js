(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{"836d":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-pa-sm"},[a("q-card",{staticClass:"bg-transparent no-shadow no-border q-mb-md q-mt-md"},[a("q-card-section",{staticClass:"q-pa-none"},[a("div",{staticClass:"row q-col-gutter-sm "},[a("div",{staticClass:"col-md-3 col-sm-12 col-xs-12"},[a("q-card",[a("q-item",{staticClass:"q-pa-none",staticStyle:{"background-color":"#546bfa"}},[a("q-item-section",{staticClass:"q-pa-md q-ml-none  text-white"},[a("q-item-label",{staticClass:"text-white text-h6 text-weight-bolder"},[t._v("$ 20k")]),a("q-item-label",[t._v("Monthly Income")])],1),a("q-item-section",{staticClass:"q-mr-md text-white",attrs:{side:""}},[a("q-icon",{attrs:{name:"fas fa-dollar-sign",color:"white",size:"44px"}})],1)],1)],1)],1),a("div",{staticClass:"col-md-3 col-sm-12 col-xs-12"},[a("q-card",[a("q-item",{staticClass:"q-pa-none",staticStyle:{"background-color":"#3a9688"}},[a("q-item-section",{staticClass:" q-pa-md q-ml-none  text-white"},[a("q-item-label",{staticClass:"text-white text-h6 text-weight-bolder"},[t._v("20")]),a("q-item-label",[t._v("Weekly Sales")])],1),a("q-item-section",{staticClass:"q-mr-md text-white",attrs:{side:""}},[a("q-icon",{attrs:{name:"fas fa-chart-bar",color:"white",size:"44px"}})],1)],1)],1)],1),a("div",{staticClass:"col-md-3 col-sm-12 col-xs-12"},[a("q-card",[a("q-item",{staticClass:"q-pa-none ",staticStyle:{"background-color":"#7cb342"}},[a("q-item-section",{staticClass:" q-pa-md q-ml-none  text-white"},[a("q-item-label",{staticClass:"text-white text-h6 text-weight-bolder"},[t._v("321")]),a("q-item-label",[t._v("New Customers")])],1),a("q-item-section",{staticClass:"q-mr-md text-white",attrs:{side:""}},[a("q-icon",{attrs:{name:"fas fa-chart-line",color:"white",size:"44px"}})],1)],1)],1)],1),a("div",{staticClass:"col-md-3 col-sm-12 col-xs-12"},[a("q-card",[a("q-item",{staticClass:"q-pa-none",staticStyle:{"background-color":"#f88c2b"}},[a("q-item-section",{staticClass:" q-pa-md q-ml-none  text-white"},[a("q-item-label",{staticClass:"text-white text-h6 text-weight-bolder"},[t._v("82")]),a("q-item-label",[t._v("Active Users")])],1),a("q-item-section",{staticClass:"q-mr-md text-white",attrs:{side:""}},[a("q-icon",{attrs:{name:"person",color:"white",size:"44px"}})],1)],1)],1)],1)])])],1),a("q-table",{attrs:{title:"Treats",data:t.data,columns:t.columns,"row-key":"name","binary-state-sort":""},scopedSlots:t._u([{key:"body",fn:function(e){return[a("q-tr",{attrs:{props:e}},[a("q-td",{key:"desc",attrs:{props:e}},[t._v("\n          "+t._s(e.row.name)+"\n          "),a("q-popup-edit",{model:{value:e.row.name,callback:function(a){t.$set(e.row,"name",a)},expression:"props.row.name"}},[a("q-input",{attrs:{dense:"",autofocus:"",counter:""},model:{value:e.row.name,callback:function(a){t.$set(e.row,"name",a)},expression:"props.row.name"}})],1)],1),a("q-td",{key:"calories",attrs:{props:e}},[t._v("\n          "+t._s(e.row.calories)+"\n          "),a("q-popup-edit",{attrs:{title:"Update calories",buttons:""},model:{value:e.row.calories,callback:function(a){t.$set(e.row,"calories",a)},expression:"props.row.calories"}},[a("q-input",{attrs:{type:"number",dense:"",autofocus:""},model:{value:e.row.calories,callback:function(a){t.$set(e.row,"calories",a)},expression:"props.row.calories"}})],1)],1),a("q-td",{key:"fat",attrs:{props:e}},[a("div",{staticClass:"text-pre-wrap"},[t._v(t._s(e.row.fat))]),a("q-popup-edit",{model:{value:e.row.fat,callback:function(a){t.$set(e.row,"fat",a)},expression:"props.row.fat"}},[a("q-input",{attrs:{type:"textarea",dense:"",autofocus:""},model:{value:e.row.fat,callback:function(a){t.$set(e.row,"fat",a)},expression:"props.row.fat"}})],1)],1),a("q-td",{key:"carbs",attrs:{props:e}},[t._v("\n          "+t._s(e.row.carbs)+"\n          "),a("q-popup-edit",{attrs:{title:"Update carbs",buttons:"",persistent:""},model:{value:e.row.carbs,callback:function(a){t.$set(e.row,"carbs",a)},expression:"props.row.carbs"}},[a("q-input",{attrs:{type:"number",dense:"",autofocus:"",hint:"Use buttons to close"},model:{value:e.row.carbs,callback:function(a){t.$set(e.row,"carbs",a)},expression:"props.row.carbs"}})],1)],1),a("q-td",{key:"protein",attrs:{props:e}},[t._v(t._s(e.row.protein))]),a("q-td",{key:"sodium",attrs:{props:e}},[t._v(t._s(e.row.sodium))]),a("q-td",{key:"calcium",attrs:{props:e}},[t._v(t._s(e.row.calcium))]),a("q-td",{key:"iron",attrs:{props:e}},[t._v(t._s(e.row.iron))])],1)]}}])}),a("q-table",{attrs:{title:"Treats",data:t.data1,columns:t.columns,filter:t.filter,"no-data-label":"I didn't find anything for you","no-results-label":"The filter didn't uncover any results","row-key":"name"},scopedSlots:t._u([{key:"top-right",fn:function(){return[a("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}},[a("q-icon",{attrs:{slot:"append",name:"search"},slot:"append"})],1)]},proxy:!0},{key:"no-data",fn:function(e){var s=e.icon,o=e.message,r=e.filter;return[a("div",{staticClass:"full-width row flex-center text-accent q-gutter-sm"},[a("q-icon",{attrs:{size:"2em",name:"sentiment_dissatisfied"}}),a("span",[t._v("\n          Well this is sad... "+t._s(o)+"\n        ")]),a("q-icon",{attrs:{size:"2em",name:r?"filter_b_and_w":s}})],1)]}}])})],1)},o=[],r=(a("7f7f"),{data:function(){return{columns:[{name:"desc",required:!0,label:"Dessert (100g serving)",align:"left",field:function(t){return t.name},format:function(t){return"".concat(t)},sortable:!0},{name:"calories",align:"center",label:"Calories",field:"calories",sortable:!0},{name:"fat",label:"Fat (g)",field:"fat",sortable:!0,style:"width: 10px"},{name:"carbs",label:"Carbs (g)",field:"carbs"},{name:"protein",label:"Protein (g)",field:"protein"},{name:"sodium",label:"Sodium (mg)",field:"sodium"},{name:"calcium",label:"Calcium (%)",field:"calcium",sortable:!0,sort:function(t,e){return parseInt(t,10)-parseInt(e,10)}},{name:"iron",label:"Iron (%)",field:"iron",sortable:!0,sort:function(t,e){return parseInt(t,10)-parseInt(e,10)}}],data:[{name:"Frozen Yogurt",calories:159,fat:6,carbs:24,protein:4,sodium:87,calcium:"14%",iron:"1%"},{name:"Ice cream sandwich",calories:237,fat:9,carbs:37,protein:4.3,sodium:129,calcium:"8%",iron:"1%"},{name:"Eclair",calories:262,fat:16,carbs:23,protein:6,sodium:337,calcium:"6%",iron:"7%"},{name:"Cupcake",calories:305,fat:3.7,carbs:67,protein:4.3,sodium:413,calcium:"3%",iron:"8%"},{name:"Gingerbread",calories:356,fat:16,carbs:49,protein:3.9,sodium:327,calcium:"7%",iron:"16%"},{name:"Jelly bean",calories:375,fat:0,carbs:94,protein:0,sodium:50,calcium:"0%",iron:"0%"},{name:"Lollipop",calories:392,fat:.2,carbs:98,protein:0,sodium:38,calcium:"0%",iron:"2%"},{name:"Honeycomb",calories:408,fat:3.2,carbs:87,protein:6.5,sodium:562,calcium:"0%",iron:"45%"},{name:"Donut",calories:452,fat:25,carbs:51,protein:4.9,sodium:326,calcium:"2%",iron:"22%"},{name:"KitKat",calories:518,fat:26,carbs:65,protein:7,sodium:54,calcium:"12%",iron:"6%"}]}}}),i=r,n=a("2877"),l=Object(n["a"])(i,s,o,!1,null,null,null);e["default"]=l.exports}}]);