import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon,Card, Modal, TimePicker, Checkbox, Form, Table} from 'antd';




const columns = [{
    title: 'Reaction',
    dataIndex: 'reaction',
    key: 'reaction',
}, {
    title: 'Severity',
    dataIndex: 'severity',
    key: 'severity',
}, {
    title: 'Created',
    dataIndex: 'createdAt',
    key: 'created',
}];
export default class MedicationReminders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showAdd:false}
        this.toggleAdd = this.toggleAdd.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    };

    static propTypes = {
        data: PropTypes.array,

    }
    static defaultProps = {
        data: [],
    }

    toggleAdd() {
        this.setState({showAdd:!this.state.showAdd});
    }




    handleCreate = () => {
        const form = this.form;
        form.validateFields((err) => {
            if (err) {
                return;
            }


            // form.resetFields();
            // hide the modal
            this.setState({ showAdd: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }

    render() {

        const {data} = this.props;

        return (<Card title="Medication Reminders" extra={<Button size="small" onClick={this.toggleAdd}><Icon type="plus" /></Button>} type="inner">

            {data.length > 0 ? <Table dataSource={data} columns={columns} /> : <div>Set up reminders here</div>}
            {this.state.showAdd && <MedicationRemindersCreateForm
                ref={this.saveFormRef}
                onCancel={this.toggleAdd}
                onCreate={this.handleCreate}
                item={this.props.item}
            />}
        </Card>)
    }
}


const format = 'h:mm a';


const columnsAlong = [{
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    render: () => { return <TimePicker format={format} minuteStep={30} use12Hours={true}/>}
}, {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: () => { return <Checkbox />}
}, {
    title: 'Notification',
    dataIndex: 'notifications',
    key: 'notification',
    render: () => { return <Checkbox />}
}, {
    title: 'Sms',
    dataIndex: 'sms',
    key: 'sms',
    render: () => { return <Checkbox />}
}];

let columnsTimes = [{
    title: 'Method',
    dataIndex: 'type',
    key: 'type',

}];


const MedicationRemindersCreateForm = Form.create()(
    (props) => {
        const {onCancel, onCreate,item } = props;


        const {timesPerHour} = item;

        const dataSourceAlongDay = [
            {time: '00:00:00', 'email':false, 'notification':false,'sms':false}
        ];
        const dataSourceTimes = [
            {'type':'Email'},
            {'type':'Notification'},
            {'type':'SMS'},
        ];


        timesPerHour.map((info) => {

            columnsTimes.push({
                title: info.time,
                dataIndex: info.time,
                key: info.time,
                render: () => { return <Checkbox />}
            });

            dataSourceTimes.map((info2) => {
                info2[info.time] = false;
                return info2;
            });

                return info;
        })

        //
        return (
            <Modal
                visible={true}
                title="Set Up Medication Reminders"
                okText="Finish"
                onCancel={onCancel}
                onOk={onCreate}
            >

                {timesPerHour.length > 0 &&
                <Card title="Remind Me On Selected Times">
                    <Table dataSource={dataSourceTimes} columns={columnsTimes} pagination={false} />
                </Card>}

                {timesPerHour.length === 0 && <Card title={'Remind Me On the "ALONG THE DAY" Medications'} extra={<Button onClick={this.handleAdd}><Icon type="plus" /></Button>}>
                    <Table dataSource={dataSourceAlongDay} columns={columnsAlong} pagination={false} />
                </Card>}




                {/* <Form  >
                    <FormItem  {...formItemLayout} label="Reaction">
                        {getFieldDecorator('reaction', {
                            rules: [{ required: true, message: 'Please input the reaction!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Severity">
                        {getFieldDecorator('severity', {
                            rules: [{ required: true, message: 'Please input the severity!' }],
                        })(<Select placeholder="Select">
                            <Option value={3}>Critical</Option>
                            <Option value={2}>High</Option>
                            <Option value={1}>Medium</Option>
                            <Option value={0}>Low</Option>
                        </Select>)}
                    </FormItem>
                </Form>*/}
            </Modal>
        );
    }
);