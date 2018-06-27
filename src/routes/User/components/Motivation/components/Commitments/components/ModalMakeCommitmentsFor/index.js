/**
* Created by Павел on 12.02.2018.
*/
import React from 'react';
import {Button ,Row,Col,Avatar,Spin,Select, DatePicker ,Form, Input, InputNumber,Modal } from 'antd';
import {
    injectIntl
} from 'react-intl';
import {LoadingModal} from 'components/Loading';

import ru from './i18n/ru';
import en from './i18n/en';
const FormItem = Form.Item;
const {Option} = Select;
class ModalMakeCommitmentsFor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:true
        };
    }
    onChange = () => {
        this.setState({ visible: false});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {onSubmit}  = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                });

                return onSubmit(values);
            }
        });
    }

    render() {
        const  {loading} = this.props;
        if (loading) {
            return    <LoadingModal/> ;
        }
        const {intl}=this.props;

        const {motivators,charitiesEnum}=this.props;
        const {edges}=motivators;

        const { getFieldDecorator } = this.props.form;
        const children = [];
        const enumChildren = [];
        edges.forEach(item =>{
            children.push(<Option key={item.id}>{item.user.firstName}</Option>);
    })
        charitiesEnum.forEach(item =>{
            enumChildren.push(<Option key={item.name}>{item.description}</Option>);
    })


        return  (

            <Modal
                style={{height:800, width: 800 }}
                title={intl.messages.user_motivation_make+this.props.title}
                visible={true}
                onCancel={this.props.cancelParent}
                footer={[
                    <center> <Button type="primary" onClick={this.handleSubmit} htmlType="submit"  >{intl.messages.user_motivation_finish}</Button></center>
                ]}
            >
                <div>
                    <Form onSubmit={this.handleSubmit} id="submitForm" className="login-form">
                        <Row>
                            <Col span={24}>
                                <p> {intl.messages.user_motivation_complete}  {this.props.title}</p>
                            </Col>
                            <Col  span={6}>
                                <FormItem>
                                    {getFieldDecorator('date')(

                                        <DatePicker />
                                    )}
                                </FormItem>
                            </Col>
                            <Col offset={1} span={3}>
                                {intl.messages.user_motivation_will}

                            </Col>
                        </Row>
                        <br/>
                        <Row>

                            <Col span={7}>
                                <center>
                                    <Avatar style={{
                                        verticalAlign: 'middle'
                                    }} size="large"  />

                                    <span
                                        style={{textAlign: 'center', 'marginLeft': 10}}><p>{intl.messages.user_motivation_pay}</p>
                                            </span>
                                    <FormItem>
                                        {getFieldDecorator('motivators')(

                                            <Select
                                                mode="multiple"
                                                placeholder={intl.messages.user_motivation_select}
                                                onChange={this.handleChange}
                                            >
                                                {children}
                                            </Select>
                                        )}

                                    </FormItem>
                                    <Col style={{marginBottom: 10}} span={13}>
                                        <span>{intl.messages.user_motivation_howmuch}</span>
                                    </Col>
                                    <Col style={{marginBottom: 10}} offset={1} span={10}>
                                        <FormItem>
                                            {getFieldDecorator('payment')(

                                                <InputNumber
                                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                />
                                            )}

                                        </FormItem>
                                    </Col>
                                </center>
                            </Col>

                            <Col offset={2} span={7}>
                                <center>
                                    <Avatar style={{
                                        verticalAlign: 'middle'
                                    }} size="large"  />
                                    <span
                                        style={{textAlign: 'center', 'marginLeft': 10}}><p>{intl.messages.user_motivation_donate}</p>
                                            </span>
                                    <FormItem>
                                        {getFieldDecorator('organization')(

                                            <Select placeholder={intl.messages.user_motivation_select} >
                                                {enumChildren}
                                            </Select>
                                        )}

                                    </FormItem>

                                    <Col style={{marginBottom: 10}} span={13}>
                                        <span>{intl.messages.user_motivation_howmuch}</span>
                                    </Col>
                                    <Col style={{marginBottom: 10}} offset={1} span={10}>
                                        <FormItem>
                                            {getFieldDecorator('donate')(

                                                <Input
                                                    prefix="$"
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                </center>
                            </Col>

                            <Col  offset={2}  span={5}>
                                <center>
                                    <Avatar style={{
                                        verticalAlign: 'middle'
                                    }} size="large"  />
                                    <span
                                        style={{textAlign: 'center', 'marginLeft': 10}}><p>{intl.messages.user_motivation_other}</p>
                                            </span>

                                     <FormItem>
                                        {getFieldDecorator('description')(

                                            <Input />
                                        )}

                                    </FormItem>
                                </center>
                            </Col>



                        </Row>
                        <Row>
                            <Col  span={12}>
                                {intl.messages.user_motivation_add}
                            </Col>
                            <Col    span={12}>
                                <FormItem>
                                    {getFieldDecorator('url')(

                                        <Input  />
                                    )}

                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        );
    }
}

const WrappedModalMakeCommitmentsFor = Form.create()(ModalMakeCommitmentsFor);
export default injectIntl(WrappedModalMakeCommitmentsFor);
