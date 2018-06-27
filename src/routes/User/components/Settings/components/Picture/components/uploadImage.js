import React from 'react';
import {Button} from 'antd';
import {DashboardModal} from 'uppy/lib/react';
import Uppy from 'uppy/lib/core';
import 'uppy/dist/uppy.min.css';

const Transloadit = require('uppy/lib/plugins/Transloadit')
const Webcam = require('uppy/lib/plugins/Webcam')
const Url = require('uppy/lib/plugins/Url')
const GoogleDrive = require('uppy/lib/plugins/GoogleDrive')
const Dropbox = require('uppy/lib/plugins/Dropbox')

 class AvatarPicker extends React.Component {

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
         }

     }
     componentWillMount () {
        const {onComplete, simpleResult, maxNumberOfFiles} = this.props;
         this.uppy = new Uppy({
             //meta: { type: 'avatar' },
             restrictions: { maxNumberOfFiles: this.props.maxNumberOfFiles },
             autoProceed: true
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
          //console.log(assembly);
            let {results} = assembly;
            //console.log(results);
            if (simpleResult) {
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
            }
              //console.log(results);
              onComplete(results);

      }).use(Webcam).use(GoogleDrive).use(Dropbox)
             .run()
     }

     componentWillUnmount () {
         this.uppy.close()
     }

     render () {
         return (
                 <DashboardModal
                     disableThumbnailGenerator
                     hideProgressAfterFinish
                     disablePageScrollWhenModalOpen={false}
                     uppy={this.uppy}
                     closeModalOnClickOutside
                     open={true}
                     onRequestClose={this.handleClose}
                     plugins={['Webcam', 'GoogleDrive', 'Dropbox']}
                 />
         )
     }
}
export default AvatarPicker;