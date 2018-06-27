import { connect } from 'react-redux'

import PlanBodyMenu from '../components/PlanBodyMenu'
import {setPlanTab } from '../../../../../../Plan/modules/plan'


/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
        // view store:
        tab:  state.plan.get('tab')
        // userAuth:
        //plan: state.plan,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTab: (tab) => {dispatch(setPlanTab({tab}))},
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlanBodyMenu);