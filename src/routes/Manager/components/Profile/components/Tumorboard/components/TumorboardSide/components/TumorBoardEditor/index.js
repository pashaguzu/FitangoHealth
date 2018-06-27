import React from 'react';
import {Form, Button} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import {TumorboardManager} from "../../../../../../../Tumorboard/components/TumorboardManager";
import {tumorboardMutation} from "../../../../../../../Tumorboard/containers/TumorboardManager";

const TumorBoardEditor = props => {
    return <div>
        <TumorboardManager {...props} />
        <div style={{textAlign:'right'}}>
        <Button type="primary" onClick={props.onSubmit}>Next</Button>
        </div>
    </div>
}

const enhance = compose(
    tumorboardMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            console.log(props, 'Props before input');
            props.form.validateFields((err, values) => {
                //console.log(err);
                //console.log(values);
                if (!err) {
                    let input = values;

                    props.onSubmit(input).then(({data})=> {
                        //console.log(data);
                        //const {}
                        // set
                        props.setStep(1);

                        // if (data.tumorboardCreate) {
                        //     props.setTumorboard(data.tumorboardCreate);
                        // }
                        //props.setTumorboard();
                        //props.onHide();
                    });
                }
            });
        }
    }),
);


export default enhance(TumorBoardEditor);