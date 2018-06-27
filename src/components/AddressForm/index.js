import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {Input,Col,Select } from 'antd';
import {
    injectIntl
} from 'react-intl';

const InputGroup = Input.Group;
const Option = Select.Option;
class AddressForm extends React.Component{
    static defaultProps = {
        required:false,
        address: {line1:'', line2:'',country:'',city:'', state:'', zipcode:''}
    }

    toggleStates = (e) => {
        if (e === 'MQ') {
            // if this is states
        }
    }


    render(){
        const { countries, states, getFieldDecorator, address, required } = this.props;
        const {line1, line2,country,city, state, zipcode} = address;

        const prefix = 'address';
        return (
            <div>
                {getFieldDecorator(prefix+'[line1]', {
                    initialValue: line1,
                    rules: [{ required: required, message: 'Please enter Address' }],
                })(
                    <Input placeholder={'Line 1'} />
                )}
                {getFieldDecorator(prefix+'[line2]', {
                    initialValue: line2
                })(
                    <Input placeholder={'Line 2'} />
                )}
                <InputGroup >
                    <Col span={6}>
                        {getFieldDecorator(prefix+'[country]', {
                            initialValue: country,
                            rules: [{ required: required, message: 'Please select country' }],
                        })(
                            <Select placeholder={'Country'} style={{width:'100%'}} onChange={this.toggleStates}>
                                {countries.map(country => <Option key={country.id} value={country.id}>{country.name}</Option>)}
                            </Select>
                        )}
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator(prefix+'[city]', {
                            initialValue: city
                        })(
                            <Input placeholder={'City'} />
                        )}
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator(prefix+'[state]', {
                            initialValue: state,
                        })(
                            <Select placeholder={'State'} style={{width:'100%'}}>
                                {states.map(state => <Option key={state.id} value={state.name}>{state.name}</Option>)}
                            </Select>
                        )}
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator(prefix+'[zipcode]', {
                            initialValue: zipcode,
                            rules: [{ required: required, message: 'Please select zipcode' }],
                        })(
                            <Input placeholder={'Zipcode'} />
                        )}
                    </Col>
                </InputGroup>
            </div>
        );
    }
}






const countriesStatesQuery = gql`
   query getCountries {
        staticContent {
            countries {
                id
                name
                phoneCode
            }
            states {
                id
                name
            }
        }
    }
`;


const AddressFormWithQuery = graphql(countriesStatesQuery,
    {
        props: ({ownProps, data}) => {
            if (!data.loading) {
                return {
                    ...ownProps,
                    countries: data.staticContent.countries,
                    states: data.staticContent.states,
                    loading: data.loading,
                }

            } else {
                return {...ownProps,loading: data.loading, countries: [], states:[]}
            }
        },
    }
)(AddressForm);

export default injectIntl(AddressFormWithQuery);