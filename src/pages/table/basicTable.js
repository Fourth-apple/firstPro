import React,{Component} from 'react';
import {Card,Table,radio,Modal, message,Button} from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils'
// import { Button } from 'antd/lib/radio';
export default class BasicTable extends Component{
    state={
        dataSource2:[]
    }
    params={
        page:1
    }
    componentDidMount(){
        const dataSource=[
            {
                id:'1',
                userName:'Jack',
                sex:'1',
                state:'1',
                interest:'篮球',
                address:'北京市海淀区',
                birthday:'1995-1-19',
                time:'6:00'
            },
            {
                id:'2',
                userName:'tom',
                sex:'1',
                state:'1',
                interest:'篮球',
                address:'北京市海淀区',
                birthday:'1995-1-19',
                time:'6:00'
            },
            {
                id:'3',
                userName:'susan',
                sex:'1',
                state:'1',
                interest:'篮球',
                address:'北京市海淀区',
                birthday:'1995-1-19',
                time:'6:00'
            },
        ]
        dataSource.map((item,index)=>{
            item.key=index
        })
        this.setState({
            dataSource
        })
        this.request();
    };
    //动态获取mock数据
    request=()=>{
        const _this=this
        axios.ajax({
            url:'/table/list',
            data:{
                params:{
                    page:this.params.page
                },
                
                
            }
        }).then((res)=>{
            if(res.code==0){
                res.result.list.map((item,index)=>{
                    item.key=index
                })
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:[],//指定选中项的 key 数组，需要和 onChange 进行配合
                    selectedRows:null,
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        this.request()
                    })
                })
            }
        })
    }
    //点击单选
    onRowClick=(record,index)=>{
        let selectKey=[index];
        Modal.info({
            title:'信息',
            content:`用户名:${record.userName},用户爱好:${record.interest}`
        })
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record//选择了哪一项
        })

    }
    //多选执行删除操作
    handleDeleted=()=>{
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:'删除提示',
            content:`您确定要删除这些数据吗？${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功'); 
                this.request();
            }
        })
    }
    //-------------------------------render
    render(){
       
        const columns = [
            {
              title: 'id',
              dataIndex: 'id',
            
            },
            {
              title: '用户名',
              dataIndex: 'userName',
              
            },
            {
              title: '性别',
              dataIndex: 'sex',
              render(sex){
                  return sex==1?"男":"女"
              }
              
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config={
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者',
                    }
                    return config[state]
                    
                }
                
              },
              {
                title: '爱好',
                dataIndex: 'interest',
                render(asc){
                    let config={
                        '1':'打篮球',
                        '2':'踢足球',
                        '3':'爬山',
                        '4':'骑行',
                        '5':'游泳',
                        '6':'麦霸',
                        '7':'远行',

                    }
                    return config[asc]
                    
                }
                
              },
              {
                title: '地址',
                dataIndex: 'address',
                
              },
              {
                title: '生日',
                dataIndex: 'birthday',
                
              },
              {
                title: '早期时间',
                dataIndex: 'time',
                
              },
        ]
        const selectedRowKeys=this.state.selectedRowKeys;
        const rowSelection = {
            type:"radio",//设置单选
            selectedRowKeys
          }
        const rowCheckSelection={
            type:'checkbox',//多选
            selectedRowKeys,
            onChange:(selectedRowKeys, selectedRows)=>{
               let ids=[];
               selectedRows.map((item)=>{
                   ids.push(item.id)
               }) 
               this.setState({
                    selectedRowKeys,
                   selectedIds:ids,
                   selectedRows
               })
            }
        }
        
        return(
            <div>
                <Card title="基础表格">
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格" style={{margin:'10px 0'}}>
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选表格" style={{margin:'10px 0'}}>
                    <Table 
                        columns={columns}
                        rowSelection={rowSelection}
                        onRow={(record,index) => {
                            return {
                              onClick: ()=> {
                                  this.onRowClick(record,index);
                              }, // 点击行
                              
                            };
                          }}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-多选表格" style={{margin:'10px 0'}}>
                    <div><Button onClick={this.handleDeleted}>删除</Button></div>
                    <Table 
                        columns={columns}
                        rowSelection={rowCheckSelection}//设置值多选
            
                        dataSource={this.state.dataSource2}//现实的10行数据
                        pagination={false}//是否显示分页
                    />
                </Card>
                <Card title="Mock-表格分页" style={{margin:'10px 0'}}>
                    
                    <Table 
                        columns={columns}//表头
            
                        dataSource={this.state.dataSource2}//表里的数据源
                        pagination={this.state.pagination}
                    />
                </Card>
            </div>
        );
    }
}



//下面是获取的mock数据
// {
//     "code": 0,
//     "msg": "您当前未登录",
//     "result": {
//       "list|5": [{
//         "id|+1": 1,
//         userName: '@cname',
//         "sex|1-2": 1,
//         "state|1-5": 1,
//         "interest|1-5": 1,
//         address: '北京市海淀区',
//         birthday: '1995-1-19',
//         time: '6:01'
//       }],
//       page: 1,
//       page_size: 10,
//       total: 100
//     }
//   }