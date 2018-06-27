import React from 'react';
import { compose, branch, renderComponent, withHandlers , withState, defaultProps} from 'recompose';
import DecisionElementOptions from './components/DecisionElementOptions';
import DecisionElementActions  from './containers/DecisionElementActions';







const enhance = compose(
    //modalHOC,
    defaultProps({
        id: '',
    }),
    withState('step', 'setStep', 0),
    withState('details', 'setDetails', props => props.details),

    withHandlers({
        goTo: props => step => {
            // check if we've added at least one
            const callback = () => {
                props.setStep(step);
            };
            props.form.validateFields((err, values) => {
                //console.log(err);
                //console.log(values);
                //console.log(props.form.isFieldsTouched());
                if (!err) {
                    console.log(step);
                    if (step === 1) {
                        //console.log(props);
                        // save blocks if they are new or has been edited
                        if (props.form.isFieldsTouched()) {
                            const saveCallback = (element) => {
                                console.log(element);
                                // save the new info
                                props.setDetails(element.itemInfo);
                                callback();
                            }
                            props.handleSave(saveCallback);
                        } else {
                            callback()
                        }
                    } else {
                        callback()
                    }
                }
            });
        }
    }),
    withHandlers({
        next: props => event => {
            const current = props.step + 1;
            props.goTo(current);
        },
        prev: props => event => {
            const current = props.step - 1;
            props.goTo(current);
        },
    }),
    branch(props => {
        return props.step===1;
    }, renderComponent(DecisionElementActions)),
);


const DecisionElementOptionsEnhanced = enhance(DecisionElementOptions);

export default DecisionElementOptionsEnhanced;

//
// export default class DecisionElementFormFields extends React.Component {
//     state = {
//         open: false
//     }
//     handleAdd = () => {
//         if (this.props.id) {
//             this.setState({open:true});
//         } else {
//              this.props.handleSave(() => this.setState({open:true}));
//         }
//
//     }
//     closeAdd = () => {
//         this.setState({open:false})
//     }
//
//     prepareOptions = () => {
//         const ids = this.props.form.getFieldValue('ids');
//         const options = this.props.form.getFieldValue('options');
//
//         return options.map((option, i) => {
//             const id = ids && ids[i] || '';
//             return {value:id, label:option};
//         });
//     }
//     render() {
//         return (
//             <React.Fragment>
//                 <DecisionElementOptions {...this.props} onAdd={this.handleAdd} />
//                 {this.state.open && <DecisionElementActions options={this.prepareOptions()} {...this.props} onClose={this.closeAdd} />}
//             </React.Fragment>
//         );
//     }
// }




export const prepareInput = (values) => {
    //console.log(values);
    const {title, schedule} = values;
    let {keys, options, ids=[]} = values;
    //console.log(values);
    //console.log(options);
    options = keys.map(i => {
        const id =  ids[i] || '';// ? timesPerHour[i]['id'] : '';
        const option = options[i] || '';
        return {id, 'label': option}
    });

    return {
        schedule:schedule,
        decisionElement: {
            title:title,
            options:options
        }
    }
}


