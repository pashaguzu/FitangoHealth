import React from 'react';
import PlanElementManager from '../../containers/PlanElementManager';

export default class PlanElementAdd extends React.Component {

   constructor(props) {
       super(props);

       this.state = {
           id: props.id || null
       }
   }

    onAdd = (id) => {
       this.setState({id});
    }


    render() {
        return (
            <PlanElementManager {...this.props} id={this.state.id} onAdd={this.onAdd} />
        );
    }
}
