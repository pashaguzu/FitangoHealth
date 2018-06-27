import React from 'react';
import {Row, Col} from 'antd';
import './index.less';


class TextElementTipIcons extends React.Component {

    constructor(props) {
        super(props);

        const value = this.props.value || undefined;
        //console.log(props);
        this.state = {
            icon: value
        };
    }

    static defaultProps = {
        tip:false,
        embed:false,
        isWysiwyg:true,
        tipboxes:[],// list of possible tipboxes
        details:{}
    }

    /*componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        // Should be a controlled component.
        if (!nextProps.loading) {
            const value = nextProps.value || undefined;
            this.setState(value);
        }
    }*/

    setTipbox = (icon) => {
        this.setState({icon});
        this.triggerChange({ icon });
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            const icon = changedValue.icon;
            onChange(icon);

        }
    }

    render() {
        const {tipboxes} = this.props;
        const {icon} = this.state
        return (
             <Row className="tipbox-icons">{tipboxes.map(tipbox => {
                 return <Col md={4} key={tipbox.value}><img className={icon === tipbox.value ? 'active' : '' } src={tipbox.label} onClick={() => this.setTipbox(tipbox.value)} /></Col>
                        })}
             </Row>
        );
    }
}

export default TextElementTipIcons;

