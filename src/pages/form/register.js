import React,{Component} from 'react';
import {Card,Input,Form,Checkbox,Button,Select, Radio,InputNumber, Switch,DatePicker, TimePicker,Upload,Icon,message} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup=Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;


class FormRegister extends Component{
    state = {
        loading: false,
      };
handleSubmit =()=>{
    let ooo = this.props.form.getFieldsValue();
    console.log(JSON.stringify(ooo));
    message.success(`${ooo.userName}恭喜你通过本次表单组件的学习，密码为${ooo.password}`)
}
   getBase64=(img, callback)=> {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };
    
    render(){
        const {getFieldDecorator}=this.props.form
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4
            },
            wrapperCol:{
                xs:24,
                sm:12
            }
        }
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span:12,
                    offset:4
                }
            }
        }
        return(
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal">
                    <FormItem label="用户名" {...formItemLayout}>
                                {
                                    getFieldDecorator('userName',{
                                        initialValue:'',
                                        rules:[{ required: true, message: '用户名不能为空' }]
                                    })(
                                        <Input  placeholder='请输入用户名'/>
                                    )
                                    
                                }
                                
                    </FormItem>  
                    <FormItem label="密码" {...formItemLayout}>
                                {
                                    getFieldDecorator('password',{
                                        initialValue:'',
                                        rules:[{ required: true, message: '密码不能为空' }]
                                    })(
                                        <Input type="password" placeholder='请输入密码'/>
                                    )
                                    
                                }
                                
                    </FormItem> 
                    <FormItem label="性别" {...formItemLayout}>
                                {
                                    getFieldDecorator('sex',{
                                        initialValue:'1'
                                        
                                    })(
                                       <RadioGroup>
                                           <Radio value="1">男</Radio>
                                           <Radio value="2">女</Radio>
                                       </RadioGroup>
                                    )
                                    
                                }
                                
                    </FormItem> 
                    <FormItem label="年龄" {...formItemLayout}>
                                {
                                    getFieldDecorator('age',{
                                        initialValue:18
                                        
                                    })(
                                        <InputNumber />
                                    )
                                    
                                }
                                
                    </FormItem> 
                    <FormItem label="当前状态" {...formItemLayout}>
                                {
                                    getFieldDecorator('state',{
                                        initialValue:'2'
                                        
                                    })(
                                        <Select>
                                            <Option value='1'>咸鱼一条</Option>
                                            <Option value='2'>风华浪子</Option>
                                            <Option value='3'>北大才子一枚</Option>
                                            <Option value='4'>百度FE</Option>
                                            <Option value='5'>创业者</Option>
                                        </Select>
                                        // 必须要有value值，因为提交的时候提交给后台接口，他怎么拿取值呢通过value啊
                                    )
                                    
                                }
                                
                    </FormItem> 
                    <FormItem label="爱好" {...formItemLayout}>
                                {
                                    getFieldDecorator('hobby',{
                                        initialValue:['2','3','1']
                                        
                                    })(
                                        <Select mode="multiple">
                                            <Option value='1'>游泳</Option>
                                            <Option value='2'>打篮球</Option>
                                            <Option value='3'>踢足球</Option>
                                            <Option value='4'>爬山</Option>
                                            <Option value='5'>麦霸</Option>
                                            <Option value='6'>桌球</Option>
                                            <Option value='7'>跑步</Option>
                                            <Option value='8'>骑行</Option>
                                        </Select>
                                       
                                    )
                                    
                                }
                                
                    </FormItem>
                    <FormItem label="是否已婚" {...formItemLayout}>
                                {
                                    getFieldDecorator('ismarried',{
                                        valuePropName:'checked',
                                        initialValue:true
                                        
                                    })(
                                        <Switch />
                                    )
                               //在我们写的话是用c3的样式实现的     
                                }
                                
                    </FormItem>
                    <FormItem label="生日" {...formItemLayout}>
                                {
                                    getFieldDecorator('birthday',{
                                        
                                        initialValue:moment('2019-06-03')
                                    })(
                                       <DatePicker 
                                            showTime
                                            format='YYYY-MM-DD HH:mm:ss'
                                       
                                       /> 
                                    )
                               //需要moment第三方插件
                               //使用getFieldDecorator是为了使我们的里面的插件获得组件可以进行双向 数据传递
                                }
                                
                    </FormItem>
                    <FormItem label="联系地址" {...formItemLayout}>
                                {
                                    getFieldDecorator('address',{})(
                                        <TextArea
                                        placeholder="Autosize height with minimum and maximum number of lines"
                                        autosize={{ minRows: 2, maxRows: 6 }}
                                        /> 
                                    )
                                 
                                }
                                
                    </FormItem>
                    <FormItem label="早起时间" {...formItemLayout}>
                                {
                                    getFieldDecorator('time',{})(
                                        <TimePicker />
                                        
                                    )
                                 
                                }
                                
                    </FormItem>
                    <FormItem label="上传头像" {...formItemLayout}>
                                {
                                    getFieldDecorator('userImg',{})(
                                        <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        // beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                      >
                                        {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : <Icon type="plus"/>}
                                      </Upload>
                                        
                                    )
                                 
                                }
                                
                    </FormItem>
                    <FormItem {...offsetLayout}>
                                {
                                    getFieldDecorator('userImg',{})(
                                        <Checkbox>我已阅读过<a>慕课协议</a></Checkbox>
                                    )
                                 
                                }
                                
                    </FormItem>
                    <FormItem {...offsetLayout}>
                                {
                                    getFieldDecorator('userImg',{})(
                                    
                                    <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                                        )

                                 
                                }
                                
                    </FormItem>


                    
                        
                    </Form>                
                
                </Card>
            </div>
        );
    }
}
export default Form.create()(FormRegister);