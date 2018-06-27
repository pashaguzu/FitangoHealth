import Profile from '../components/Profile';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {CancerFragment} from "../components/Cancers/containers/CancerManager";
import {compose, branch, withHandlers, withState, withProps} from 'recompose';

const GET_PROFILE  = gql`
 query GET_PROFILE($user_id:UID) {
  patient(id: $user_id) {
    id
    fullName
    thumbs {
      original
      small
      large
      medium
      wide
    }
    gender
    genderText
     age
     addressText
     phoneFormatted
     birthday
     email
     getUserNetwork {
        id
        joinedDate
        lastLoginDate
     }
     
     getAdherence {
        medications {
            level
            color
            description
        }
        total {
            level
            color
            description
        }
     }
     
     
     getInsurance {
        memberId
        groupNumber
        payer {
            id
            name
        }
     }
     getDiagnosis {
      id
      code {
        id
        name
      }
    }
    
  }
}


`;
// health {
//     getCurrentCancers {
//         id,
//             title,
//             code
//     }
//     getCurrentStage {
//
//     }
// }

const withQuery = graphql(GET_PROFILE, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.match.params.id
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                user: data.patient,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

const enhance = compose(
    withQuery,
    withHandlers({

        handleTabChange :  props=>(key)=> {
            console.log(props,key);
            //console.log(this.props);\
            const {id, tab = 'dashboard', subtab = ''} = props.match.params;
        
            const selectedItem = subtab || tab;
            const openItem = tab;
        
            console.log(tab, subtab);
            let mainUrl = '/u';
            if (id !== '') {
                mainUrl += '/'+id;
            }
        
            props.history.push(mainUrl+'/'+key);
        }
    })
);

export default enhance(Profile);