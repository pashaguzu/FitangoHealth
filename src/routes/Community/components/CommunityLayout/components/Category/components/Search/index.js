/**
 * Created by Pavel on 10.01.2018.
 */

import React from 'react';
import { Icon,AutoComplete ,Input } from 'antd';
import { withApollo } from 'react-apollo'
import '../../../../../../style.css';
import {
    withRouter
} from 'react-router-dom'
import {
    injectIntl
} from 'react-intl';
import messages from './search.json';
class Search extends React.PureComponent{

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);

    }


    onChange = (value) => {
        if (!this.props.loading)
        this.props.loadMoreEntries(value)
    };

    onSelect(value) {
        this.props.history.push('/community/'+value)
    }



    render(){
        const {items,intl} = this.props;
        return(
            <div>
                <AutoComplete
                    dataSource={items}
                    allowClear={true}
                    placeholder={intl.formatMessage(messages.search)}
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    onSearch = {this.onChange}
                    onSelect = {this.onSelect}
                >
                    <Input suffix={<Icon type="search" className="certain-category-icon" />} />

                </AutoComplete>
            </div>
        );
    }

}
export default withApollo(withRouter(injectIntl(Search)));
