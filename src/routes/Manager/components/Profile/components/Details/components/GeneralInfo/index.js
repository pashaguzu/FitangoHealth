import React from 'react';
import {Card, Table} from 'antd';
import moment from 'moment';
import Truncate from 'react-truncate';
import DescriptionList from "../../../../../../../../components/Layout/DescriptionList";
const { Description } = DescriptionList;
export const Details = props => {

    const {user={}, loading=false} = props;
    const {genderText, age, email, birthday='', phoneFormatted, addressText, getUserNetwork={}, getAdherence={}, getInsurance={}} = user;
    //
    const {lastLogin, joinedDate} = getUserNetwork;
    console.log(getAdherence);

    const {memberId = '',
        groupNumber = '',
        payer = {}} = getInsurance;
    const {name:payerName=''} = payer;

    const insurnaceDetails = [
        ['Membed ID', memberId],
        ['Group', groupNumber],
        ['Payer', payerName]
    ];

    let details = [
        ['Date of Birth', moment(birthday).format('L')],
        ['Age', age],
        ['Gender', genderText],
        ['Email', email],
        ['Phone', phoneFormatted],
        ['Joined on', moment(joinedDate).format('L')],
        ['Last Activity', moment(lastLogin).format('LLL')],
        ['Address', <div>
            <div>
                {addressText}
            </div>
            <div>
                <iframe width="100%"  frameBorder="0" style={{border:0}} scrolling="no" marginHeight="0" marginWidth="0" src={"//www.google.com/maps/embed/v1/place?key=AIzaSyALjMjPzo8TvF1SI11GATr0lcVua5iSkmY&q="+(addressText)}></iframe>
            </div>
        </div>],
    ];
    return (<React.Fragment>



        <Card title="General Info">
            <DescriptionList col={3} layout={'vertical'} className={'strong'} >
                {details.map((detail, i) => {
                    return <Description term={detail[0]} key={i} excludeEmpty>{detail[1]}</Description>;
                })}
            </DescriptionList>
        </Card>


        <Card title="Insurance Info">
            <DescriptionList col={3} layout={'vertical'} className={'strong'}>
                {insurnaceDetails.map((detail, i) => {
                    return <Description term={detail[0]}  key={i}>{detail[1]}</Description>;
                })}
            </DescriptionList>
        </Card>
    </React.Fragment>)
}

export default Details;