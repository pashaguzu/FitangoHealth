import React from 'react';
import {TumorboardElementCard} from "../../../../../Tumorboard/components/TumorboardView/components/TumorboardElements/index";
import {TumorboardNotesForm} from './components/TumorboardNotesForm';
import {Divider} from 'antd';

export const TumorBoardPreview = props => {
    const {element, userId, form} = props;
    return  <React.Fragment>
        <TumorboardElementCard element={element} key={element.id} userId={userId} />
        <Divider>Add Notes</Divider>
       <TumorboardNotesForm form={form} />
    </React.Fragment>;
}