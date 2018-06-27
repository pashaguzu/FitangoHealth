import React from 'react'
import gql from 'graphql-tag';

export class Biometric extends React.Component {

    // fragment for the plan info
    static fragments = {
        tracker: gql`
            fragment BiometricCardInfo on TrackerPlanTracker {
                id
                measurement {
                    id
                    label
                    units {
                        id
                        name
                    }
                    inputMask
                    reports (date: $date){
                        id
                        date
                        reportKey
                        columnId
                        isCritical
                        value
                    }
                    graph
                    criticalRange {
                        min
                        max
                    }
                    normalRange {
                        min
                        max
                    }
                }
                timesToReport,
                
            }
        `
    }

    constructor(props) {
        super(props);
        this.state = {
            isBuilderMode: false,// if this is a builder mode
        };
    };
    static propTypes = {
    };


    render() {

        return (
            <div>dddd</div>
        )
    }
}



export default Biometric
