import React,{Component} from 'react';
import {Card,Button,message,Tabs,Icon} from 'antd';
import './ui.less';
const TabPane = Tabs.TabPane;

export default class Buttons extends Component{
    componentWillMount(){
        this.newTabIndex = 0;
        const panes=[
            {
                key:1,
                title:'Tab1',
                content:'这是选项一'
            },
            {
                key:2,
                title:'Tab2',
                content:'这是选项二'
            },
            {
                key:3,
                title:'Tab3',
                content:'这是选项三'
            }
        ]
        this.setState({
            activeKey:panes[0].key,
            panes
        })
    }
    onChange=(activeKey)=>{
        this.setState({
            activeKey
        })
    };
    
    onEdit = (targetKey, action) => {
        this[action](targetKey);
      };
      add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
      };
    
      remove = targetKey => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };
    
    
    
    
      handlecallback=(key)=>{
        message.info('Hi,你选择了标签:'+key)
    }
        
    
    render(){
        return(
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handlecallback}>
                        <TabPane tab="Tab 1" key="1">欢迎学习React课程</TabPane>
                        <TabPane tab="Tab 2" key="2">欢迎学习React课程</TabPane>
                        <TabPane tab="Tab 3" key="3">React是一门非常受欢迎的MV*框架</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的标签页" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handlecallback}>
                        <TabPane tab={<span><Icon type="apple"/>Tab1</span>} key="1">欢迎学习React课程</TabPane>
                        <TabPane tab={<span><Icon type="android"/>Tab1</span>} key="2">欢迎学习React课程</TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab1</span>} key="3">React是一门非常受欢迎的MV*框架</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab增添改查" className="card-wrap">
                    <Tabs   
                            onChange={this.onChange}
                            activeKey={this.state.activeKey}
                            type="editable-card"
                            onEdit={this.onEdit}
                        
                    >
                        {this.state.panes.map((pane)=>{
                            return <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>
                        })}
                    </Tabs>
                </Card>
            </div>
        )
    }
}