import React from 'react';
//import  '../../../../vendors/redactor/redactor';
//import '../../../../vendors/redactor/redactor.min.css';
//import Trumbowyg from 'react-trumbowyg';

import {compose, lifecycle, withState, withHandlers} from 'recompose';

const WysiwygPure = props => {
    return <textarea id={'content'} value={props.value} onChange={props.fakeOnChange} />;
}

const enhance = compose(
    withState('value', 'setValue', props=> props.value || ''),
    withHandlers({
        fakeOnChange: props => (value) => {
          // fake value
        },
        triggerChange: props => (value) => {
            props.setValue(value);
            const onChange = props.onChange;
            if (onChange) {
                onChange(value);
            }
        }
    }),
    lifecycle({
        componentDidMount() {
            const triggerChange = this.props.triggerChange;
            window.$R('#content', {
                minHeight: '100px',
                plugins: ['alignment','fontcolor','fontsize', 'fontfamily', 'widget', 'video', 'table', 'imagemanager'],
                imageUpload: 'http://2clinic.fitangolocal.com/scripts/ajax/utilities/upload/wysiwyg_upload_url.php',
                //imageUpload: 'https://fitangodemo.fitango.com/scripts/ajax/utilities/upload/wysiwyg_upload_url.php',
                imageUploadParam: 'file',
                callbacks: {
                    synced: function(html)
                    {
                        triggerChange(html);
                        // ...
                        // console.log(name);
                        // console.log(data);
                        //onSave()
                    }
                }
            });
        },
        componentWillUnmount() {
            window.$R('#content', 'destroy');
        }

    })
);
export const Wysiwyg = enhance(WysiwygPure);

