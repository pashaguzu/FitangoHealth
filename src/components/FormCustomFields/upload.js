import React from 'react';
import {Button} from 'antd';
import {compose, withHandlers, withState} from 'recompose';
import {DashboardModal, Dashboard} from 'uppy/lib/react';
import Uppy from 'uppy/lib/core';
import 'uppy/dist/uppy.min.css';

const Transloadit = require('uppy/lib/plugins/Transloadit')
const Webcam = require('uppy/lib/plugins/Webcam')
const Url = require('uppy/lib/plugins/Url')
const GoogleDrive = require('uppy/lib/plugins/GoogleDrive')
const Dropbox = require('uppy/lib/plugins/Dropbox')

 class Upload extends React.Component {


     static defaultProps = {
         template:'',
         waitForEncoding:true,
         maxNumberOfFiles:1,
         simpleResult:false// if result should be just Key-value
     }

     getTemplateId = () => {
         switch(this.props.template) {
             case 'userpic':
                 return 'c3fa91f909b04bbd9e49816ef20bae5c';
                 break;
             case 'instructions_image': // autoresize after 557px
                 return '8b0e16cb5eb147ecb80f76e9ba448db1';
                 break;
             case 'instructions_video':
                 return 'f11c96b437a6443daa5ff2eef013af12';
                 break;
             case 'pdf':
                 return 'a5654c479c5d4bc286cbba427fb713be';
                 break;
             case 'ppt':
                 return '51442da2aafb464a899849622459b5b5';
                 break;
             case 'mp3':
                 return 'dd8859c2eeb84b64b6ee21bbb8ce9810';
                 break;
             case 'document':
                 return '1fcf4f37660e47f78c0a198c60775f14';
                 break;
             case 'attachments':
                return 'ac4d8a2e9fbb4e8fa36f540798e8176b';
                 /*
                 use: {
          steps: [ ':original' ],
          fields: [ 'file_input_field2' ]
        },
                  */
                 break;
         }

     }
     componentWillMount () {
        const {onComplete, simpleResult, maxNumberOfFiles, allowedFileTypes=false} = this.props;
         this.uppy = new Uppy({
             //meta: { type: 'avatar' },
             restrictions: {
                 maxFileSize: 8000000,
                 maxNumberOfFiles: this.props.maxNumberOfFiles,
                 allowedFileTypes: allowedFileTypes
             },
             autoProceed: this.props.maxNumberOfFiles === 1
         }).use(Transloadit, {
             // Transloadit plugin options
             params: {
                 auth: { key: 'f0ae93b755c346b4864e79e9ac3613ed' },
                 template_id:  this.getTemplateId()
             },
             waitForEncoding: this.props.waitForEncoding// we need this only for images and files - we don't need that for video!
             //waitForMetadata:true
         })
         /* .on('transloadit:result', (stepName, result) => {
              //const file = uppy.getFile(result.localId)
              console.log(stepName);
              console.log(result);
          })*/
          .on('transloadit:complete', (assembly) => {
            //console.log();

            if (simpleResult) {
                let {results} = assembly;
                if (maxNumberOfFiles === 1) {

                    const newResults = {};
                    results = Object.keys(results).map(key => {
                        const infos = results[key];
                        const info = infos[0];

                        newResults[key] = info.signed_ssl_url;
                        return null;
                    })
                    results = newResults;
                }
                //console.log(results);
                if (maxNumberOfFiles === 1) {
                    onComplete(results);
                }
            } else {
                //assembly
                onComplete(assembly);
            }


      }).use(Webcam).use(GoogleDrive).use(Dropbox).run()
     }

     componentWillUnmount () {
         this.uppy.close()
     }

     render () {
         const {note, open=false, onComplete, onClose = null} = this.props
         //console.log(this.props);
         //Dashboard
         return (
                 <DashboardModal
                      disableThumbnailGenerator
                      hideProgressAfterFinish
                      disablePageScrollWhenModalOpen={false}
                      closeModalOnClickOutside
                     uppy={this.uppy}
                     open={open}
                     onRequestClose={onClose}
                     note={note}
                     plugins={['Webcam', 'GoogleDrive', 'Dropbox']}

                      metaFields = {[
                         { id: 'caption', name: 'Caption', placeholder: 'Describe what the file is about' }
                     ]}
                 />
         )
     }
}

const enhance = compose(
    /*withState('open', 'setOpen', props=>props.open),
    withHandlers({
        toggleOpen: props =>()=> {
            props.setOpen(!props.open);
        }
    })*/
)
export default enhance(Upload);