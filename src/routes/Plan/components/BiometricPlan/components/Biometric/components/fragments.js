import gql from 'graphql-tag';
import Medication from "./index";


export const BiometricProgress = gql`
            fragment MedicationInfo on Biometric {
                 progress(date: $date)
            }
            `;
export const MedicationCardInfo = gql`
            fragment MedicationCardInfo on Medication {
                ...MedicationInfo
                reports (date: $date) {
                    id
                    time
                    date
                    isTaken
                }
            }
            ${MedicationInfo}
            `;
export const MedicationSummary = gql`  
            fragment MedicationSummary on Medication {
                summary (date:$date, userId:$userId)  {
                    date
                    reportsNeeded
                    reports {
                        id
                        isTaken
                    }
                }
            }
            
        `;

export const MedicationsByType =gql`  
 fragment MedicationsByType on MedicationPlan {
    medicationsByType (date: $date) {
        takeAtTimes {
        ...MedicationCardInfo
            timesPerHour {
                id
                time
                quantity
            }
        }
        takeDaily {
        ...MedicationCardInfo
        }
        takeAsNeeded {
        ...MedicationCardInfo
        }
    } 
}
${MedicationCardInfo}
`;