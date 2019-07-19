import React,{Component} from 'react';
import {Card,Spin,Button,Alert,Icon,notification} from 'antd';
import './ui.less';
export default class Loadings extends Component{
    openNotificationWithIcon=(type,direction)=>{
        if(direction){
            notification.config({
                placement: direction,
                bottom: 50,
                duration: 3,
              });
        }
        notification[type]({
            message: '发工资了',
            description:
              '上给月考勤22天，全勤，实发工资15400，请笑纳',
            onClick: () => {
              console.log('Notification Clicked!');
            },
            // icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
  
          });
    }
    render(){
        return(
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type='primary' onClick={() =>this. openNotificationWithIcon('success')}>Success</Button>
                    <Button type='primary' onClick={() => this.openNotificationWithIcon('info')}>Info</Button>
                    <Button type='primary' onClick={() =>this. openNotificationWithIcon('warning')}>Warning</Button>
                    <Button type='primary' onClick={() =>this. openNotificationWithIcon('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框" className="card-wrap">
                    <Button type='primary' onClick={() =>this. openNotificationWithIcon('success','topRight')}>Success</Button>
                    <Button type='primary' onClick={() => this.openNotificationWithIcon('info','topLeft')}>Info</Button>
                    <Button type='primary' onClick={() =>this. openNotificationWithIcon('warning','bottomLeft')}>Warning</Button>
                    <Button type='primary' onClick={() =>this. openNotificationWithIcon('error','bottomRight')}>Error</Button>
                </Card>
            </div>
        )
    }
}