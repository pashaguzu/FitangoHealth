import React from 'react';
import { compose, branch, renderComponent} from 'recompose';
import TreatmentBlockOptionElementEditor  from './containers/TreatmentBlockOptionElementEditor';
import ChemotherapyElementEditor  from './containers/TreatmentChemotherapyElementEditor';
import ClinicalTrialEditor  from './containers/ClinicalTrialEditor';
import OncologyEditor  from './containers/OncologyEditor';
import RadiologyEditor  from './containers/RadiologyEditor';
import RadiationEditor  from './containers/RadiationEditor';
import PathalogyEditor  from './containers/PathalogyEditor';

const enhance = compose(
    branch(props => props.type === 'chemotherapy', renderComponent(ChemotherapyElementEditor)),
    branch(props => props.type === 'clinical_trial', renderComponent(ClinicalTrialEditor)),
    branch(props => props.type === 'oncology', renderComponent(OncologyEditor)),
    branch(props => props.type === 'radiology', renderComponent(RadiologyEditor)),
    branch(props => props.type === 'radiation', renderComponent(RadiationEditor)),
    branch(props => props.type === 'pathology', renderComponent(PathalogyEditor)),
);
export default enhance(TreatmentBlockOptionElementEditor);