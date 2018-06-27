import { connect } from 'react-redux'

import MedicationSelect from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
//import Medication from '../components/Medication/components';
// Query for grabbing everything for the dashboard items
export const medicationList = gql`
    query GET_MEDICATIONS_LIST ($userId: UID!, $search: String)  {
            medicationsList (userId: $userId, search: $search) {
                id
                name
                dosage
                        
        }
    }
`;
const settingUserMutate=gql`
 mutation settingUser( $input:AccountInput!){
        account(input:$input) {
          user {
            first_name
          }
        }
    }
`;

const withQuery = graphql(medicationList,
    {
        options: () => {
            return {
                fetchPolicy: 'network-only'
            }},
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    medications: data.medicationsList,
                    loading: data.loading,

                    medicationSearch(search) {
                        return data.fetchMore({
                            variables: {
                                search: search,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {

                                if (!fetchMoreResult) { return previousResult; }
                                return (fetchMoreResult);
                            },
                        });
                    }

                }

            } else {
                return {loading: data.loading}
            }
        },

    }
)(MedicationSelect);

const withMutation = graphql(settingUserMutate, {
    props: ({ mutate }) => ({
        medicationSearchInput: input => {
            return mutate({
                variables: {input: {user:input}},
            })},
    }),
});




const mapStateToProps = (state) => {

    return {
        //date: moment().format('YYYY-MM-DD'),
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

//export  withMutation(connect(mapStateToProps, mapDispatchToProps)(SettingForm));
//export default compose(
//  connect(mapStateToProps, mapDispatchToProps),withMutation,withQuery)((SettingForm));

export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(withQuery));