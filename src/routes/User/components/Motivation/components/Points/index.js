/**
 * Created by Павел on 12.02.2018.
 */
import React from 'react';
import {Progress , Icon,Card } from 'antd';
import ModalPointsHistory from './containers/ModalPointsHistory'
import {
    injectIntl
} from 'react-intl';
import ru from './i18n/ru';
import en from './i18n/en';
class Points extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };
    }
    showModal = () => {
        this.setState({visible: true});
    }
    handleCancel = () => {
        this.setState({ visible: false});
    }
    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return  <Card style={{height:250}} loading title="My Points" >
               </Card>;
        }
        const {points,nextLevel} = info.currentLevel;
        const {amount,title} = nextLevel;
        let remainingPoint = amount-points;
        const {intl}=this.props;
        const percent = Math.round(points/amount*100);
        return  (
            <Card style={{height:250}} title={intl.messages.user_motivation_mypoints}>


                { this.state.visible && <ModalPointsHistory handleCancel={this.handleCancel}/>}


                <center>
                    <Icon type="star" style={{ fontSize: 40, color: '#FFFF00' }} onClick={this.showModal} />
                </center>
                    <Progress percent={percent} />

               <center><span><h2>{points}</h2></span></center>
                <center><span>{remainingPoint} {intl.messages.user_motivation_pointsNext} {title} {intl.messages.user_motivation_level}</span></center>
            </Card>

        );
    }
}
export default injectIntl(Points);