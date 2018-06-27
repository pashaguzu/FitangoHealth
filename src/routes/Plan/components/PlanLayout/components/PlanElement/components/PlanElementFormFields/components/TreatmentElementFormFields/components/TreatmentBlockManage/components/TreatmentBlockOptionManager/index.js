import React from 'react';
import { compose, branch, renderComponent} from 'recompose';
import TreatmentBlockOptionElementEditor  from './containers/TreatmentBlockOptionElementEditor';
import TreatmentBlockOptionDecisiontEditor  from './containers/TreatmentBlockOptionDecisiontEditor';



const isTypeDecision = ({ type }) => (type === 'decision');

const conditionalRender = (states) =>
    compose(...states.map(state =>
        branch(state.when, renderComponent(state.then))
    ));

const enhance = compose(
    conditionalRender([
        { when: isTypeDecision, then: TreatmentBlockOptionDecisiontEditor }
    ])
);

export default enhance(TreatmentBlockOptionElementEditor);