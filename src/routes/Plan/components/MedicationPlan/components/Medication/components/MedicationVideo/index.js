import React from 'react'
import {LoadingModal} from 'components/Loading';
import {Modal} from 'antd';


export default class MedicationVideo extends React.Component {

    render() {
        const {drug={},loading} = this.props;

        if (loading) {
            return <LoadingModal />
        }

        const {videos=[]} = drug;

        return <Modal
            title={drug.name}
            visible={true}
            onCancel={this.props.onHide}
            footer={false}
        >
            {videos.length > 0 ?
            videos.map(video => <video key={video} src={video} preload="auto" controls style={{width:'100%'}}></video>)
            :
                'This video is not available at the moment'
            }

        </Modal>

    }
}