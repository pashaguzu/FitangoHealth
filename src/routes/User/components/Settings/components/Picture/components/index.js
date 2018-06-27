/**
 * Created by Pavel on 08.12.2017.
 */
import React from 'react';
import {Button} from 'antd';
import Avatar from '../../../../../components/Avatar';
import './index.less';

import UploadImage from './uploadImage';

class PictureForm extends React.Component{

    state = {
        modalOpen: false,
        avatar:''
    }

    /**
     * Submit the password form
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;

    }

    onComplete = (results) => {
        console.log(results);
        const {original, thumb25, thumb40, thumb80, thumb150} = results;
        this.props.updatePicture({original:original,large:thumb150, medium:thumb80, small:thumb25});
        this.setState({avatar:thumb150 });
        this.handleClose();

    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.loading) {
            const {thumbs={large:''}} = nextProps;
            const {large} = thumbs;

            this.setState({avatar:large});
        }
    }




    handleOpen = () => {
        this.setState({
            modalOpen: true
        })
    }

    handleClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    render(){


        const {letter = ''} = this.props;
        return(

            <center>
                <Avatar size="huge"  src={this.state.avatar}>{letter}</Avatar>
                <div style={{marginTop:5}}>  <Button onClick={this.handleOpen}>Change avatar</Button>
                    {this.state.modalOpen && <UploadImage template='userpic' onComplete={this.onComplete} simpleResult />}
                </div>
            </center>

        );
    }

}

export default PictureForm;
