/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react';
import {Progress , Card } from 'antd';
import {
    injectIntl
} from 'react-intl';
import ru from './i18n/ru';
import en from './i18n/en';
class Medications extends React.Component {

    render() {
        const{level} = this.props.medications;
        const {intl}=this.props;
        return  (
            <Card style={{height:250}} title={intl.messages.user_motivation_medications}>
                <center>
                    <Progress type="dashboard" percent={level} />
                </center>
            </Card>

        );
    }
}
export default injectIntl(Medications);