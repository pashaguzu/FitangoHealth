
// /**
//  * Created by Павел on 05.02.2018.
//  */
// import React from 'react';
// import {shallow } from 'enzyme';
// import { expect } from 'chai';
// //import Login from '../../containers/loginContainer';
// import Login from './index';
//
// describe('Login', () => {
//     it('corect data', () => {
//     //const wrapper = shallow(<Login wrappedComponentRef={(inst) => this.formRef = inst}/>);
//     // const myForm = wrapper.props().form;
//     // myForm.getFieldDecorator('email',{initialValue:"demo2patient@fitango.com"});
//     // myForm.getFieldDecorator('password',{initialValue:"Fitango2"});
//     // expect(myForm.getFieldsValue().email).equal("demo2patient@fitango.com");
//     // expect(myForm.getFieldsValue().password).equal("Fitango2");
//     // wrapper.dive().instance().handleSubmit();
// });
// });

/**
 * Created by Павел on 05.02.2018.
 */
import React from 'react';
import {shallow ,mount } from 'enzyme';
import Login from './index';

const wrapperFunc = (props) => {
    return mount(<Login {...props} />);
};
describe('<Login>', () => {
    const setup = () => {
        const correctLogin =
        {
            email: 'demo2patient@fitango.com',
            password: '!fdsd@_sdfo2'
        };
        const incorrectLogin =
            {
                email: 'incorrect@fitango.com',
                password: 'incoor'
            };
        const LoginForm = wrapperFunc(correctLogin);
        const LoginFormIncorrect = wrapperFunc(incorrectLogin);
        return {
            LoginForm,
            LoginFormIncorrect,
        };
    };
    it('renders without crashing', () => {
        const div = document.createElement('div');
        let component = withRouter(div);
        ReactDOM.render(<Login />,component);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('correct data input', () => {
        const {LoginForm} = setup();
        let loginForm = LoginForm.find("#submitForm");
        loginForm.props().onSubmit();
        expect(LoginForm.state('success')).toBe(true);
    });
    it('incorrect data input', () => {
        const {LoginFormIncorrect} = setup();
        let loginForm = LoginFormIncorrect.find("#submitForm");
        loginForm.props().onSubmit();
        expect(LoginForm.state('success')).toBe(false);
    });
})

