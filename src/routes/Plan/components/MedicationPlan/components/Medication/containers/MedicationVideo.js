import MedicationVideo from '../components/MedicationVideo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const MedicationVideoQuery = gql`    
    query GetMedicationDrugVideo ($id: UID!)  {
        medicationDrug(id: $id) {
            id
            name
            videos
        }
    }
`;

const MedicationVideoWithQuery = graphql(
    MedicationVideoQuery,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => ({
            variables: {
                id:ownProps.id,
            },
        }),
        props: ({ data }) => {
            if (!data.loading) {

                const medicationDrug = data.medicationDrug;
                return {
                    drug: medicationDrug,
                    loading: data.loading,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(MedicationVideo);

export default MedicationVideoWithQuery;