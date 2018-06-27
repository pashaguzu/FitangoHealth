import React from 'react';
import {Form, Input, Button, Icon, Checkbox, Tooltip} from 'antd';
import {injectIntl} from 'react-intl';


class TreatmentBlockOptions extends React.Component {

    render() {
        const {options} = this.props;
        console.log(options);
        return (

            <React.Fragment>
                {options.map((option, i) => {
                    return <div key={i}>{option.title}</div>
                })}

            </React.Fragment>
        );
    }
}

export default injectIntl(TreatmentBlockOptions);

