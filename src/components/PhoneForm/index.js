import React from 'react';

import {Input,Select } from 'antd';
import {
    injectIntl
} from 'react-intl';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const InputGroup = Input.Group;
const Option = Select.Option;





class PhoneForm extends React.Component{


    static defaultProps = {
        required:false,
        phone: {code:'+1', number:''},
        prefix: 'phone'
    }



    render(){

        const { required, prefix, countries,  getFieldDecorator, phone } = this.props;
        //let {required} = this.props;

        const {code, number} = phone;

        return (
                <InputGroup compact >

                        {getFieldDecorator(prefix+'[code]', {
                            initialValue: code,
                            rules: [{ required: required, message: 'Please select code' }],
                        })(
                            <Select style={{width:'100px'}} notFoundContent="Loading...">
                                {countries.map(country => <Option key={country.id} value={country.id}>{country.phoneCode} ({country.name})</Option>)}
                            </Select>
                        )}
                        {getFieldDecorator(prefix+'[number]', {
                            initialValue: number,
                            rules: [{ required: required, message: "Please input your phone number."}/*, {type:'number', message: "Phone number consist of numbers only."}*/],
                        })(
                            <Input  style={{ width: '200px' }} />
                        )}


                </InputGroup>
        );
    }

}




const countriesQuery = gql`
   query getCountries {
        staticContent {
            countries {
                id
                name
                phoneCode
            }
        }
    }
`;


const PhoneFormWithQuery = graphql(countriesQuery,
    {
        props: ({ownProps, data}) => {
            if (!data.loading) {
                return {
                    ...ownProps,
                    countries: data.staticContent.countries,
                    loading: data.loading,
                }

            } else {
                return {...ownProps,loading: data.loading, countries: []}
            }
        },
    }
)(PhoneForm);

export default injectIntl(PhoneFormWithQuery);
