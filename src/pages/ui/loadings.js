import React,{Component} from 'react';
import {Card,Spin,Button,Alert,Icon} from 'antd';
import './ui.less';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default class Loadings extends Component{
    render(){
        return(
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin:'0 10px'}}/>
                    <Spin size="large"/>
                    <Spin  indicator={antIcon} style={{marginLeft:10}}/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="React"
                        description="欢迎来到React高级实战课程"
                        type="info"
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="欢迎来到React高级实战课程"
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="React"
                            description="欢迎来到React高级实战课程"
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="加载中..." indicator={antIcon} >
                        <Alert
                            message="React"
                            description="欢迎来到React高级实战课程"
                            type="warning"
                        />
                    </Spin>
                    
                </Card>
            </div>
        );
    }
}