(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[41],{"8cea":function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("q-page",{staticClass:"q-pa-sm edx-background"},[a("div",{staticClass:"q-pa-sm q-mt-sm q-gutter-sm"},[a("div",{staticClass:"edx-header-parent"},[a("span",{staticClass:"edx-header-text"},[t._v(t._s(t.schoolName))])]),a("q-card",[a("q-tabs",{staticClass:"text-grey",attrs:{dense:"","active-color":"primary","indicator-color":"primary",align:"left","narrow-indicator":""},model:{value:t.tab,callback:function(s){t.tab=s},expression:"tab"}},[a("q-tab",{attrs:{name:"1",label:"School Information"}}),a("q-tab",{attrs:{name:"2",label:"Campuses"}}),a("q-tab",{attrs:{name:"3",label:"School Year Parameter"}}),a("q-tab",{attrs:{name:"4",label:"School Contacts"}})],1),a("q-separator"),a("q-tab-panels",{staticClass:"tab-panels-parent",attrs:{animated:""},model:{value:t.tab,callback:function(s){t.tab=s},expression:"tab"}},[a("q-tab-panel",{staticClass:"q-p-sm",attrs:{name:"1"}},[a("SchoolInformation")],1),a("q-tab-panel",{staticClass:"q-p-sm",attrs:{name:"2"}},[a("Campuses")],1),a("q-tab-panel",{staticClass:"q-p-sm",attrs:{name:"3"}},[a("SchoolYearParameter")],1),a("q-tab-panel",{staticClass:"q-p-sm",attrs:{name:"4"}},[a("SchoolContacts")],1)],1)],1)],1)])},i=[],o=(a("7f7f"),function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"q-pa-lg q-mt-md"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4 bordered-box"},[a("div",{staticClass:"text-subtitle1 row justify-start items-center q-mb-md"},[a("q-icon",{staticClass:"q-mr-sm",staticStyle:{"font-size":"1.5em"},attrs:{name:"contact_page",color:"green"}}),a("b",[t._v("School Names")])],1),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("School Name")]),a("q-input",{attrs:{outlined:"",dense:"",autofocus:""},model:{value:t.schoolName,callback:function(s){t.schoolName=s},expression:"schoolName"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("School Abbriviation")]),a("q-input",{attrs:{outlined:"",dense:"",autofocus:""},model:{value:t.schoolAbbriviation,callback:function(s){t.schoolAbbriviation=s},expression:"schoolAbbriviation"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("School Shortname")]),a("q-input",{attrs:{outlined:"",dense:"",autofocus:""},model:{value:t.schoolShortName,callback:function(s){t.schoolShortName=s},expression:"schoolShortName"}})],1)]),a("div",{staticClass:"text-subtitle1 row justify-start items-center q-mb-md q-mt-md"},[a("q-icon",{staticClass:"q-mr-sm",staticStyle:{"font-size":"1.5em"},attrs:{name:"contact_page",color:"green"}}),a("b",[t._v("Primary Address")])],1),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("Address Line 1")]),a("q-input",{attrs:{outlined:"",dense:"",autofocus:""},model:{value:t.address1,callback:function(s){t.address1=s},expression:"address1"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("Address Line 2")]),a("q-input",{attrs:{outlined:"",dense:"",autofocus:""},model:{value:t.address2,callback:function(s){t.address2=s},expression:"address2"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 q-pr-sm"},[a("div",{staticClass:"text-subtitle2"},[t._v("City")]),a("q-input",{attrs:{outlined:"",dense:"",autofocus:""},model:{value:t.city,callback:function(s){t.city=s},expression:"city"}})],1),a("div",{staticClass:"col-md-4 q-pr-sm"},[a("div",{staticClass:"text-subtitle2"},[t._v("State")]),a("q-select",{attrs:{outlined:"",dense:"",options:t.states},model:{value:t.state,callback:function(s){t.state=s},expression:"state"}})],1),a("div",{staticClass:"col-md-2"},[a("div",{staticClass:"text-subtitle2"},[t._v("Zip")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.zip,callback:function(s){t.zip=s},expression:"zip"}})],1)])])]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-3 q-pr-sm"},[a("div",{staticClass:"text-subtitle2"},[t._v("Phone")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.phone,callback:function(s){t.phone=s},expression:"phone"}})],1),a("div",{staticClass:"col-md-2"},[a("div",{staticClass:"text-subtitle2"},[t._v("Ext")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.ext,callback:function(s){t.ext=s},expression:"ext"}})],1)])])]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-3 q-pr-sm"},[a("div",{staticClass:"text-subtitle2"},[t._v("Fax")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.fax,callback:function(s){t.fax=s},expression:"fax"}})],1)])])]),a("div",{staticClass:"row q-mb-md"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("URL")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.url,callback:function(s){t.url=s},expression:"url"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12 text-right"},[a("q-btn",{staticClass:"edx-add-btn",attrs:{"text-color":"white",label:"Save"},on:{click:t.editSchoolInfo}})],1)])])]),null!=t.additionalAddresses&&null!=t.states?a("div",{staticClass:"row q-mt-lg q-mb-lg "},[a("div",{staticClass:"col-md-9 bordered-box"},[a("div",{staticClass:"text-subtitle1 row justify-start items-center q-mb-md"},[a("q-icon",{staticClass:"q-mr-sm",staticStyle:{"font-size":"1.5em"},attrs:{name:"location_on",color:"green"}}),a("b",[t._v("Additional addresses")])],1),a("SchoolsTable",{attrs:{addressData:t.additionalAddresses,statesData:t.states,type:1}})],1)]):t._e()])}),n=[],l=a("3f1e"),c=a("bc3a"),r=a.n(c),d=a("a1bc"),m={components:{SchoolsTable:l["a"]},data:function(){return{schoolName:"",schoolAbbriviation:"",schoolShortName:"",address1:"",address2:"",city:"",state:"",states:null,zip:"",phone:"",ext:"",fax:"",url:"",additionalAddresses:null}},methods:{getSchoolInformation:function(){var t=this,s={method:"GET",url:d["a"].getSchoolInformationById+this.$route.params.id,headers:{Accept:"application/json"}};r()(s).then((function(s){var a=s.data.school[0];console.log("///////////---------\x3e",a),t.additionalAddresses=a.address,t.schoolName=a.school_name,t.schoolAbbriviation=a.abbreviation,t.schoolShortName=a.short_name,t.address1=a.primary_address.address.address_line_1,t.address2=a.primary_address.address.address_line_2,t.city=a.primary_address.address.city,t.state={id:a.primary_address.address.state.id,label:a.primary_address.address.state.name},t.zip=a.primary_address.address.postal_code,t.phone=a.primary_address.address.phone,t.ext=a.primary_address.address.extension,t.fax=a.primary_address.address.fax,t.url=a.url}))},getStates:function(){var t=this,s={method:"GET",url:d["a"].getStates,headers:{Accept:"application/json"}};r()(s).then((function(s){for(var a=s.data.states,e=[],i=0;i<a.length;i++)e.push({id:a[i].id,label:a[i].name});t.states=e}))},editSchoolInfo:function(){var t=this,s={token:localStorage.getItem("access-token"),name:this.schoolName,abbreviation:this.schoolAbbriviation,short_name:this.schoolShortName,primaryAddress:{address_line_1:this.address1,address_line_2:this.address2,city:this.city,state_id:this.state.id,postal_code:this.zip,phone:this.phone,extension:this.ext,fax:this.fax},url:this.url},a={method:"PUT",url:d["a"].editSchool+this.$route.params.id,headers:{Accept:"application/json"},data:s};r()(a).then((function(s){t.getSchoolInformation()})),console.log(s)}},created:function(){this.getSchoolInformation(),this.getStates()}},p=m,u=a("2877"),v=Object(u["a"])(p,o,n,!1,null,null,null),b=v.exports,h=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"q-pa-lg"},[a("div",{staticClass:"row justify-between align-center"},[a("div",{staticClass:"text-subtitle1 row justify-start items-center"},[a("q-icon",{staticClass:"q-mr-sm",staticStyle:{"font-size":"1.5em"},attrs:{name:"people_alt",color:"green"}}),t._v("\n            Campus Name\n        ")],1),a("q-btn",{staticClass:"edx-add-btn",attrs:{"text-color":"white",label:"Add Campus"},on:{click:function(s){t.isAddCampusOpened=!0}}})],1),a("q-separator",{staticClass:"q-mt-sm q-mb-lg"}),a("q-table",{staticClass:"no-shadow overflow-auto my-sticky-column-table",attrs:{data:t.data,columns:t.columns,loading:t.loading,"row-key":"id","hide-bottom":"",pagination:t.pagination},on:{"update:pagination":function(s){t.pagination=s}},scopedSlots:t._u([{key:"body",fn:function(s){return[a("q-tr",{attrs:{props:s}},[a("q-td",{attrs:{"auto-width":""}},[a("q-btn",{attrs:{size:"sm",flat:"",color:"black",icon:s.expand?"keyboard_arrow_down":"keyboard_arrow_right"},on:{click:function(a){s.expand=!s.expand,t.openBottomSection(s.row,s.rowIndex)}}})],1),a("q-td",{key:"name",attrs:{props:s}},[a("div",[t._v("\n                        "+t._s(s.row.name)+"\n                    ")])])],1),a("q-tr",{directives:[{name:"show",rawName:"v-show",value:s.expand,expression:"props.expand"}],attrs:{props:s}},[a("q-td",{attrs:{colspan:"100%"}},[a("div",{staticClass:"q-mt-md"},[a("div",{staticClass:"row"},[null!=s.row.address&&null!=t.states?a("div",{staticClass:"col-md-12"},[a("SchoolsTable",{attrs:{addressData:s.row.address,statesData:t.states,type:2,id:s.row.id}})],1):t._e()])])])],1)]}}])}),a("dialog-draggable",{attrs:{width:500,modelDialog:t.isAddCampusOpened,title:"Add Campus"},on:{onHide:function(s){t.isAddCampusOpened=!1}}},[a("div",{staticClass:"q-pa-md"},[a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12 q-mb-sm"},[a("div",{staticClass:"text-subtitle2"},[t._v("Name")]),a("q-input",{attrs:{dense:"",outlined:""},model:{value:t.campus.name,callback:function(s){t.$set(t.campus,"name",s)},expression:"campus.name"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12 q-mb-sm"},[a("div",{staticClass:"text-subtitle2"},[t._v("Description")]),a("q-input",{attrs:{dense:"",outlined:""},model:{value:t.campus.description,callback:function(s){t.$set(t.campus,"description",s)},expression:"campus.description"}})],1)])]),a("q-separator"),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel",color:"primary"}}),a("q-btn",{attrs:{flat:"",label:"Add",color:"primary"},on:{click:t.addCampus}})],1)],1)],1)},f=[],C=a("13af"),_={components:{SchoolsTable:l["a"],dialogDraggable:C["a"]},data:function(){return{loading:!1,data:[],columns:[{name:"toggle",style:"width: 20px"},{name:"name",align:"left",label:"Name",field:"name",sortable:!0}],pagination:{rowsPerPage:1e3},states:null,campus:{name:"",description:""},isAddCampusOpened:!1}},methods:{getCampuses:function(){var t=this,s={method:"GET",url:d["a"].getSchoolCompuses+this.$route.params.id,headers:{Accept:"application/json"}};r()(s).then((function(s){for(var a=s.data.campuses,e=[],i=0;i<a.length;i++)e.push(a[i]);t.data=e}))},getStates:function(){var t=this,s={method:"GET",url:d["a"].getStates,headers:{Accept:"application/json"}};r()(s).then((function(s){for(var a=s.data.states,e=[],i=0;i<a.length;i++)e.push({id:a[i].id,label:a[i].name});t.states=e}))},addCampus:function(){var t=this,s={name:this.campus.name,description:this.campus.description,token:localStorage.getItem("access-token")},a={method:"POST",url:d["a"].addCampus+this.$route.params.id,headers:{Accept:"application/json"},data:s};r()(a).then((function(s){t.data.push(s.data.campus),t.$q.notify({message:"Campus addes successfully!",type:"positive"}),t.isAddCampusOpened=!1}))}},created:function(){this.getStates(),this.getCampuses()}},q=_,x=Object(u["a"])(q,h,f,!1,null,null,null),g=x.exports,w=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"q-pa-lg q-mt-md"},[a("div",{staticClass:"row q-mb-lg"},[a("div",{staticClass:"bordered-box col-md-6"},[a("div",{staticClass:"text-subtitle1 row justify-start items-center"},[a("q-icon",{staticClass:"q-mr-sm",staticStyle:{"font-size":"1.5em"},attrs:{name:"people_alt",color:"green"}}),a("b",[t._v("School Year Duration")])],1),a("div",{staticClass:"row"},[a("div",{staticClass:"row q-mt-lg"},[a("div",{staticClass:"q-pr-md row items-center justify-end"},[t._v("Start date:")]),a("div",{staticClass:"col-2"},[a("q-input",{attrs:{outlined:"",dense:""},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{color:"edx-pagination"},model:{value:t.startDate,callback:function(s){t.startDate=s},expression:"startDate"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}]),model:{value:t.startDate,callback:function(s){t.startDate=s},expression:"startDate"}})],1),a("div",{staticClass:"q-ml-lg q-pr-md row items-center justify-end"},[t._v("End date:")]),a("div",{staticClass:"col-2"},[a("q-input",{attrs:{outlined:"",dense:""},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{staticClass:"cursor-pointer",attrs:{name:"event"}},[a("q-popup-proxy",{attrs:{"transition-show":"scale","transition-hide":"scale"}},[a("q-date",{attrs:{color:"edx-pagination"},model:{value:t.endDate,callback:function(s){t.endDate=s},expression:"endDate"}},[a("div",{staticClass:"row items-center justify-end"},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{label:"Close",color:"primary",flat:""}})],1)])],1)],1)]},proxy:!0}]),model:{value:t.endDate,callback:function(s){t.endDate=s},expression:"endDate"}})],1),a("div",{staticClass:"col-md-3 q-ml-lg"},[t._v("\n                        233 work days excluding weekends and public holidays\n                    ")]),a("div",{staticClass:"col-md-12"},[a("q-checkbox",{attrs:{label:"School is active for current school year"},model:{value:t.isActive,callback:function(s){t.isActive=s},expression:"isActive"}})],1)])])])]),a("div",{staticClass:"q-mb-lg row"},[a("div",{staticClass:"col-md-3 bordered-box"},[a("div",{staticClass:"text-subtitle1 row justify-start items-center"},[a("q-icon",{staticClass:"q-mr-sm",staticStyle:{"font-size":"1.5em"},attrs:{name:"people_alt",color:"green"}}),a("b",[t._v("Adminsitrative fee overrides")])],1),t._m(0),a("div",{staticClass:"row q-mt-sm q-mb-sm"},[t._m(1),a("div",{staticClass:"col-md-3"},[a("q-checkbox",{model:{value:t.isActive,callback:function(s){t.isActive=s},expression:"isActive"}})],1),a("div",{staticClass:"col-3 q-pr-xl"},[a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.startDate,callback:function(s){t.startDate=s},expression:"startDate"}})],1)])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 bordered-box"},[a("div",{staticClass:"text-subtitle1 row justify-start items-center"},[a("q-icon",{staticClass:"q-mr-sm",staticStyle:{"font-size":"1.5em"},attrs:{name:"people_alt",color:"green"}}),a("b",[t._v("Fee overrides")])],1),t._m(2),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("q-separator",{staticClass:"q-mb-sm q-mt-sm"})],1)]),t._l(12,(function(s){return a("div",{key:s,staticClass:"row q-mt-sm q-mb-sm"},[t._m(3,!0),t._m(4,!0),t._m(5,!0),a("div",{staticClass:"col-md-2"},[a("q-checkbox",{model:{value:t.isActive,callback:function(s){t.isActive=s},expression:"isActive"}})],1),a("div",{staticClass:"col-md-2 q-pr-xl"},[a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.startDate,callback:function(s){t.startDate=s},expression:"startDate"}})],1)])}))],2)])])},y=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"row q-mt-md"},[a("div",{staticClass:"col-md-6"},[a("div",{staticClass:"text-subtitle2"},[t._v("Description")])]),a("div",{staticClass:"col-md-3"},[a("div",{staticClass:"text-subtitle2"},[t._v("Overide")])]),a("div",{staticClass:"col-md-3"},[a("div",{staticClass:"text-subtitle2"},[t._v("Percentage")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-md-6"},[a("span",[t._v("Administrative Fee")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"row q-mt-md"},[a("div",{staticClass:"col-md-2"},[a("div",{staticClass:"text-subtitle2"},[t._v("Allocation")])]),a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"text-subtitle2"},[t._v("Description")])]),a("div",{staticClass:"col-md-2"},[a("div",{staticClass:"text-subtitle2"},[t._v("Category")])]),a("div",{staticClass:"col-md-2"},[a("div",{staticClass:"text-subtitle2"},[t._v("Overide")])]),a("div",{staticClass:"col-md-2"},[a("div",{staticClass:"text-subtitle2"},[t._v("Percentage")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-md-2"},[a("span",[t._v("Title I")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-md-4"},[a("span",[t._v("Professional Development")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-md-2"},[a("span",[t._v("PD")])])}],k={data:function(){return{startDate:"",endDate:"",isActive:!1}}},S=k,A=Object(u["a"])(S,w,y,!1,null,null,null),D=A.exports,P=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"q-mt-md"},[a("div",{staticClass:"row justify-between align-center q-pr-lg q-pl-lg"},[a("div",{staticClass:"text-subtitle1 row justify-start items-center"},[a("q-icon",{staticClass:"q-mr-sm",staticStyle:{"font-size":"1.5em"},attrs:{name:"contact_phone",color:"green"}}),a("b",[t._v("School Contacts")])],1),a("q-btn",{staticClass:"edx-add-btn",attrs:{"text-color":"white",label:"Add contact"},on:{click:function(s){t.isShowAddContactPopup=!0}}})],1),a("q-separator",{staticClass:"q-mt-sm"}),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-10"},[a("q-table",{staticClass:"no-shadow overflow-auto my-sticky-column-table",attrs:{data:t.data,columns:t.columns,"row-key":"id","hide-bottom":"",pagination:t.pagination},on:{"update:pagination":function(s){t.pagination=s}},scopedSlots:t._u([{key:"body",fn:function(s){return[a("q-tr",{attrs:{props:s}},[a("q-td",{key:"firstName",attrs:{props:s}},[a("div",{staticClass:"cursor-pointer"},[t._v("\n                                "+t._s(s.row.first_name)+"\n                            ")])]),a("q-td",{key:"lastName",attrs:{props:s}},[a("div",{staticClass:"cursor-pointer"},[t._v("\n                                "+t._s(s.row.last_name)+"\n                            ")])]),a("q-td",{key:"title",attrs:{props:s}},[a("div",{staticClass:"cursor-pointer"},[t._v("\n                                "+t._s(s.row.title)+"\n                            ")])]),a("q-td",{key:"department",attrs:{props:s}},[a("div",{staticClass:"cursor-pointer"},[t._v("\n                                "+t._s(s.row.department)+"\n                            ")])]),a("q-td",{key:"phone",attrs:{props:s}},[a("div",{staticClass:"cursor-pointer"},[t._v("\n                                "+t._s(s.row.phone)+"\n                            ")])]),a("q-td",{key:"email",attrs:{props:s}},[a("div",{staticClass:"cursor-pointer"},[t._v("\n                                "+t._s(s.row.email)+"\n                            ")])]),a("q-td",{key:"action",attrs:{props:s}},[a("q-fab",{attrs:{padding:"xs",color:"purple",icon:"keyboard_arrow_up",direction:"up"}},[a("q-fab-action",{staticClass:"q-mr-sm",attrs:{icon:"edit",color:"blue",size:"sm","no-caps":"",round:""},on:{click:function(a){return t.openEditContactPopup(s.row)}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle",offset:[10,10],"transition-show":"flip-right","transition-hide":"flip-left"}},[a("strong",[t._v("Edit")])])],1),a("q-fab-action",{attrs:{icon:"delete_forever",color:"red",size:"sm","no-caps":"",round:""},on:{click:function(a){t.isDeleteContactPopup=!0,t.contacts=s.row}}},[a("q-tooltip",{attrs:{anchor:"top middle",self:"bottom middle",offset:[10,10],"transition-show":"flip-right","transition-hide":"flip-left"}},[a("strong",[t._v("Delete")])])],1)],1)],1)],1)]}}])})],1)]),a("dialog-draggable",{attrs:{modelDialog:t.isShowAddContactPopup,title:"Contact Info"},on:{onHide:function(s){t.isShowAddContactPopup=!1}}},[a("div",{staticClass:"q-pa-md"},[a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("First Name")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.first_name,callback:function(s){t.$set(t.contacts,"first_name",s)},expression:"contacts.first_name"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("Last Name")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.last_name,callback:function(s){t.$set(t.contacts,"last_name",s)},expression:"contacts.last_name"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("Title")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.title,callback:function(s){t.$set(t.contacts,"title",s)},expression:"contacts.title"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("Department")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.department,callback:function(s){t.$set(t.contacts,"department",s)},expression:"contacts.department"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("Address Line 1")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.address_line_1,callback:function(s){t.$set(t.contacts,"address_line_1",s)},expression:"contacts.address_line_1"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("Address Line 2")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.address_line_2,callback:function(s){t.$set(t.contacts,"address_line_2",s)},expression:"contacts.address_line_2"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-7 q-pr-sm"},[a("div",{staticClass:"text-subtitle2"},[t._v("City")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.city,callback:function(s){t.$set(t.contacts,"city",s)},expression:"contacts.city"}})],1),a("div",{staticClass:"col-md-3 q-pr-sm"},[a("div",{staticClass:"text-subtitle2"},[t._v("State")]),a("q-select",{attrs:{outlined:"",dense:"",options:t.states},model:{value:t.contacts.state,callback:function(s){t.$set(t.contacts,"state",s)},expression:"contacts.state"}})],1),a("div",{staticClass:"col-md-2 q-pr-sm"},[a("div",{staticClass:"text-subtitle2"},[t._v("Zip")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.postal_code,callback:function(s){t.$set(t.contacts,"postal_code",s)},expression:"contacts.postal_code"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-4"},[a("div",{staticClass:"text-subtitle2"},[t._v("Phone")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.phone,callback:function(s){t.$set(t.contacts,"phone",s)},expression:"contacts.phone"}})],1),a("div",{staticClass:"col-md-4 q-pl-sm"},[a("div",{staticClass:"text-subtitle2"},[t._v("Ext")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.extension,callback:function(s){t.$set(t.contacts,"extension",s)},expression:"contacts.extension"}})],1),a("div",{staticClass:"col-md-4 q-pl-sm"},[a("div",{staticClass:"text-subtitle2"},[t._v("Fax")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.fax,callback:function(s){t.$set(t.contacts,"fax",s)},expression:"contacts.fax"}})],1)]),a("div",{staticClass:"row q-mb-sm"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"text-subtitle2"},[t._v("Email")]),a("q-input",{attrs:{outlined:"",dense:""},model:{value:t.contacts.email,callback:function(s){t.$set(t.contacts,"email",s)},expression:"contacts.email"}})],1)])]),a("q-separator"),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"Cancel",color:"primary"}}),t.edit?a("q-btn",{attrs:{flat:"",label:"Save",color:"primary"},on:{click:t.editContact}}):a("q-btn",{attrs:{flat:"",label:"Add",color:"primary"},on:{click:t.addContact}})],1)],1),a("q-dialog",{attrs:{persistent:""},model:{value:t.isDeleteContactPopup,callback:function(s){t.isDeleteContactPopup=s},expression:"isDeleteContactPopup"}},[a("q-card",[a("q-card-section",{staticClass:"row items-center"},[a("span",{staticClass:"q-ml-sm"},[t._v("Are you sure to delete this Contact?")])]),a("q-card-actions",{attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",label:"No, thanks",color:"primary"}}),a("q-btn",{attrs:{label:"Yes",color:"red"},on:{click:t.removeContact}})],1)],1)],1)],1)},j=[],$=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("c47a")),N=a.n($);function O(t,s){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);s&&(e=e.filter((function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable}))),a.push.apply(a,e)}return a}function E(t){for(var s=1;s<arguments.length;s++){var a=null!=arguments[s]?arguments[s]:{};s%2?O(Object(a),!0).forEach((function(s){N()(t,s,a[s])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):O(Object(a)).forEach((function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(a,s))}))}return t}var z={components:{dialogDraggable:C["a"]},data:function(){return{data:[],columns:[{name:"firstName",align:"left",label:"First Name",field:"firstName",sortable:!0},{name:"lastName",align:"left",label:"Last Name",field:"lastName",sortable:!0},{name:"title",align:"left",label:"Title",field:"title",sortable:!0},{name:"department",align:"left",label:"Department",field:"department",sortable:!0},{name:"phone",align:"left",label:"Phone",field:"phone",sortable:!0},{name:"email",align:"left",label:"Email",field:"email",sortable:!0},{name:"action",align:"right",label:"Actions",field:"action",sortable:!0,style:"width: 30px"}],pagination:{rowsPerPage:1e3},isShowAddContactPopup:!1,isDeleteContactPopup:!1,edit:!1,states:[],contacts:{first_name:"",last_name:"",title:"",department:"",address_line_1:"",address_line_2:"",city:"",state:"",postal_code:"",phone:"",extension:"",fax:"",email:""}}},methods:{openEditContactPopup:function(t){console.log("contact",t),this.isShowAddContactPopup=!0,this.contacts=E({},t),this.edit=!0},getSchoolContacts:function(){var t=this,s={method:"GET",url:d["a"].getSchoolContacts+this.$route.params.id,headers:{Accept:"application/json"}};r()(s).then((function(s){for(var a=s.data.contactsInfo,e=[],i=0;i<a.length;i++){var o,n;a[i].state={id:null===(o=a[i].state)||void 0===o?void 0:o.id,label:null===(n=a[i].state)||void 0===n?void 0:n.name},e.push(a[i])}t.data=e}))},addContact:function(){var t=this,s={token:localStorage.getItem("access-token"),first_name:this.contacts.first_name,last_name:this.contacts.last_name,title:this.contacts.title,department:this.contacts.department,phone:this.contacts.phone,extension:this.contacts.extension,fax:this.contacts.fax,address_line_1:this.contacts.address_line_1,address_line_2:this.contacts.address_line_2,city:this.contacts.city,state_id:this.contacts.state.id,postal_code:this.contacts.postal_code,email:this.contacts.email},a={method:"POST",url:d["a"].addSchoolContact+this.$route.params.id,headers:{Accept:"application/json"},data:s};r()(a).then((function(s){var a=s.data.contact;a.state={id:a.state.id,label:a.state.name},t.data.push(a),t.$q.notify({message:"Contact addes successfully!",type:"positive"}),t.isShowAddContactPopup=!1}))},editContact:function(){var t=this,s={token:localStorage.getItem("access-token"),first_name:this.contacts.first_name,last_name:this.contacts.last_name,title:this.contacts.title,department:this.contacts.department,phone:this.contacts.phone,extension:this.contacts.extension,fax:this.contacts.fax,address_line_1:this.contacts.address_line_1,address_line_2:this.contacts.address_line_2,city:this.contacts.city,state_id:this.contacts.state.id,postal_code:this.contacts.postal_code,email:this.contacts.email},a={method:"PUT",url:d["a"].editSchoolContact+this.contacts.id,headers:{Accept:"application/json"},data:s};r()(a).then((function(s){t.getSchoolContacts(),t.$q.notify({message:"Contact Edited successfully!",type:"positive"}),t.isShowAddContactPopup=!1}))},getStates:function(){var t=this,s={method:"GET",url:d["a"].getStates,headers:{Accept:"application/json"}};r()(s).then((function(s){for(var a=s.data.states,e=[],i=0;i<a.length;i++)e.push({id:a[i].id,label:a[i].name});t.states=e}))},removeContact:function(){var t=this,s={method:"DELETE",url:d["a"].deleteSchoolContact+this.contacts.id+"/"+this.$route.params.id,headers:{Accept:"application/json"}};r()(s).then((function(s){var a=t.data.indexOf(t.contacts);t.data.splice(a,1),t.$q.notify({message:"Contact Deleted!",type:"positive"}),t.isDeleteContactPopup=!1}))}},created:function(){this.getSchoolContacts(),this.getStates()},watch:{isShowAddContactPopup:function(t){t||(this.contacts={first_name:"",last_name:"",title:"",department:"",address_line_1:"",address_line_2:"",city:"",state:"",states:[],zip:"",phone:"",extension:"",fax:"",email:""},this.edit=!1)}}},I=z,T=Object(u["a"])(I,P,j,!1,null,null,null),L=T.exports,F={components:{SchoolInformation:b,Campuses:g,SchoolYearParameter:D,SchoolContacts:L},data:function(){return{tab:"1"}},computed:{schoolName:function(){return this.$route.query.name}},created:function(){console.log("nested",this.$route.params.id)}},G=F,Y=Object(u["a"])(G,e,i,!1,null,null,null);s["default"]=Y.exports}}]);