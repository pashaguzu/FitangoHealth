/**
 * Created by Pavel on 14.12.2017.
 */
import React from 'react';
import CheckBoxGroup from '../CheckBoxGroup';
import CheckComponent from '../CheckBox';
import SliderComponent from '../Slider';
import {Card} from 'antd';
export class PanelComponent extends React.Component {
    constructor(props){
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
    }
    onSuccess(code, value) {
        this.props.onSuccess(code, value);
    }
    render() {
        const{filter, activeFilters} = this.props;

        return (
            <Card title={filter.name}>
                {filter.fields.map((field) => {
                    if (field.type === "checkboxGroup") {
                        return <CheckBoxGroup key={field.value}
                                              activeFilters={activeFilters}
                                              code={filter.code} item={field} onSuccess={this.onSuccess} />
                    } else if (field.type === "checkbox") {
                        return <CheckComponent key={field.value}
                                               activeFilters={activeFilters}
                                               code={filter.code} fields={field} onSuccess={this.onSuccess} />
                    } else if (field.type === "range") {
                        return <SliderComponent key={field.value}
                                                activeFilters={activeFilters}
                                                onSuccess={this.onSuccess} code={filter.code} fields={field}/>
                    }
                    return field;
                })}
            </Card>
             )
    }
}
export default PanelComponent