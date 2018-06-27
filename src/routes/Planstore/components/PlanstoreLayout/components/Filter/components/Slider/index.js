/**
 * Created by Pavel on 13.12.2017.
 */
import React from 'react';
import {Slider} from 'antd';

export class CheckComponent extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value1 = e[0];
        const value2 = e[1];
         const {code} = this.props;
        this.props.onSuccess(code, {"min":value1,"max":value2});
    }

    render() {


        const{code, activeFilters} = this.props;
            const activeFilter = activeFilters[code] || {};
            const min = activeFilter.min || 0;
            const max = activeFilter.max || 99;

        const marks = {
            0: '0',
            99: {
                label: "99",
            },
        };

            return (<div>
                <Slider range marks={marks} defaultValue={[min,max]}  onAfterChange = {this.handleChange}/>
                </div>
            )


    }
}

export default CheckComponent