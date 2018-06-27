import React from 'react';
import {Input,Icon} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import {AvatarWithName} from "../../../routes/User/components/AvatarWithName/index";
import './index.css'
import { withState} from 'recompose';
export const Search = props => {
    const {searchText,onSearch,emitEmpty} = props;
    const suffix = searchText ? <Icon type="close-circle" onClick={emitEmpty} /> : null
    return (
    <div className="custom-filter-dropdown">
                <Input
                     suffix={suffix}
                     ref={ele => this.searchInput = ele}
                     placeholder="Search name"
                     value={searchText}
                     onChange={onSearch}
                     onPressEnter={onSearch}
                />
            </div>
            )
}

export default Search;