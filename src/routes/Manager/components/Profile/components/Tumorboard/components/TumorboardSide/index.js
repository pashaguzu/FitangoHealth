import React from 'react';
import {Card} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import TumorboardSideContent from './containers/TumorboardSideContent';
import {withSpinnerWhileLoading} from "../../../../../../../../components/Modal/index";

export const TumorboardSide = props => {
    const {tumorboard={}, us} = props;
    const {id=''} = tumorboard;
    let title = id !== '' ? 'Tumor Board' : 'New Tumor Board';
    return <Card title={title}>
        <TumorboardSideContent {...props} />
    </Card>;
}

const enhance = compose(
    withSpinnerWhileLoading,
    withState('step', 'setStep', 0),// 0 - means the first item
    // withHandlers({
    //     saveTumorboard: props => value => {
    //
    //     }
    // })
);

export default enhance(TumorboardSide);