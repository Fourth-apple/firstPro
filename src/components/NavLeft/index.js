import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import MenuConfig from './../../config/menuConfig';
import { Menu, Icon } from 'antd';
import './index.less'

const SubMenu = Menu.SubMenu;
export default class NavLeft extends Component{
    componentWillMount(){
        const menuTreeNode=this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    }
    //菜单渲染
    renderMenu=(data)=>{
        return data.map((item)=>{
            if(item.children){
                return(
                    <SubMenu key={item.key} title={item.title}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return   <Menu.Item key={item.key} title={item.title}>
                <NavLink to={item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render(){
        return(
            <div >
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>学习吧,年</h1>
                </div>
                <Menu theme="dark">
                  {this.state.menuTreeNode}
                </Menu>
                        
             </div>
        )
    }
}