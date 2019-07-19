import React,{Component} from 'react';
import {Card,Spin,Button,message} from 'antd';
import './ui.less';
export default class Loadings extends Component{
    success = (type) => {
        // message
        //   .loading('Action in progress..', 2.5)
        //   .then(() => message.success('Loading finished', 2.5))
        //   .then(() => message.info('Loading finished is finished', 2.5));
        message[type]('恭喜你，React课程晋级成功')
      };
    render(){
        return(
            <div>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.success('suddess')}>Success</Button>
                    <Button type="primary" onClick={()=>this.success('info')}>Iofo</Button>
                    <Button type="primary" onClick={()=>this.success('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.success('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.success('loading')}>Loading</Button>
                </Card>
            </div>
        )
    }
}