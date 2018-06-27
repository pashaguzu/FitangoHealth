import { connect } from 'react-redux'


import Network from '../components/Network'
import { gql,graphql } from 'react-apollo';

const NETWORK_ONLY_INFO = gql`
    query NETWORK_DETAILS {
        network {
            id,
            name,
            modules {
                id,
                name,
                placeholder
            }
        }
    }
`;

// 1- add queries:
const NetworkWithQuery = graphql(
    NETWORK_ONLY_INFO,
    {
        //name: 'NetworkInfoQuery',
        props: ({ data }) => {

            if (!data.loading) {

                const network = data.network;

                return {
                    network: network,
                    //modules: data.network.modules,
                    loading: data.loading,
                    /*increment() {
                         ownProps.increment(data.plans['actionplans']);
                    },
                    doubleAsync() {
                         // reset list of plans
                        ownProps.increment([]);
                    }*/
                }

            } else {
                return {loading: data.loading}
            }
        },

    }
)(Network);
/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {

    return {
        'network':state.network
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //increment: (info) => {dispatch(increment(info))},
        //doubleAsync
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NetworkWithQuery);