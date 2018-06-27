import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router';
import {compose, withHandlers} from 'recompose';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


const formatAxis =  (tickItem) => {
    return moment(tickItem).format('MM/DD');
}

export const RiskLevelGraph = props => {
    const {items=[], handleClick} = props
    return <ResponsiveContainer height={300}  >
        <LineChart   data={items} >
            <XAxis dataKey="date" tickFormatter={formatAxis} tickCount={1} minTickGap={50} />
            <YAxis domain={[0, 100]}/>
            <Tooltip/>
            <Line type='monotone' dataKey='value' stroke='#48a5dc' strokeWidth={2} name="Adhrence" onClick={handleClick}  />
        </LineChart>

    </ResponsiveContainer>
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
