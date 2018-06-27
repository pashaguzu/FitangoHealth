import React from 'react';
import {Card, Carousel, Tooltip} from 'antd';
import moment from 'moment';
import {EmptyList} from "../../../../../../../../components/Loading/index";
import './index.less';
import VMasker from "vanilla-masker";

export const Vitals = props => {
    const {vitals=[]} = props;
    if (vitals.length === 0) {
        return null;
    }
    const limit = 3;
    const slidesToShow = vitals.length >= limit ? limit : vitals.length;
    //console.log(props);
    return  <Card type="basic1 ant-card-type-pure" bordered={false} title="Vitals">
        <Carousel slidesToShow={slidesToShow} arrows={true}  centerPadding={10} slidesToScroll={slidesToShow} responsive={[{ breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll:2 }}, { breakpoint: 700, settings: { slidesToShow: 1, slidesToScroll:1 }}]}>

            {vitals.map((tracker, i) => {

                const {label='', units={}, inputMask='', getLastReport} = tracker;
                const {name:unitsName} = units;
                const {datetime='', isCritical=false} = getLastReport || {};
                let {value} = getLastReport || {};

                if (value) {
                    value = inputMask !== '' ? VMasker.toPattern(value, inputMask) : VMasker.toNumber(value);
                } else {
                    value = 'N/A';
                }
                if (isCritical) {
                    value = <Tooltip title="Critical Value"><span className="critical">{value}</span></Tooltip>;
                }
                return  <div><Card type="pure" className="vital" key={i}>
                        <div className="title">{label}</div>
                        <div className="units">{unitsName}</div>
                        <div className="value">{value}</div>
                        <div className="date">{datetime && moment(datetime).format('LLLL')}</div>
                    </Card></div>;
            })}

        </Carousel>
    </Card>
}

export default Vitals;