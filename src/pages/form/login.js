import React,{Component} from 'react';
import {Card,Form,Button,Input,message,Icon, Checkbox} from 'antd';


const FormItem=Form.Item;
class FormLogin extends Component{
    handleSubmit=(e)=>{
        e.preventDefault();
        let userInfo=this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            message.success(`${userInfo.userName}恭喜你通过本次表单组建学习，密码为：${values.password}`)
          }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form
        return(
            <div>
                <Card title="登陆行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名"/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card tilte="登录两行表单呀" style={{marginTop:10}}>
                <Form layout="horizontal" style={{width:300}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    initialValue:'',
                                    rules:[{ required: true, message: 'Please input your Password!' },
                                            {
                                                min:5,max:10,
                                                message:'长度不在范围内'
                                            },
                                            {
                                                pattern:new RegExp('^\\w+$','g'),// /^\w+$/g
                                                message:'必须为字母或数字'
                                            }]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder='请输入用户名'/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                                {
                                    getFieldDecorator('password',{
                                        initialValue:'',
                                        rules:[{ required: true, message: 'Please input your Password!' }]
                                    })(
                                        <Input prefix={<Icon type="lock"/>} placeholder='请输入密码'/>
                                    )
                                }
                        </FormItem>
                        <FormItem>
                                {
                                    getFieldDecorator('remember',{
                                        valuePropName: 'checked',
                                        initialValue: true,
                                        
                                    })(
                                        <Checkbox>记住密码</Checkbox>
                                    )
                                    
                                }
                                <a href="#" style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(FormLogin);