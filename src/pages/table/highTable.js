import React,{Component} from 'react';
import {Card,Table,radio,Modal, message,Button,Badge} from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils'

// import { Button } from 'antd/lib/radio';
export default class HighTable extends Component{
    state={

    }
    params={
        page:1
    }
    componentDidMount(){
        this.request();
    }
        //动态获取mock数据
        request=()=>{

            axios.ajax({
                url:'/table/high/list',
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
                        dataSource:res.result.list,
                        
                    })
                }
            })
        }
    handleChange=(pagination, filters, sorter)=>{
        console.log("::",sorter)
        this.setState({
            sortOrder:sorter.order
        })
    }
    handleDeleted=(item)=>{
        let id=item.id;
        Modal.confirm({
            title:'确认',
            content:'您确认要删除此条数据吗?',
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }
    render(){
        const columns = [
            {
              title: 'id',
              dataIndex: 'id',
              width:80         //没有宽度，表头和内容是对不齐的
            
            },
            {
              title: '用户名',
              dataIndex: 'userName',
              width:80
              
            },
            {
              title: '性别',
              dataIndex: 'sex',
              width:80,
              render(sex){
                  return sex==1?"男":"女"

              }
              
              
            },
            {
                title: '状态',
                dataIndex: 'state',
                width:80,
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
                width:80,
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
                width:120,
                dataIndex: 'address',
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '早期时间',
                width:120,
                dataIndex: 'time',
                
              },
        ]
        //2--------------------------------------------------------------------
        const columns2 = [
            {
              title: 'id',
              fixed:'left',
              dataIndex: 'id',
              width:80         //没有宽度，表头和内容是对不齐的
            
            },
            {
              title: '用户名',
              dataIndex: 'userName',
              fixed:'left',
              width:80
              
            },
            {
              title: '性别',
              dataIndex: 'sex',
              width:80,
              render(sex){
                  return sex==1?"男":"女"

              }
              
              
            },
            {
                title: '状态',
                dataIndex: 'state',
                width:80,
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
                width:80,
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
                width:120,
                dataIndex: 'address',
                
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '早期时间',
                width:120,
                dataIndex: 'time',
                fixed:'right'
                
              },
        ]
        const columns3 = [
            {
              title: 'id',
              dataIndex: 'id',
              width:80         //没有宽度，表头和内容是对不齐的
            
            },
            {
              title: '用户名',
              dataIndex: 'userName',
              width:80
              
            },
            {
              title: '性别',
              dataIndex: 'sex',
              width:80,
              render(sex){
                  return sex==1?"男":"女"

              }
              
              
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width:80,
               sorter:(a,b)=>{
                   return a.age-b.age; //排序------------------------------------
               },
               sortOrder:this.state.sortOrder
                
                
            },
            {
                title: '状态',
                dataIndex: 'state',
                width:80,
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
                width:80,
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
                width:120,
                dataIndex: 'address',
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '早期时间',
                width:120,
                dataIndex: 'time',
                
              },
        ]
        const columns4 = [
            {
              title: 'id',
              dataIndex: 'id',
              width:80         //没有宽度，表头和内容是对不齐的
            
            },
            {
              title: '用户名',
              dataIndex: 'userName',
              width:80
              
            },
            {
              title: '性别',
              dataIndex: 'sex',
              width:80,
              render(sex){
                  return sex==1?"男":"女"

              }
              
              
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width:80,
               
                
                
            },
            {
                title: '状态',
                dataIndex: 'state',
                width:80,
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
                width:80,
                dataIndex: 'interest',
                render(asc){
                    let config={
                        '1':<Badge statue="success" text="成功" />,
                        '2':<Badge status="error" text="错误"/>,
                        '3':<Badge status="default" text="正常"/>,
                        '4':<Badge status="processing" text="进行中"/>,
                        '5':<Badge status="warning" text="警告"/>

                    }
                    return config[asc]
                    
                }
                
              },
              {
                title: '地址',
                width:120,
                dataIndex: 'address',
                
              },
              {
                title: '生日',
                width:120,
                dataIndex: 'birthday',
                
              },
              {
                title: '操作',
                width:120,
                // dataIndex: 'time', 对应的列假如没有这么一项那么时间这一列就不会显示
                render:(text,item)=>{
                    // return <a href="#" onClick={(item)=>{this.handleDeleted(item)}}>删除</a> a会跳转导致我们又要重新在地址栏写入admin来访问
                    return <Button size="small" onClick={(item)=>{this.handleDeleted(item)}}>删除</Button>//注意ths这里为箭头函数render
                }
              },
        ]
        return(
            <div>
                 <Card title="头部固定表格">
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{y:240}}//y轴滚动
                    />
                </Card>
                <Card title="左侧固定表格" style={{margin:'10px 0'}}>
                    <Table 
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{x:1730}}
                    />
                </Card>
                <Card title="表格排序" style={{margin:'10px 0'}}>
                    <Table 
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}//分页，排序，过滤必须有onChange
                        
                    />
                </Card>
                <Card title="操作表格" style={{margin:'10px 0'}}>
                    <Table 
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        
                        
                    />
                </Card>
            </div>
        );
    }
}
  