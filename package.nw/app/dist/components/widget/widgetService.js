"use strict";function init(){var e,t,r=require("../../lib/react.js"),o=(require("../../lib/react-dom.js"),require("../../cssStr/cssStr.js")),i=require("../../stores/webviewStores.js"),s=require("../../stores/windowStores.js"),n=require("../../actions/webviewActions.js"),a=require("../../stores/projectStores.js"),c=require("../../actions/projectActions.js"),p=(require("../../weapp/utils/tools.js"),require("./../../common/log/log.js")),d=require("../../common/widgetSdk/index.js"),u=(require("../../debugger/debugger.js"),require("../../config/dirConfig.js")),v=require("../../actions/windowActions.js"),h=require("../../config/config.js"),l=require("../../config/urlConfig.js"),_=require("../../common/request/request.js"),m=require("../../config/compileTypeConfig.js"),g=require("../appservice/port/port.js"),w=require("querystring"),f=require("../../config/webviewIDConfig.js"),S=f.DPSERVICE_WEBVIEW_ID,E=f.DPDEVTOOLS_WEBVIEW_ID,T=5e3,W="about:blank",y=function(e,t){v.showConfirm({content:e,callback:t})},b=r.createClass({displayName:"DevTools",getInitialState:function(){var e=i.getNetworkType();return{networkType:e}},showConsole:function(e){this.dpsWebview&&("string"==typeof e?this.dpsWebview.executeScript({code:"console.error(`"+e+"`)"}):this.dpsWebview.executeScript({code:"console.group(`"+e.group+"`)\n            console."+e.type+"("+("string"==typeof e.msg?"`"+e.msg+"`":JSON.stringify(e.msg))+")\n            console.groupEnd()\n            "}))},addContentScripts:function(e){e.addContentScripts([{name:"contentScripts",matches:["<all_urls>"],js:{files:["app/dist/contentscript/contentScript.js"]},run_at:"document_start"}])},checkIsNoneNetWork:function(){var e=i.getNetworkType();if("none"===e){try{this.dpsWebview&&this.dpsWebview.executeScript({code:'console.group("'+new Date+' 无网络状态模拟")\n              console.debug(`已开启无网络状态模拟，网络请求已被阻止；在工具栏切换网络状态，可恢复网络请求。`)\n              console.groupEnd()'})}catch(e){}return!0}},startGetWidgetData:function(){var e=this,r=this.props.project.compileType;if(r==m.widget||r==m.search){if(this.checkIsNoneNetWork())return void(t=setTimeout(this.startGetWidgetData,T));t&&(clearTimeout(t),t=null);var o=this.props.project,i=o.appid,s=o.ext_appid,n=o.platform,a=this.props.project.widgetOptions||{},c={appid:i,ext_appid:s,platform:n?1:0},d={appid:n&&s?s:i,cachekey:a.enable?a.cacheKey:""};return r!=m.search||(d.scene=1,d.query=a.wxaData,d.cachekey="",d.query)?void _({url:l.requestWidgetData+"?"+w.stringify(c),needToken:1,method:"post",body:JSON.stringify(d)},function(r,o,i){var s="";if(r)s="widgetService.js getwidgetData error "+r;else try{var n=JSON.parse(i),a=n.baseresponse&&n.baseresponse.errcode;if(0===a){var c=n.data,d=1e3*n.interval||T;e._postMsgToAS({eventName:"onDataPush",data:{data:c}}),t=setTimeout(e.startGetWidgetData,d)}else s="widgetService.js getWidgetData error with errcode "+a}catch(e){s="widgetService.js getWidgetData catch error "+e}s&&p.error(s)}):void this._showWeappError({group:"网络错误",type:"error",msg:"获取到的 query 为空，请重新选择搜索条件后重试"})}},_initport:function(e){var t=e.name;if(t==="webview"+S)this.port.init(e),this.port.postMessage("contentscript",{},"SHAKE_HANDS");else if(t==="webview"+E){if(this.devtoolsWebview.src===W)return;this.devtoolsPort.init(e),this.devtoolsPort=e,this.devtoolsPort.postMessage("contentscript",{},"SHAKE_HANDS")}},initRuntime:function(){chrome.runtime.onConnect.addListener(this._initport)},onMessage:function(e){var t=this;if("COMMAND_FROM_ASJS"===e.command){var r=e.sdkName;if("__open-tools-log"===r)return void nw.Shell.openItem(u.WeappLog);if("__open-tools-vendor"===r)return void nw.Shell.openItem(u.WeappVendor);if("DP_SERVICE_READY"===r)return i.setAppServiceReadyState(!0),void this.startGetWidgetData();if("send_app_data"===r)return void this.appdataPort.postMessage("",e,"SEND_APP_DATA");if("publish"===r)return void n.asPublish(e);if("__show-new-feature-check"===r)return void v.toggleNewFeatureCheckShowStatus(!0);if("__hhdmbadmb"===r){var o=require("path"),s=require("fs"),c=o.join(__dirname,"../../../html/ext.html");if(!s.existsSync(c))return;return void nw.Window.open("app/html/ext.html",{show:!0,width:1219,height:1219},function(e){})}return"__show-sys-info"===r?void chrome.processes.getProcessInfo([],!0,function(e){var r=0,o=[];for(var i in e){var s=e[i];s.privateMemory&&(r+=s.privateMemory),o.push({osProcessId:s.osProcessId,type:s.type,privateMemory:s.privateMemory/1024/1024})}r=r/1024/1024;var n=a.getRestartInfo();t.port.postMessage("contentscript",{memory:r,restartInfo:n,info:o},"SHOW_SYS_INFO")}):void d.exec(e,function(r,o){setTimeout(function(){t.port.postMessage("appservice",r,"GET_ASSDK_RES",e)},0)})}},newWindow:function(e){e.addEventListener("newwindow",function(e){var t=e.targetUrl;t&&("https://developers.google.com/web/tools/chrome-devtools/"===t&&(t="https://mp.weixin.qq.com/debug/wxadoc/dev/index.html"),nw.Window.open(t,{width:799,height:799}))})},_initDPService:function(){function e(){function t(){r.dpsWebview.removeEventListener("loadcommit",t),r.dpsWebview.showDevTools(!0,p)}r.devtoolsWebview.removeEventListener("loadcommit",e),r.dpsWebview.addEventListener("loadcommit",t),i.setAppServiceReadyState(!1),r.dpsWebview.src="http://"+o.hash+".widgetservice.open.weixin.qq.com/"+o.compileType}if(!this.dpsWebview){this.port=new g({onMessage:this.onMessage}),this.devtoolsPort=new g;var t=this.refs.container,r=this,o=this.props.project,n=this.dpsWebview=document.createElement("webview");n.style.cssText="height:0.01px;width:0.01px";var c=n.getUserAgent();n.setUserAgentOverride(c+" appservice webview/"+S),n.setAttribute("partition","persist:widget"),t.appendChild(n),this.addContentScripts(n);var p=this.devtoolsWebview=document.createElement("webview");p.className="devtools-content";var d=p.getUserAgent()+" dpsviewdevtools webview/"+E+" chromeRuntimeID/"+chrome.runtime.id;p.setUserAgentOverride(d),p.setAttribute("partition","persist:devtools"),t.appendChild(p),this.addContentScripts(p),this.newWindow(p),p.addEventListener("loadcommit",e),p.src=W,this.initRuntime(),this.onHeadersReceived(n),this.onBeforeSendHeaders(n),this.onErrorOccurred(n),this.onSyncMessage(n),this.onSyncDevtoolsMessage(p),i.on("POST_MSG_TOAS",this._postMsgToAS),a.on("RESTART_PROJECT",this._restart),s.on("SHOW_WIDGET_WEBVIEW_ERROR",this._showWeappError),i.on("SIMULATOR_NETWORK_CHANGE",this._onSimulatorNetworkChange),a.on("ON_COMPILE_CHANGE",this._onCompileTypeChange),i.on("GET_WIDGET_DATA",this.startGetWidgetData)}},_postMsgToAS:function(e){this.port.postMessage("appservice",e,"MSG_FROM_WEBVIEW")},_restart:function(e){e.compileType!==m.widget&&e.compileType!==m.search||(i.setAppServiceReadyState(!1),this.dpsWebview.src="http://"+e.hash+".widgetservice.open.weixin.qq.com/"+e.compileType)},onSyncDevtoolsMessage:function(e){e.addEventListener("dialog",function(e){var t=e.messageType||"",r=e.messageText;if("prompt"===t){var o=/^____sdk____/.test(r);if(o){var s=JSON.parse(r.replace(/^____sdk____/,"")),n=s.command;if("GET_GEO_SETTING"===n){var a=i.getGeoSetting();e.dialog.ok(JSON.stringify(a))}else"SET_GEO_SETTING"===n&&i.setGeoSetting(s.geoSetting)}}})},onSyncMessage:function(e){e.addEventListener("dialog",function(e){var t=e.messageType||"",r=e.messageText;if("prompt"===t){var o=/^____sdk____/.test(r);if(o){var i=JSON.parse(r.replace(/^____sdk____/,"")),s=i.command;if("COMMAND_FROM_ASJS"===s){var a=i.sdkName;d.exec(i,function(t,r){var o={to:"appservice",msg:t,command:"GET_ASSDK_RES",ext:i};e.dialog.ok(JSON.stringify(o)),"setStorageSync"!==a&&"clearStorageSync"!==a||n.upASData(r.appid,r.storage)})}}}else if("confirm"===t){e.preventDefault();var c=e.dialog;y(r,function(e){e?c.ok():c.cancel()})}})},onBeforeSendHeaders:function(t){var r=this,o=t.request,i=this.props.project;o.onBeforeSendHeaders.addListener(function(t){var o=t.url;if("main_frame"===t.type&&o.match(/\?load$/))return clearTimeout(e),e=setTimeout(function(){c.restart(r.props.project)},500),{cancel:!0};if(0!=o.indexOf("http://"+i.hash+".widgetservice.open.weixin.qq.com")&&"none"==r.state.networkType)return r.dpsWebview.executeScript({code:'console.group("'+new Date+' 无网络状态模拟")\n                console.debug(`已开启无网络状态模拟，网络请求已被阻止；在工具栏切换网络状态，可恢复网络请求。`)\n                console.groupEnd()'}),{cancel:!0};var s=t.requestHeaders||[],n=s.findIndex(function(e){return"cookie"===e.name.toLowerCase()});s.splice(n,1);for(var a=0;a<s.length;++a)"_Cookie"===s[a].name&&(s[a].name="Cookie"),"Referer"===s[a].name&&(s[a].value="https://servicewechat.com/"+i.appid+"/devtools/page-frame.html");return{requestHeaders:t.requestHeaders}},{urls:["<all_urls>"]},["blocking","requestHeaders"])},onHeadersReceived:function(e){var t=this,r=e.request;r.onHeadersReceived.addListener(function(e){var r=e.type;if("script"===r){var o=e.responseHeaders||[],i=o.find(function(e){return e.name===h.ES6_ERROR});i&&t._showWeappError({type:h.ES6_ERROR,message:i.value})}},{urls:["<all_urls>"]},["blocking","responseHeaders"])},onErrorOccurred:function(e){var t=this,r=e.request;r.onErrorOccurred.addListener(function(e){var r=e.type;if("main_frame"===r&&0===e.error.indexOf("net::")&&"net::ERR_BLOCKED_BY_CLIENT"!==e.error)return void t.port.postMessage("contentscript",e,"ERR_CONNECTION_RESET")},{urls:["<all_urls>"]})},_showWeappError:function(e){var t=this;if(/\?load$/.test(this.dpsWebview.src))return void this.showConsole(e);var r=0,o=setInterval(function(){var i=t.dpsWebview.src||"";/\?load$/.test(i)?(t.showConsole(e),clearInterval(o)):(r++,20===r&&clearInterval(o))},500)},_onSimulatorNetworkChange:function(e){this.setState({networkType:e}),this._postMsgToAS({eventName:"onNetworkStatusChange",data:{networkType:e,isConnected:"none"!=e}})},_onCompileTypeChange:function(e){e!==m.widget&&e!==m.search||!this.dpsWebview||this._restart(this.props.project)},componentWillReceiveProps:function(e){e.show!==m.widget&&e.show!==m.search||this._initDPService()},componentDidMount:function(){},componentWillUnmount:function(){this.removeWebview(),i.removeListener("POST_MSG_TOAS",this._postMsgToAS),a.removeListener("RESTART_PROJECT",this._restart),s.removeListener("SHOW_WIDGET_WEBVIEW_ERROR",this._showWeappError),i.removeListener("SIMULATOR_NETWORK_CHANGE",this._onSimulatorNetworkChange),a.removeListener("ON_COMPILE_CHANGE",this._onCompileTypeChange),i.removeListener("GET_WIDGET_DATA",this.startGetWidgetData),chrome.runtime.onConnectExternal.removeListener(this._externalPort),chrome.runtime.onConnect.removeListener(this._initport)},removeWebview:function(){this.devtoolsWebview&&this.devtoolsWebview.remove(),this.dpsWebview&&this.dpsWebview.remove()},render:function(){var e=this.props.show==m.widget||this.props.show==m.search,t=e?{height:"100%"}:o.webviewDisplayNone;return"edit"===this.props.propshow&&(t=o.webviewDisplayNone),r.createElement("div",{style:t,ref:"container",className:"devtools"})}});_exports=b}var _exports;init(),module.exports=_exports;