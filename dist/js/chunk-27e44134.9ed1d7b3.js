(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-27e44134"],{"0c17":function(e,t,o){"use strict";var a=o("4d2c");o.n(a).a},"4d2c":function(e,t,o){},6750:function(e,t,o){},"7e58":function(e,t,o){},"900f":function(e,t,o){},9421:function(e,t,o){"use strict";var a=o("900f");o.n(a).a},"9dfa":function(e,t,o){"use strict";o.r(t);o("d81d"),o("4795"),o("96cf");var a=o("1da1"),i=o("d4ec"),r=o("bee2"),l=o("99de"),n=o("7e84"),s=o("262e"),c=o("9ab4"),p=(o("6cc5"),o("e11e")),u=(o("20d6"),o("5fbf"),o("60a3")),m=o("0cc6"),d=o("f94a"),h=o("784f"),f=o("93bf"),y=o.n(f),g=(o("99af"),o("0d03"),o("b680"),o("d3b7"),o("25f0"),function(){function t(e){Object(i.a)(this,t),this.plateParam=e,this.svg=""}return Object(r.a)(t,[{key:"generateSvg",value:function(){var e=this.plateParam.features,t=this.plateParam.plateStyle,o="";o+='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '.concat(e.xSize," ").concat(e.ySize,'">');var a="ABCDEFGHIJKLMNOPQRSTUVWXYZ";t.color.total&&(t.color.border=t.color.total,t.color.well=t.color.total,t.color.sideLabel=t.color.total,t.color.wellLabel=t.color.total),t.offset.xSideLabel||(t.offset.xSideLabel=[0,0]),t.offset.ySideLabel||(t.offset.ySideLabel=[0,0]),t.offset.wellLabel||(t.offset.wellLabel=[0,0]),o+="\n  <style>\n      .border{stroke: ".concat(t.color.border?t.color.border:"green",";\n        fill:  ").concat(t.fillColor.well?t.fillColor.well:"transparent",";\n        stroke-width: ").concat(t.weight.border?t.weight.border:1,";}\n      .well{stroke: ").concat(t.color.well?t.color.well:"green",";\n        fill: ").concat(t.fillColor.well?t.fillColor.well:"transparent",";\n        stroke-width: ").concat(t.weight.well?t.weight.well:.2,";}\n      .small{fill:").concat(t.color.wellLabel?t.color.wellLabel:"green",";text-anchor:middle;\n        font-size:").concat(t.weight.wellLabel?t.weight.wellLabel:2,"px;}\n      .big{fill:").concat(t.color.sideLabel?t.color.sideLabel:"green",";text-anchor:middle;\n        font-size:").concat(t.weight.sideLabel?t.weight.sideLabel:6,"px;}\n  </style>\n      "),o+='<polyline class="border" points="1 87, 1 3, 125 3, 129 7, 129 87, 0.5 87"/>\n  ';for(var i=e.xSize/2,r=e.ySize/2,l=0;l<e.xHolesNum;l++)for(var n=e.xOffset+(l-e.xHolesNum/2+.5)*e.xHoleSize,s=0;s<e.yHolesNum;s++){var c=e.yOffset+(s-e.yHolesNum/2+.5)*e.yHoleSize,p=0,u=0;0===s&&(p=i+n+t.offset.ySideLabel[0],u=r+c+t.offset.ySideLabel[1],o+='<text class="big" x="'.concat(p.toFixed(3),'" y="').concat(u.toFixed(3),'">').concat(l+1,"</text>\n        ")),0===l&&(p=i+n+t.offset.xSideLabel[0],u=r+c+t.offset.xSideLabel[1],o+='<text class="big" x="'.concat(p.toFixed(3),'" y="').concat(u.toFixed(3),'">').concat(a[s],"</text>\n        ")),p=i+n+t.offset.wellLabel[0],u=r+c+t.offset.wellLabel[1],o+='<text class="small" ',o+=' x="'.concat(p.toFixed(3),'" y="').concat(u.toFixed(3),'">').concat(a[s]).concat(l+1,"</text>\n      "),u=r+c,o+='<circle class="well" cx="'.concat((p=i+n).toFixed(3),'" cy="').concat(u.toFixed(3),'" r="').concat(e.rHoleSize,'"/>\n      ')}return o+="</svg>"}},{key:"getWellCenters",value:function(){for(var e=[],t=this.plateParam.features,o=0;o<t.xHolesNum;o++)for(var a=0;a<t.yHolesNum;a++){var i=this.wellNumToCenter(o,a);e.push(i)}return e}},{key:"wellNumToCenter",value:function(e,t){var o={x:0,y:0},a=this.plateParam.features;return o.x=e*a.xHoleSize-(a.xOffset+a.xHoleSize*(a.xHolesNum/2-.5)),o.y=-t*a.yHoleSize+(a.yOffset+a.yHoleSize*(a.yHolesNum/2-.5)),o}},{key:"getNearistWell",value:function(e){var t=this.plateParam.features,o=Math.round((e.x-t.xOffset)/t.xHoleSize+t.xHolesNum/2-.5);o=(o=-1<o?o:0)<t.xHolesNum?o:t.xHolesNum;var a=Math.round(-(e.y-t.yOffset)/t.yHoleSize+t.yHolesNum/2-.5),i={isInWell:!1,xNum:o,yNum:a=(a=-1<a?a:0)<t.yHolesNum?a:t.yHolesNum,center:{x:0,y:0},rWell:t.rHoleSize};i.center=this.wellNumToCenter(i.xNum,i.yNum);var r=Math.sqrt(Math.pow(e.x-i.center.x,2)+Math.pow(e.y-i.center.y,2));return i.isInWell=r<t.rHoleSize,i}}]),t}()),b=o("2de2"),x=o("fd62"),v=o("90e8"),w=o("83c9"),S=function(){function e(){Object(i.a)(this,e)}return Object(r.a)(e,[{key:"initPlatesFromJson",value:function(e,t){this.platesData=t,this.map=e,this.plate=new g(this.platesData)}},{key:"drawBorder",value:function(){if(this.platesData&&this.map){var e=this.platesData.features.border;this.borderLayer=p.polygon(e.points,{color:"#00CC00",weight:3,opacity:1,fill:!1}).addTo(this.map)}}},{key:"drawWells",value:function(){if(this.platesData&&this.map){var e=this.platesData.features;this.wellsLayer=p.layerGroup().addTo(this.map);for(var t=0;t<e.xHolesNum;t++)for(var o=e.xOffset+t*e.xHoleSize,a=0;a<e.yHolesNum;a++){var i=-e.yOffset-a*e.yHoleSize;p.circle([i,o],{radius:e.rHoleSize,color:"#0C0",weight:1,fill:!1}).addTo(this.wellsLayer)}}}},{key:"drawSvgPlate",value:function(){if(this.platesData&&this.plate){var e=this.plate.generateSvg(),t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.innerHTML+=e;var o=[[-this.platesData.features.ySize/2,-this.platesData.features.xSize/2],[this.platesData.features.ySize/2,this.platesData.features.xSize/2]];this.map&&p.svgOverlay(t,o).addTo(this.map)}}},{key:"initMotorPostionMark",value:function(){var e=b.j,t=void 0;return this.map&&(this.motorMarker=p.marker([0,0],{icon:e,zIndexOffset:100}).addTo(this.map),t=this.motorMarker),t}},{key:"updateMotorPositionMark",value:function(e,t){if(this.motorMarker&&e&&void 0!==e.x&&void 0!==e.y&&(this.motorMarker.setLatLng([e.y,e.x]),this.map)){var o=this.map.latLngToContainerPoint([e.y,e.x]);t&&(t.style.left=o.x.toString()+"px",t.style.top=(o.y-16).toString()+"px")}}},{key:"drawPlateOnMap",value:function(){this.drawSvgPlate()}},{key:"drawNearestWellOnMap",value:function(e){if(this.platesData&&this.map){var t=this.platesData.features;this.nearestWellLayer=p.circle([e.center.y,e.center.x],{radius:t.rHoleSize,stroke:!1,fill:!0,fillColor:"yellow",fillOpacity:.6}).addTo(this.map)}}},{key:"drawMotorMarkerOnMap",value:function(e){var t=b.j;this.map&&p.marker(e,{icon:t}).addTo(this.map)}},{key:"drawTargetMarkerOnMap",value:function(e,t){var o=1<arguments.length&&void 0!==t&&t,a=b.m;if(this.map){if(o&&this.plate)e=this.plate.getNearistWell(e).center;var i=e.x.toFixed(3),r=e.y.toFixed(3),l="目标位置:<br>X = ".concat(i," mm</br>Y = ").concat(r," mm");this.targetMarker?this.targetMarker.setLatLng([e.y,e.x]).setPopupContent(l):this.targetMarker=p.marker([e.y,e.x],{icon:a}).addTo(this.map).bindPopup(l).openPopup()}return e}},{key:"drawImageOnMap",value:function(e,t){if(this.map){void 0===t&&(t={x:0,y:0});var o=Object(x.a)(e).S,a=new p.LatLngBounds([[.1+t.y,.15+t.x],[-.1+t.y,-.15+t.x]]);return p.imageOverlay(o,a,{opacity:1,zIndex:1e3,interactive:!0}).addTo(this.map)}}},{key:"drawImageListOnMap",value:function(o){var a=this;if(this.map&&this.plate)for(var i=this.plate.getWellCenters(),e=function(e){var t=a.drawImageOnMap(o[e],i[e%i.length]);t&&t.on("click",function(){h.a.setState({mapAction:w.a.ReviewImage,isReviewMapHidden:!1,isMainMapHidden:!0,isMainMapImageUpdate:!1}),setTimeout(function(){v.b.$emit(v.a.reviewImage,o[e])},20)})},t=0;t<o.length&&t<i.length;t++)e(t)}}]),e}(),M=[{plateId:0,isHolePlates:!0,features:{plateName:"384",company:"Corning",comment:"",totalHoles:384,xSize:130,ySize:90,xHolesNum:24,yHolesNum:16,xOffset:0,yOffset:0,xHoleSize:4.8,yHoleSize:4.8,rHoleSize:2.2,imageUrl:"",border:{shape:"polygon",points:[[-43,-64],[-43,64],[40,64],[43,61],[43,-64]]}},plateStyle:{color:{total:"green",border:"green",well:"green",sideLabel:"green",wellLabel:"green"},weight:{border:1,well:.15,sideLabel:3,wellLabel:1},fillColor:{base:"",well:""},offset:{xSideLabel:[-3.5,1],ySideLabel:[0,-2.5],wellLabel:[2.3,2.6]}}},{plateId:0,isHolePlates:!0,features:{plateName:"96",company:"Corning",comment:"",totalHoles:96,xSize:130,ySize:90,xHolesNum:12,yHolesNum:8,xOffset:0,yOffset:0,xHoleSize:9,yHoleSize:9,rHoleSize:4,imageUrl:"",border:{shape:"polygon",points:[[-43,-64],[-43,64],[40,64],[43,61],[43,-64]]}},plateStyle:{color:{total:"green",border:"green",well:"green",sideLabel:"green",wellLabel:"green"},weight:{border:1,well:.2,sideLabel:6,wellLabel:2},fillColor:{base:"",well:""},offset:{xSideLabel:[-7,2],ySideLabel:[-.5,-5],wellLabel:[4,5]}}},{plateId:1,isHolePlates:!0,features:{plateName:"24",company:"Corning",comment:"",totalHoles:24,xSize:130,ySize:90,xHolesNum:6,yHolesNum:4,xOffset:0,yOffset:0,xHoleSize:19.6,yHoleSize:19.6,rHoleSize:7.75,imageUrl:"",border:{shape:"polygon",points:[[-43,-64],[-43,64],[40,64],[43,61],[43,-64]]}},plateStyle:{color:{total:"green",border:"green",well:"green",sideLabel:"green",wellLabel:"green"},weight:{border:1,well:.3,sideLabel:5,wellLabel:3},fillColor:{base:"",well:""},offset:{xSideLabel:[-10,2],ySideLabel:[-.5,-8],wellLabel:[7,8]}}},{plateId:2,isHolePlates:!0,features:{plateName:"6",company:"Corning",comment:"",totalHoles:6,xSize:130,ySize:90,xHolesNum:3,yHolesNum:2,xOffset:0,yOffset:0,xHoleSize:40,yHoleSize:40,rHoleSize:16,imageUrl:"",border:{shape:"polygon",points:[[-43,-64],[-43,64],[40,64],[43,61],[43,-64]]}},plateStyle:{color:{total:"green",border:"green",well:"green",sideLabel:"green",wellLabel:"green"},weight:{border:1,well:.5,sideLabel:5,wellLabel:4},fillColor:{base:"",well:""},offset:{xSideLabel:[-19,2],ySideLabel:[-.5,-17],wellLabel:[13,16]}}},{plateId:3,isHolePlates:!0,features:{plateName:"12",company:"Corning",comment:"",totalHoles:12,xSize:130,ySize:90,xHolesNum:4,yHolesNum:3,xOffset:0,yOffset:0,xHoleSize:25,yHoleSize:25,rHoleSize:11,imageUrl:"",border:{shape:"polygon",points:[[-43,-64],[-43,64],[40,64],[43,61],[43,-64]]}},plateStyle:{color:{total:"green",border:"green",well:"green",sideLabel:"green",wellLabel:"green"},weight:{border:1,well:.5,sideLabel:5,wellLabel:4},fillColor:{base:"",well:""},offset:{xSideLabel:[-14,2],ySideLabel:[-.5,-12],wellLabel:[9,12]}}},{plateId:4,isHolePlates:!0,features:{plateName:"4",company:"Corning",comment:"",totalHoles:4,xSize:130,ySize:90,xHolesNum:2,yHolesNum:2,xOffset:0,yOffset:0,xHoleSize:38,yHoleSize:38,rHoleSize:18,imageUrl:"",border:{shape:"polygon",points:[[-43,-64],[-43,64],[40,64],[43,61],[43,-64]]}},plateStyle:{color:{total:"green",border:"green",well:"green",sideLabel:"green",wellLabel:"green"},weight:{border:1,well:.5,sideLabel:5,wellLabel:4},fillColor:{base:"",well:""},offset:{xSideLabel:[-21,2],ySideLabel:[-.5,-18.5],wellLabel:[15,18]}}},{plateId:48,isHolePlates:!0,features:{plateName:"4",company:"Corning",comment:"",totalHoles:48,xSize:130,ySize:90,xHolesNum:8,yHolesNum:6,xOffset:0,yOffset:0,xHoleSize:12,yHoleSize:12,rHoleSize:5,imageUrl:"",border:{shape:"polygon",points:[[-43,-64],[-43,64],[40,64],[43,61],[43,-64]]}},plateStyle:{color:{total:"green",border:"green",well:"green",sideLabel:"green",wellLabel:"green"},weight:{border:1,well:.5,sideLabel:5,wellLabel:2.5},fillColor:{base:"",well:""},offset:{xSideLabel:[-8,2],ySideLabel:[-.5,-6],wellLabel:[5,6]}}}],P=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(n.a)(t).apply(this,arguments))).isShow=!1,e.iconClose=m.a.mdiClose,e}return Object(s.a)(t,e),Object(r.a)(t,[{key:"mounted",value:function(){}},{key:"create",value:function(){}},{key:"closePopup",value:function(){this.isShow=!1}},{key:"openPopup",value:function(){this.isShow=!0}}]),t}(u.c);Object(c.a)([Object(u.b)()],P.prototype,"motorPosition",void 0);var z=P=Object(c.a)([u.a],P),H=(o("9421"),o("2877")),L=o("6544"),k=o.n(L),C=o("8336"),O=o("132d"),N=Object(H.a)(z,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticClass:"popup-container"},[o("div",{staticClass:"wrap"},[o("div",{staticClass:"popup caption grey--text text--darken-2"},[e._v(" 当前位置"),o("br"),e._v("X:"+e._s(e.motorPosition.x)+" Y:"+e._s(e.motorPosition.y)+" "),o("v-btn",{staticClass:"close-icon",attrs:{icon:"","x-small":""},on:{click:e.closePopup}},[o("v-icon",{attrs:{size:"16"}},[e._v(e._s(e.iconClose))])],1)],1)])])},[],!1,null,"c1100348",null),j=N.exports;k()(N,{VBtn:C.a,VIcon:O.a});var I=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(n.a)(t).apply(this,arguments))).icon=m.a,e.iconFullscreen=e.icon.mdiFullscreen,e.iconClose=e.icon.mdiClose,e.iconHome=e.icon.mdiHomeOutline,e.iconGps=e.icon.mdiCrosshairsGps,e.iconGpsFind=e.icon.mdiCrosshairsQuestion,e.iconGpsCross=e.icon.mdiCrosshairs,e.iconVertical=e.icon.mdiArrowExpandVertical,e.motorPositonElement=document.getElementById("motor-popup"),e.isMotorPopupShow=!1,e.motorPosition={},e.plateMapCursorStyle="",e}var o;return Object(s.a)(t,e),Object(r.a)(t,[{key:"created",value:function(){this.isFirstShow=!0}},{key:"mounted",value:function(){var e=this;this.map=p.map("plate-map",{crs:p.CRS.Simple,minZoom:0,maxZoom:16,zoom:3,zoomSnap:.1,zoomDelta:2,zoomControl:!1,attributionControl:!1,center:[0,0]}),this.plateMap=new S,this.plateMap.initPlatesFromJson(this.map,M[1]),this.plateMap.drawPlateOnMap(),this.motorPosition={},this.motorPositionMark=this.plateMap.initMotorPostionMark(),this.motorPositionMark&&this.motorPositionMark.on("click",function(){e.openMotorPopup()}),this.motorPositonElement=document.getElementById("motor-popup"),this.motorPositonElement&&this.plateMap.updateMotorPositionMark(this.motorPosition,this.motorPositonElement),this.plateMap.map&&this.plateMap.map.on("move",function(){e.plateMap&&e.motorPositonElement&&e.plateMap.updateMotorPositionMark(e.motorPosition,e.motorPositonElement)}),d.d({x:10,y:10,z:1}),setInterval(function(){h.a.isPlateMapShow&&e.getMotorPosition()},300)}},{key:"openMotorPopup",value:function(){this.$refs.motorPopup.openPopup()}},{key:"setPlateMapMax",value:function(){var o=this;if(this.map){this.map.off("click"),this.plateMapCursorStyle="cursor: auto",this.map.invalidateSize();var a=this.map.getCenter(),i=this.map.getZoom(),r=this.map.getSize(),e=document.getElementById("map-container");if(null!==document&&(y.a.isEnabled&&(y.a.isFullscreen?y.a.exit():y.a.request(e)),y.a.isEnabled))var l=setInterval(function(){if(o.map){o.map.invalidateSize();var e=o.map.getSize();if(e.x!==r.x){var t=e.y/r.y;t=Math.log(t)/Math.log(2)+i,o.map.setView(a,t),clearInterval(l)}r.x=e.x}},200)}}},{key:"getMotorPosition",value:(o=Object(a.a)(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a(["X","Y","Z"]);case 2:(t=e.sent)&&JSON.stringify(t)!==JSON.stringify(this.motorPosition)&&(this.motorPosition=t,this.plateMap&&this.motorPositonElement&&this.plateMap.updateMotorPositionMark(this.motorPosition,this.motorPositonElement));case 4:case"end":return e.stop()}},e,this)})),function(){return o.apply(this,arguments)})},{key:"setPlateMapClose",value:function(){h.a.setState({isPlateMapShow:!1})}},{key:"setPlateMapHome",value:function(){if(this.map){this.map.off("click"),this.plateMapCursorStyle="cursor: auto",this.map.invalidateSize();var e=this.map.getSize().x,t=this.map.getSize().y,o=130/90<e/t?t/90:e/130;if(o=Math.log(o)/Math.log(2),this.map.setView([0,0],o),this.plateMap){var a=h.a.imageList;this.plateMap.drawImageListOnMap(a)}}}},{key:"setPlateMapExtendVirtical",value:function(){if(this.map){this.map.off("click"),this.plateMapCursorStyle="cursor: auto",this.map.invalidateSize();var e=this.map.getSize().y/90;e=Math.log(e)/Math.log(2),this.map.setView([0,0],e)}}},{key:"setTargetPosition",value:function(o){var a=this;this.plateMapCursorStyle=o?"cursor: cell":"cursor: crosshair",this.map&&this.map.on("click",function(e){if(a.plateMap&&a.plateMap.platesData){var t=a.plateMap.drawTargetMarkerOnMap({x:e.latlng.lng,y:e.latlng.lat},o);d.b({x:t.x,y:t.y})}})}},{key:"findMotorPosition",value:function(){if(this.map&&this.motorPosition){void 0!==this.motorPosition.x&&void 0!==this.motorPosition.y&&this.map.setView([this.motorPosition.y,this.motorPosition.x],5)}}},{key:"isShow",get:function(){var e=this;return!!h.a.isPlateMapShow&&(this.isFirstShow&&(setTimeout(function(){e.setPlateMapHome()},10),this.isFirstShow=!1),!0)}}]),t}(u.c),T=I=Object(c.a)([Object(u.a)({components:{MotorPopupView:j}})],I),_=(o("ee7c"),o("0c17"),o("5530")),E=(o("7e58"),o("3860")),F=o("a9ad"),D=o("58df"),B=Object(D.a)(E.a,F.a).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes:function(){return Object(_.a)({},E.a.options.computed.classes.call(this),{"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile},this.themeClasses)}},methods:{genData:function(){var e=this.setTextColor(this.color,Object(_.a)({},E.a.options.methods.genData.call(this)));return this.group?e:this.setBackgroundColor(this.backgroundColor,e)}}}),V=o("b0af"),R=Object(H.a)(T,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"plate-map-container"},[o("v-card",{staticClass:"mx-auto map-card"},[o("div",{staticClass:"card-container",attrs:{id:"map-container"}},[o("div",{staticClass:"map-container"},[o("div",{staticClass:"plate-map",style:t.plateMapCursorStyle,attrs:{id:"plate-map"}}),o("motor-popup-view",{ref:"motorPopup",staticClass:"motor-popup",attrs:{id:"motor-popup",motorPosition:t.motorPosition}}),o("div",{staticClass:"map-action-btn-container"},[o("v-btn-toggle",{staticClass:"map-action-btn",staticStyle:{"flex-direction":"column"},attrs:{dense:""}},[o("v-btn",{staticStyle:{"min-width":"24px"},attrs:{icon:"",height:"30px",width:"30px"},on:{click:t.setPlateMapMax}},[o("v-icon",{attrs:{size:"16",color:"#333"}},[t._v(t._s(t.iconFullscreen))])],1),o("v-btn",{staticStyle:{"min-width":"24px"},attrs:{icon:"",height:"30px",width:"30px"},on:{click:t.setPlateMapHome}},[o("v-icon",{attrs:{size:"16",color:"#333"}},[t._v(t._s(t.iconHome))])],1),o("v-btn",{staticStyle:{"min-width":"24px"},attrs:{icon:"",height:"30px",width:"30px"},on:{click:t.setPlateMapExtendVirtical}},[o("v-icon",{attrs:{size:"16",color:"#333"}},[t._v(t._s(t.iconVertical))])],1),o("v-btn",{staticStyle:{"min-width":"24px"},attrs:{icon:"",height:"30px",width:"30px"},on:{click:function(e){return t.setTargetPosition(!1)}}},[o("v-icon",{attrs:{size:"16",color:"#333"}},[t._v(t._s(t.iconGps))])],1),o("v-btn",{staticStyle:{"min-width":"24px"},attrs:{icon:"",height:"30px",width:"30px"},on:{click:function(e){return t.setTargetPosition(!0)}}},[o("v-icon",{attrs:{size:"16",color:"#333"}},[t._v(t._s(t.iconGpsCross))])],1),o("v-btn",{staticStyle:{"min-width":"24px"},attrs:{icon:"",height:"30px",width:"30px"},on:{click:t.findMotorPosition}},[o("v-icon",{attrs:{size:"16",color:"#333"}},[t._v(t._s(t.iconGpsFind))])],1)],1)],1)],1)]),o("v-btn",{staticClass:"fullscreen-icon",staticStyle:{"min-width":"24px","background-color":"white"},attrs:{icon:"",height:"24px",width:"24px",color:"red"},on:{click:t.setPlateMapClose}},[o("v-icon",{attrs:{small:"",color:"red"}},[t._v(t._s(t.icon.mdiCloseCircle))])],1)],1)],1)},[],!1,null,"c1e9a050",null);t.default=R.exports;k()(R,{VBtn:C.a,VBtnToggle:B,VCard:V.a,VIcon:O.a})},ee7c:function(e,t,o){"use strict";var a=o("6750");o.n(a).a},f94a:function(e,t,o){"use strict";o.d(t,"a",function(){return s}),o.d(t,"b",function(){return p}),o.d(t,"c",function(){return m}),o.d(t,"d",function(){return h});o("4160"),o("159b"),o("96cf");var a=o("1da1"),i=o("f727"),r=o("2de2");function l(){return n.apply(this,arguments)}function n(){return(n=Object(a.a)(regeneratorRuntime.mark(function e(t){var o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.post(r.a+"/motor",t,{timeout:r.n,headers:{"Content-Type":"application/json"}});case 2:return o=e.sent,e.abrupt("return",o.data);case 4:case"end":return e.stop()}},e)}))).apply(this,arguments)}function s(e){return c.apply(this,arguments)}function c(){return(c=Object(a.a)(regeneratorRuntime.mark(function e(t){var o,a,i,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=[],t.forEach(function(e){o.push({axis:e})}),a={action:"getPos",motorParam:o},e.next=5,l(a);case 5:return i=e.sent,r={},i.motorParam&&i.motorParam.forEach(function(e){"X"===e.axis&&(r.x=e.pos),"Y"===e.axis&&(r.y=e.pos),"Z"===e.axis&&(r.z=e.pos)}),e.abrupt("return",r);case 9:case"end":return e.stop()}},e)}))).apply(this,arguments)}function p(e){return u.apply(this,arguments)}function u(){return(u=Object(a.a)(regeneratorRuntime.mark(function e(t){var o,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=[],void 0!==t.x&&o.push({axis:"X",pos:t.x}),void 0!==t.y&&o.push({axis:"Y",pos:t.y}),void 0!==t.z&&o.push({axis:"Z",pos:t.z}),a={action:"goto",motorParam:o},e.next=7,l(a);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}},e)}))).apply(this,arguments)}function m(e){return d.apply(this,arguments)}function d(){return(d=Object(a.a)(regeneratorRuntime.mark(function e(t){var o,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=[],void 0!==t.x&&o.push({axis:"X",pos:t.x}),void 0!==t.y&&o.push({axis:"Y",pos:t.y}),void 0!==t.z&&o.push({axis:"Z",pos:t.z}),a={action:"move",motorParam:o},e.next=7,l(a);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}},e)}))).apply(this,arguments)}function h(e){return f.apply(this,arguments)}function f(){return(f=Object(a.a)(regeneratorRuntime.mark(function e(t){var o,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return o=[],void 0!==t.x&&o.push({axis:"X",param:{speed:t.x}}),void 0!==t.y&&o.push({axis:"Y",param:{speed:t.y}}),void 0!==t.z&&o.push({axis:"Z",param:{speed:t.z}}),a={action:"setParam",motorParam:o},e.next=7,l(a);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}},e)}))).apply(this,arguments)}}}]);