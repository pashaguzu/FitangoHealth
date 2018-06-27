import React from 'react';
import {
    FormattedMessage,
} from 'react-intl';
import {Card, Button} from 'antd';
import Filters from '../../Filters/components'

export class PlanstoreLayout extends React.Component {



    /**
     * Updates filter by type (category, price, etc)
     * @param filter
     * @param values
     */
    updateFilters = (filter, values) => {


        const activeFilters = this.props.activeFilters;
        // get all current info of the type
       // const activeFilter = activeFilters[filter] || {};

        // update filter by type(category or smth)
        const filter1 = {
            ...activeFilters,
            [filter]: values
        }

        // update the store
        this.props.updateFilterStore(filter1)
    }

    updateZeroFilters = () => {
        const activeFilters = {};
        const filter2 = {
            //...activeFilters,
            //[filter]: values
        }
        this.props.updateZeroFilterStore(filter2);
        this.props.updateFilterStore(filter2);
    }

    /**
     * Updates filter by type (category, price, etc)
     * @param filter
     * @param values
     */

    render() {
        const {loading, filters, activeFilters} = this.props;
        //const pageOpts = {onChange: this.changePage, total: 50};

        if (loading) {
            return (
                <div>

                    <Card loading>
                        Loading
                    </Card>
                    <Card loading>
                        Loading
                    </Card>
                </div>
            )
        }


        return (
            <div>
                <Filters filters={filters} activeFilters={activeFilters} onSuccess={this.updateFilters}/>
                <Button onClick={this.updateZeroFilters} style={{marginTop:24}}>{<FormattedMessage id="planstore.planstorelayout.cleanfilter"
                                                                            defaultMessage="Reset filters"
                                                                            description="Reset filters"/>}</Button>
            </div>

        )

    }
}

export default PlanstoreLayout