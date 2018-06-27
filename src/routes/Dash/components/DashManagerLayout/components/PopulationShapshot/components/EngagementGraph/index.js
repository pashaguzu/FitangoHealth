import React from 'react';
import {withRouter} from 'react-router';
import {compose, withHandlers} from 'recompose';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell} from 'recharts';


export const RiskLevelGraph = props => {
    const {items=[], handleClick} = props
    return <ResponsiveContainer height={300}  >
        <BarChart  data={items} >
        <XAxis dataKey="name"/>
        <YAxis domain={[0, 100]}/>
        <Tooltip/>
            <Bar dataKey="value" fill="#8884d8" label name="Engagement" unit="%"  onClick={handleClick}>
                {
                    items.map((entry, index) => {
                        //const color = entry.pv > 4000 ? COLORS[0] : COLORS[1];
                        return <Cell fill={entry.color} key={index} />;
                    })
                }
            </Bar>
    </BarChart></ResponsiveContainer>;
}

const enhance = compose(
    withRouter,
    withHandlers({
        handleClick: props =>  (data, index) => {
            props.history.push('/patients');
        }
    })
)
export default enhance(RiskLevelGraph);
