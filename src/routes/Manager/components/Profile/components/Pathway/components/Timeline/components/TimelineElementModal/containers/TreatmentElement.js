import {TreatmentElementBuilder, enhance} from '../../../../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/TreatmentElementBuilder';
import {modalHOC} from '../modal';
import { compose, branch, renderComponent, withProps, withHandlers, defaultProps, mapProps} from 'recompose';

const enhanceProps = compose(
    withProps(props => {

        const {element={}, details={}, resetInitInfo=false} = props;
        //console.log(props, 'KKKKKK');
        const {details:treatmentDetails} = details;
        if (resetInitInfo) {
            console.log(props, 'Treatment Elements');
            //const {itemInfo = {}} = element;
            let {elements = []} = details;
            elements = elements.map(element => {
                return {...element, id: '', __typename:undefined  };
            });
            //console.log(elements);
            // reset element
            const newDetails = {
                ...details,
                id: '',
                elements: elements,
                __typename:undefined
            };
            return {
                details: newDetails,
                element: {
                    ...element,
                    id: '',
                    itemId: '',
                    itemInfo: newDetails,
                    __typename:undefined
                },
                elements:elements,
                __typename:undefined
            }
        } else {
            return {
                details: treatmentDetails
            }
        }

    }),
    enhance,
    modalHOC
)

export default enhanceProps(TreatmentElementBuilder);