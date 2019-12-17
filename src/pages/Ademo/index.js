/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React from 'react';
import { Table,Button,Switch,Select,Input,Divider,Row,Col,Modal, message, Tooltip } from 'antd';
// import BreadcrumbCustom from '../BreadcrumbCustom';
import { Link } from 'react-router-dom';
import Search from 'antd/lib/input/Search';
import { 
  adminbindSelect,agentbindSelect,agentaddadplan,advertisaddadplan,adminaddadplan,openagentadplan,
  closeagentadplan,agentdelcampaign,advertiserdelcampaign, agentadgroup,adveradgroup,adminadgroup, 
  flowfrom, adminDSP, agentDSP, adminallDSP, agentallDSP, advertiserallDSP, advertiserbindDSP, 
  advertispwlist, closeadvertiseradplan, closeadminadplan, openadvertiseradplan, openadminadplan,
} from '../../api/api'
import { getadplanlist, openadplan, closeadplan, deladplan,} from '../../api/admanage'
import {getrole,getId} from '../../api/auth'
import {fifteenfont,sixfont} from '../../api/filters'
import emitter from './../../utils/events.js'
  
const { confirm } = Modal;
const InputGroup = Input.Group;
const { Option } = Select;
var columne = [];
export default class AdProgram extends React.Component {
  constructor(props){
      super(props); 
      this.state= {
  			pager:1, //需要上传的分页页面数
  			total:'', //获得的分页数
  			loading: false,
  			dataList:[],
  			status:'',//批量开启关闭广告计划id
  			statu:'',//确定按钮初始状态
  			promoted_object_type:undefined, //投放目的
  			campaign_status:undefined, //计划状态
  			advertiser_id:undefined, //广告主id
  			conpany_name:undefined, //广告主名称
  			campaign_name:undefined, //计划名称
  			flow_source:undefined, //流量来源
  			selectList:[],
  			flowfrom:[],
  			disabled: true,
				role:''
  		};
  };
  componentWillMount() {
    this.setState({role:getrole()})
	}
	componentDidMount(){
		this.advertiserpwlistfun()
	  this.setState({ loading: true });
	  this.OCCI({limit:10});
		if(this.state.role!='advertiser'){
      this.SelectDatas();
    }
    this.flow();
	}
	clickProgram=(record)=>{
		this.props.getProgramId(record.id);
	}
   async SelectDatas(){
   	let resList='';
   	if(this.state.role=='agent'){
   		resList = await agentbindSelect();
   	}else if(this.state.role=='admin'){
   		resList = await adminbindSelect();
     }
   	if(resList){
   		this.setState({ 
         selectList: resList.result
        });
   	}
   }
   async flow(data){
    let resList='';
    if(this.state.role=='agent'){
      resList = await agentallDSP(data);
    }
    if(this.state.role=='admin'){
      resList = await adminallDSP(data);
    }
    if(this.state.role=='advertiser'){
      resList = await advertiserbindDSP({advertiser_id:getId()});
    }
    if(resList){
      this.setState({ 
        flowfrom: resList.result
       });
    }
  }
  async OCCI(data){
    let resList='';
    if(this.state.role == 'agent'){
      resList = await getadplanlist(data);
    }
    if(this.state.role == 'advertiser'){
      resList = await getadplanlist(data);
    }
    if(this.state.role == 'admin'){
      resList = await getadplanlist(data);
    }
    if(resList ){
      this.setState({
        dataList: resList.result.data,
        loading: false,
        total:resList.result.total,
      });
    }
  }
  async closeagentadplanfun(data){
    let resList='';
    if(this.state.role == 'agent'){
      resList = await closeadplan({campaign_ids:data});
    }
    if(this.state.role == 'advertiser'){
      resList = await closeadplan({campaign_ids:data})
    }
    if(this.state.role == 'admin'){
      resList = await closeadplan({campaign_ids:data})
    }
    if(resList){
      this.OCCI({page:this.state.pager,limit:10})
    }
  }
  async openagentadplanfun(data){
    let resList='';
    if(this.state.role == 'agent'){
      resList = await openadplan({campaign_ids:data});
    }
    if(this.state.role == 'advertiser'){
      resList = await openadplan({campaign_ids:data})
    }
    if(this.state.role == 'admin'){
      resList = await openadplan({campaign_ids:data})
    }
    if(resList){
      this.OCCI({page:this.state.pager,limit:10})
    }
  }
  async advertiserpwlistfun(data){
    columne = []
    if(this.state.role=='advertiser'){
      let resList = await advertispwlist({advertiser_id:getId()});
      if(resList){
        resList.result.checked.map(i => {
          if(i.access_title=='广告创建管理'){
            this.setState({
              disabled: false,
            },)
          }
        })
      }
      if(this.state.disabled==false){
          columne.push({
          title: '开关', 
          dataIndex: 'switch',
          render:(text, record) => (
            <Switch 
              checked={record.campaign_status=='AD_STATUS_NORMAL'? true:false } 
              onClick={()=>this.showConfirm(record)}
              disabled={this.state.disabled}
            />
        )})
      }
      
      columne.push({
        title: '广告计划',dataIndex: 'campaign_name',
        render: (text , record) => <Tooltip title={text} onClick={()=>this.clickProgram(record)} ><span className="operations_style">{fifteenfont(text)}</span></Tooltip>,
      })
      if(this.state.disabled==false){
        columne.push({
          title: '操作',
          dataIndex: 'action',
          render: (text,record) => (
            <span>
              {
                this.state.disabled?null:
                <Link to={{pathname:'/app/ad/Program',state:{record:record}}}>
                  <span className="operations_style" >修改</span>
                </Link>
              }
              {(record.campaign_status=='AD_STATUS_NORMAL')||(this.state.disabled)?null:
              <span>
                <Divider type="vertical" />
              <span 
                className="operations_style"
                onClick={()=>this.showDelConfirm(record)}
              >删除</span></span>}
              <Divider type="vertical" />
              <Link to={{pathname:'/app/tool/toolContent',state:{index:4,send_aim:{aim_type:'campaign',aim_id:record.id}}}} onClick={this.changetab.bind(this,5)}>
                <span style={{cursor: 'pointer',color:'rgba(0, 145, 234, 0.85)' }} >日志</span>
              </Link>
            </span>
          ),
        },)
      }
      columne.push(
				{title: '流量来源',dataIndex: 'flow_source_name'},
				{title: '投放目的',dataIndex: 'promoted_object_type_name'},
				{title: '预算（元/日）',dataIndex: 'daily_budget',render: (text,record) => <span >{text=='-1'?'不限':text.toFixed(2)}</span>}
			)
    }
    if(this.state.role=='admin'){
      this.setState({disabled:true},()=>{
        columne.push({
          title: '广告计划',dataIndex: 'campaign_name',
          render: (text , record) => <Tooltip title={text} onClick={()=>this.clickProgram(record)} ><span className="operations_style">{fifteenfont(text)}</span></Tooltip>,
        })
        columne.push(
				{title: '流量来源',dataIndex: 'flow_source_name'},
				{title: '广告主',dataIndex: 'company'},
				{title: '投放目的',dataIndex: 'promoted_object_type_name'},
				{title: '预算（元/日）',dataIndex: 'daily_budget',render: (text,record) => <span >{text=='-1'?'不限':text.toFixed(2)}</span>}
				)
      })
    }
    if(this.state.role == "agent"){
      this.setState({disabled:false},()=>{
        columne.push({
          title: '开关', 
          dataIndex: 'switch',
          render:(text, record) => (
            <Switch 
              checked={record.campaign_status=='AD_STATUS_NORMAL'? true:false } 
              onClick={()=>this.showConfirm(record)}
              disabled={this.state.disabled}
            />
        ),})
        columne.push({
          title: '广告计划',dataIndex: 'campaign_name',
          render: (text , record) => <Tooltip title={text} onClick={()=>this.clickProgram(record)}><span className="operations_style">{fifteenfont(text)}</span></Tooltip>,
        })
        columne.push({
          title: '操作',
          dataIndex: 'action',
          render: (text,record) => (
            <span>
              {
                this.state.disabled?null:
                <Link to={{pathname:'/app/ad/Program',state:{record:record}}}>
                  <span className="operations_style" >修改</span>
                </Link>
              }
              {(record.campaign_status=='AD_STATUS_NORMAL')||(this.state.disabled)?null:
              <span>
                <Divider type="vertical" />
              <span 
                className="operations_style"
                onClick={()=>this.showDelConfirm(record)}
              >删除</span></span>}
              <Divider type="vertical" />
              <Link to={{pathname:'/app/tool/toolContent',state:{index:4,send_aim:{aim_type:'campaign',aim_id:record.id}}}} onClick={this.changetab.bind(this,5)}>
                <span style={{cursor: 'pointer',color:'rgba(0, 145, 234, 0.85)' }} >日志</span>
              </Link>
            </span>
          ),
        },)
        columne.push({title: '流量来源',dataIndex: 'flow_source_name',})
        columne.push({title: '广告主',dataIndex: 'company',})
        columne.push({title: '投放目的',dataIndex: 'promoted_object_type_name',})
        columne.push({title: '预算（元/日）',dataIndex: 'daily_budget',render: (text,record) => <span >{text=='-1'?'不限':text.toFixed(2)}</span>,})
      })
    }
  }
  async deladplanfun(data){
    let resList='';
    if(this.state.role == 'agent'){
      resList = await deladplan(data);
    }
    if(this.state.role == 'advertiser'){
      resList = await deladplan(data);
    }
    if(resList ){
      message.info("删除成功")
      this.OCCI({limit:10})
    }
  }
  showConfirm=(record)=> {
    let _this=this;
    confirm({
      title: record.campaign_status=='AD_STATUS_NORMAL'?
              '是否关闭此广告计划'
              :
              '是否开启此广告计划',
      onOk() { //有效
        record.campaign_status=='AD_STATUS_NORMAL'?
            _this.closeagentadplanfun(record.id)
          :
            _this.openagentadplanfun(record.id);
        
      },
      onCancel() {
      },
    });
  }
  //批量开启 关闭 删除
  //获得id并存储在ataus,并且转换成字符串
  // onSelectChange = selectedRowKeys => {
  //   this.setState({ 
  //     selectedRowKeys,
  //     state:selectedRowKeys.join(',')
  //    }) 
  // };
  // 批量开启或关闭
  handleChange=(value)=> {
    if(value.key==='open'){
      let _this=this;
    confirm({
      title: '是否开启此广告计划',
      onOk() {        
            _this.openagentadplanfun(_this.state.status);
            // _this.setState({statu:'AD_STATUS_NORMAL'})
      },
      onCancel() {
      },})
    }
    if(value.key==='close'){
      let _this=this;
    confirm({
      title: '是否关闭此广告计划',
      onOk() {        
         _this.closeagentadplanfun(_this.state.status);
      },
      onCancel() {
      },})
    }
    if(value.key==='del'){
      let _this=this
      let flag=false;
      for(var i=0;i<_this.state.status.split(',').length;i++){
        for(var y=0;y<_this.state.dataList.length;y++){
          if(_this.state.status.split(',')[i]==_this.state.dataList[y].id){
            if(_this.state.dataList[y].more_group == true){
              message.info("请删除此广告计划下的广告组")
              flag=true;
              break;
            }
          }
        }
        break;
      }
       if(flag == false){
        confirm({
          title: '是否删除此广告计划',
          onOk() {        
              _this.deladplanfun({campaign_ids:_this.state.status});
          },
          onCancel() {
          },})
      }
    }
  }
  changetab=(tabpag)=>{
		// 订阅发送
		emitter.emit('changetabs', tabpag);
	}
	Changeaim=(e)=>{
		this.setState({promoted_object_type:e})
	}
	Changestatus=(e)=>{
		this.setState({campaign_status:e})
  }
  Changeflow=(e)=>{
    this.setState({
      flow_source:e
    })
  }
	ChangeBudget=(e)=>{
		this.setState({campaign_name:e.target.value})
	}
	Changename=(e)=>{
		this.setState({
      advertiser_id:e
    })
	}
	screen=()=>{
    var data={};
		if(this.state.promoted_object_type){
			data['promoted_object_type']=this.state.promoted_object_type;
		}
		if(this.state.campaign_status){
			data['campaign_status']=this.state.campaign_status;
		}
		if(this.state.campaign_name){
			data['campaign_name']=this.state.campaign_name;
		}
		if(this.state.advertiser_id){
			data['advertiser_id']=this.state.advertiser_id;
		}
		if(this.state.pager){
			data['page']=this.state.pager;
    }
    if(this.state.flow_source){
      data['flow_source']=this.state.flow_source
    }
		data['limit']=10;
		this.OCCI(data)
	}
	clearList=()=>{
		this.setState({
			promoted_object_type:undefined, //投放目的
			campaign_status:undefined, //计划状态
			advertiser_id:undefined, //广告主id
      campaign_name:undefined, //计划名称
      flow_source:undefined, //计划名称
		})
		this.OCCI({limit:10})
  }
  handleTableChange = (pageNumber) => {
    this.setState({
      pager:pageNumber.current,
    },()=>this.screen());
  };
  // 删除的弹框
  showDelConfirm=(record)=>{
    let _this=this;
    if(record.more_group ==false){
      confirm(
          {
          title: '确定删除此广告计划吗, 删除后此广告计划的广告组和广告创意都将被删除, 且无法恢复',
          onOk() {  
                _this.deladplanfun({campaign_ids:record.id});
          },
          onCancel() {
            _this.OCCI({limit:10});
          },
        });
    }
    if(record.more_group ==true){
      message.info("请删除此广告计划下的广告组")
    }
  }
  render(){
    // 点击对勾获得id
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({ 
          selectedRowKeys,
          status:selectedRowKeys.join(',')
         },()=>console.log(this.state.status)) 
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    
    const pagination={
      showQuickJumper: true,
      total:this.state.total,
    }
      
      return(
        <div>
          <div className="padd24">
          {this.state.disabled?null:
            <div className="table-operations" style={{marginLeft:'8px'}}>
              <Button type="primary">
                <Link to={'/app/ad/Program'}>新建广告计划</Link>
              </Button>
            </div>}
            <Row gutter={16} style={{marginLeft:'0px',marginRight:'0px',padding:'10px 0px'}}>
              <Col span={5}>
                <div className="marginbom" >投放目的</div>
                <div>
                  <Select 
                    style={{ width: '100%' }} 
                    onChange={this.Changeaim} 
                    placeholder="请选择投放目的"
                    value={this.state.promoted_object_type}
                  >
                      <Option value="PROMOTED_OBJECT_TYPE_APP_ANDROID" key="PROMOTED_OBJECT_TYPE_APP_ANDROID">Android 应用</Option>
                      <Option value="PROMOTED_OBJECT_TYPE_APP_IOS" key="PROMOTED_OBJECT_TYPE_APP_IOS">iOS 应用</Option>
                      <Option value="PROMOTED_OBJECT_TYPE_LINK" key="PROMOTED_OBJECT_TYPE_LINK">网页</Option>
                      <Option value="PROMOTED_OBJECT_TYPE_ECOMMERCE" key="PROMOTED_OBJECT_TYPE_ECOMMERCE">电商推广</Option>
                  </Select>
                </div>
                
              </Col>
              {(this.state.role == 'agent')||(this.state.role == 'admin')?
                <Col span={5}>
                  <div className="marginbom" > 广告主 </div>
                  <div>
                  <Select
                    style={{ width: '100%'}}
                    placeholder="请选择广告主名字"
                    onChange={this.Changename}
                    value={this.state.advertiser_id}
                  >
                    {this.state.selectList.map(d => (
                    <Option key={d.advertiser_id} >{d.company}</Option>
                    ))}
                  </Select>
                  </div>
                </Col>
              :null}
              <Col span={5}>
                <div className="marginbom" >流量来源</div>
                <div>
                  <Select 
                    style={{ width: '100%'}} 
                    onChange={this.Changeflow} 
                    placeholder="请选择流量来源"
                    value={this.state.flow_source}
                  >
                    {this.state.flowfrom.map(d => (
                      <Option key={d.id} >{d.name}</Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col span={4}>
              <div className="margintop">
              <Input 
                  placeholder="请输入广告计划名称"
                  onChange={this.ChangeBudget}
                  value={this.state.campaign_name}
              />
              </div>
              </Col>
              <Col span={2}>
                <div className="margintop">
                  <Button type="primary" onClick={this.screen}>筛选</Button>
                </div> 
              </Col>
              <Col span={2}>
                <div className="margintop">
                  <Button type="link" onClick={this.clearList}>清除已选</Button>
                </div> 
              </Col>
            </Row>
          </div>
          {this.state.disabled?null:
          <Row gutter={16} style={{background:'rgba(216, 216, 216, .12)',marginLeft:'0px',marginRight:'0px',padding:'10px 0px'}}>
              <Col span={2} style={{marginLeft:'24px'}}>
                <div style={{ display:'inline-block',lineHeight:'32px' }} >批量操作</div>
              </Col>
              <Col span={5}>
                <Select 
                  placeholder="勾选后可操作" 
                  style={{ width: 150, }}
                  disabled={this.state.status===''?true:false}>
                    <Option value="open" onClick={(e)=>this.handleChange(e)}>开启</Option>
                    <Option value="close" onClick={(e)=>this.handleChange(e)}>关闭</Option>
                    <Option value="del" onClick={(e)=>this.handleChange(e)}>删除</Option>
                </Select>
              </Col>
            </Row>}
          <Table 
            loading={this.state.loading} 
            pagination={pagination}
            rowSelection={rowSelection} 
            rowKey="id" // 设置对勾获得指定数据
            columns={columne} 
            dataSource={this.state.dataList} 
            onChange={(e)=>this.handleTableChange(e)}
          />
        <style>
          {`
            .padd24{
              padding: 24px 24px 0 24px;
            }
            .ant-select-dropdown-menu-item-active:not(.ant-select-dropdown-menu-item-disabled){
              background:rgba(255,255,255,0.10);
            }
            .ant-select-dropdown-menu-item-active:not(.ant-select-dropdown-menu-item-disabled):hover{
              background:rgba(255,255,255,0.10);
            }
          `}
        </style>
      </div>
      );
  }
}


