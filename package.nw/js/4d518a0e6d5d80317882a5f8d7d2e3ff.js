'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){const a=require('react'),b=require('./a8c87029da0fa06e986298d447ab0fe2.js'),c=require('./cc2c2970ff81ae4a83123e81ee123da2.js'),d=require('./3b66d845db4d098b7a16cb0357f5c072.js'),e=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),f=require('./9fdd4ac31a05c27355910f0d74accd4c.js'),g=require('./84705760a8692a44a583377e7f3f3b00.js'),h=require('./3c55dff3626a3ee184d599f076158345.js'),i=require('classnames'),j=require('./1fcc6bd55b687d154a4247e57fe3011d.js'),k=require('./72653d4b93cdd7443296229431a7aa9a.js'),l=require('./common/locales/index.js'),m=require('./875171e7b864aa58d026d4fa0999fbd1.js'),{connect:n}=require('react-redux');class o extends a.Component{constructor(a){super(a),this.state=_extends({lazyLoaded:a.show,show:a.show},a.data,{dropDownShow:!1,dropDownList:[],serviceList:a.serviceList||[],queryList:a.serviceList[0]&&a.serviceList[0].query_item||[]})}componentDidMount(){this.props.show&&this.getQueryConfig()}componentWillReceiveProps(a){let b={};a.data!=this.props.data&&(b=_extends({},b,a.data)),a.serviceList!=this.props.serviceList&&(b.serviceList=a.serviceList,b.queryList=a.serviceList[0]&&a.serviceList[0].query_item||[]),a.show!=this.props.show&&(a.show&&(this.getQueryConfig(),b.lazyLoaded=!0),b.show=a.show),this.setState(b)}getQueryConfig(){g.getQueryConfig().then((a)=>{this.props.updateSearchQueryConfig(a.service_item||[])}).catch((a)=>{k.error(`getQueryConfig catch error ${a}`),this.props.showError(l.config.WIDGET_GET_SEARCH_QUERY_ERROR.format(a))})}onInputChange(a){let b=a.currentTarget,c=b.dataset,d=c.type;this.setState({[d]:b.value})}onClose(){this.setState({show:!1})}onConfirm(){return this.state.name?void(this.props.projectActions.setCompileCondiction({id:this.props.id,name:this.state.name,widgetData:this.state.widgetData,service:this.state.service,query:this.state.query,customQuery:this.state.customQuery,debugUrl:this.state.debugUrl,boxQI:this.state.boxQI}),this.onClose()):void this.refs.nameInput.focus()}onAnimationOut(){this.props.setCustomCompile({show:!1,id:-1})}onDelete(){this.props.projectActions.removeCompileCondiction({id:this.props.id}),this.onClose()}onDropDownSelect(a,b){'service'==a?this.onServiceSelect(b):'query'==a&&this.onQuerySelect(b)}onServiceSelect(a){let b=this.state.serviceList[a];b&&this.setState({query:'',boxQI:'',queryList:b.query_item,dropDownShow:!1,service:b})}onQuerySelect(a){let b=this.state.queryList[a];b&&this.setState({query:b.query,boxQI:b.box_qi,dropDownShow:!1})}onServiceDropDownClick(a){a.stopPropagation();let b=a.currentTarget.getBoundingClientRect(),c=this.props.serviceList.map((a)=>{return a.wording});this.setState({dropDownHeight:300,dropDownLeft:b.left,dropDownTop:b.top+b.height,dropDownShow:!0,dropDownType:'service',dropDownList:c})}onQueryDropDownClick(a){a.stopPropagation();let b=this.state.queryList.map((a)=>{return a.query}),c=a.currentTarget.getBoundingClientRect();this.setState({dropDownHeight:300,dropDownLeft:c.left,dropDownTop:c.top+c.height,dropDownShow:!0,dropDownType:'query',dropDownList:b})}onContainerClick(){this.setState({dropDownShow:!1})}render(){if(!this.state.lazyLoaded)return null;let b=this.props,c={display:-1==b.id?'none':''},d=this.state.dropDownShow&&'service'==this.state.dropDownType,e=this.state.dropDownShow&&'query'==this.state.dropDownType;return a.createElement('div',{style:{display:this.props.show?'':'none',height:'100%',width:'100%',position:'absolute',zIndex:1e3},onClick:this.onContainerClick.bind(this)},a.createElement(h,{width:455,left:this.state.dropDownLeft,top:this.state.dropDownTop,show:this.state.dropDownShow,list:this.state.dropDownList,height:this.state.dropDownHeight,onSelectClick:this.onDropDownSelect.bind(this,this.state.dropDownType)}),a.createElement(m,{show:this.state.show,inClassName:'ui-animate-pull-down ui-dialog',outClassName:'ui-animate-pull-up ui-dialog',onAnimationOut:this.onAnimationOut.bind(this),style:{width:600,marginLeft:-300}},a.createElement('div',{className:'ui-dialog-hd'},a.createElement('h3',{className:'ui-dialog-title'},'\u81EA\u5B9A\u4E49\u7F16\u8BD1\u6761\u4EF6')),a.createElement('div',{className:'ui-dialog-bd'},a.createElement('div',{className:'ui-form'},a.createElement('div',{className:'ui-form-item ui-form-item-inline'},a.createElement('label',{className:'ui-form-label'},'\u6A21\u5F0F\u540D\u79F0'),a.createElement('div',{className:'ui-form-controls'},a.createElement('div',{className:'ui-input-box'},a.createElement('input',{type:'text',ref:'nameInput',"data-type":'name',value:this.state.name,onChange:this.onInputChange.bind(this),className:'ui-input'})))),a.createElement('div',{className:'ui-form-item ui-form-item-inline'},a.createElement('label',{className:'ui-form-label'},'\u670D\u52A1\u7C7B\u522B'),a.createElement('div',{className:'ui-form-controls'},a.createElement('div',{className:'ui-selector ui-selector-default',onClick:this.onServiceDropDownClick.bind(this)},a.createElement('input',{className:'ui-selector-input',value:this.state.service&&this.state.service.wording||'\u8BF7\u9009\u62E9',readOnly:!0}),a.createElement('div',{className:'ui-selector-dropdown'},a.createElement('i',{className:i({"ui-icon-arrow-down-o":!d,"ui-icon-arrow-up-o":d})}))))),a.createElement('div',{className:'ui-form-item ui-form-item-inline'},a.createElement('label',{className:'ui-form-label'},'\u67E5\u8BE2\u6761\u4EF6'),a.createElement('div',{className:'ui-form-controls'},a.createElement('div',{className:'ui-selector ui-selector-primary',onClick:this.onQueryDropDownClick.bind(this)},a.createElement('input',{className:'ui-selector-input',value:this.state.query||'\u8BF7\u9009\u62E9',readOnly:!0}),a.createElement('div',{className:'ui-selector-dropdown'},a.createElement('i',{className:i({"ui-icon-arrow-down-o":!e,"ui-icon-arrow-up-o":e})}))))),a.createElement('div',{className:'ui-form-item ui-form-item-inline'},a.createElement('label',{className:'ui-form-label'},'\u6D4B\u8BD5\u670D\u52A1\u5668'),a.createElement('div',{className:'ui-form-controls'},a.createElement('div',{className:'ui-input-box'},a.createElement('input',{type:'text',"data-type":'debugUrl',value:this.state.debugUrl,onChange:this.onInputChange.bind(this),placeholder:'\u8BF7\u586B\u5199\u6D4B\u8BD5\u670D\u52A1\u5668\u5730\u5740',className:'ui-input'})))),a.createElement('div',{className:'ui-form-item ui-form-item-inline'},a.createElement('label',{className:'ui-form-label'},'\u81EA\u5B9A\u4E49\u641C\u7D22'),a.createElement('div',{className:'ui-form-controls'},a.createElement('div',{className:'ui-input-box'},a.createElement('input',{type:'text',"data-type":'customQuery',value:this.state.customQuery,onChange:this.onInputChange.bind(this),className:'ui-input'})))))),a.createElement('div',{className:'ui-dialog-ft'},a.createElement('div',{className:'ui-dialog-action'},a.createElement('button',{className:'ui-button ui-button-warn',style:c,onClick:this.onDelete.bind(this)},'\u5220\u9664\u8BE5\u6A21\u5F0F')),a.createElement('div',{className:'ui-dialog-action'},a.createElement('button',{className:'ui-button ui-button-default',onClick:this.onClose.bind(this)},'\u53D6\u6D88'),a.createElement('button',{className:'ui-button ui-button-primary',onClick:this.onConfirm.bind(this)},'\u786E\u5B9A')))))}}module.exports=n((a)=>{let b=a.project.current,c=b.compileType,d=b.condiction[c]||{},e=a.window.customCompile,g=e.id,h=d.list&&d.list[g]||{},i=a.config.searchQuery&&a.config.searchQuery.serviceList||[];return{show:a.window.customCompile&&a.window.customCompile.show==f.search,project:a.project.current,id:g,data:h,serviceList:i}},(a)=>{return{showError:e.bindActionCreators(j.showError,a),setCustomCompile:e.bindActionCreators(b.setCustomCompile,a),projectActions:e.bindActionCreators(c,a),updateSearchQueryConfig:e.bindActionCreators(d.updateSearchQueryConfig,a)}})(o)}(require('lazyload'),require);