import React,{Component} from 'react';
import { Row, Col } from 'antd';
import Util from './../../utils/utils'
import './index.less'
import axios from './../../axios'

export default class Header extends Component{
    componentWillMount(){
        this.setState({
            userName:'村门口的'
        });
        setInterval(()=>{
            let sysTime=Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            });
        },1000);
        
        // this.getWeatherAPIData();
    }
    // getWeatherAPIData(){
    //     // let city="北京"
    //     axios.jsonp({
    //         url:' https://www.tianqiapi.com/api/?version=v1&cityid=101110101'
    //     }).then((res)=>{
    //         debugger
    //         if(res.status==='success'){
    //             let data = res.results[0].weater_dada[0];
    //             this.setState({
    //                 dayPictureUrl:data.dayPictureUrl,
    //                 weather:data.weather
    //             })
    //         }
    //     })
    // }
    render(){
        const menuType=this.props.menuType
        return(
            <div className="header">
                <Row className="header-top">
                    {
                        menuType?'':
                        <Col>
                            <img src="/assets" alt="" />
                        </Col>
                    }
                        
                    
                    <Col span={24}>
                        <span>欢迎,{this.state.userName}</span>
                        <a href="">退出</a>
                    </Col>
                </Row>
               {
                   menuType?'':
                   <Row className="breadcrumb">
                   <Col span={4} className="breadcrumb-title">
                       首页
                   </Col>
                   <Col span={20} className="weatehr">
                       <span className="date">{this.state.sysTime}</span>
                       <span className="weather-detail">
                           {/* <img src={this.state.dayPictureUrl} alt=""/>
                           {this.state.weather} */}
                           美丽的天气呀
                       </span>
                   </Col>
               </Row>
               }
            </div>
        )
    }
}