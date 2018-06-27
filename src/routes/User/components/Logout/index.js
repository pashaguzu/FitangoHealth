import React from 'react';
import { Redirect} from 'react-router-dom'

class NormalLogoutForm extends React.Component{

    componentWillMount() {
        //this.props.mutate();
    }

    render(){
        console.log(111);
        this.props.logout();

        /*
        this.props.mutate().then((data) => {
            if (!data.loading) {

                this.props.logout();

                return(
                    <Redirect to={{pathname: '/'}} />
                )
            }
        })*/


      //return ('')

        return(
            <Redirect to={{pathname: '/'}} />
        )

    }
}
export default NormalLogoutForm;