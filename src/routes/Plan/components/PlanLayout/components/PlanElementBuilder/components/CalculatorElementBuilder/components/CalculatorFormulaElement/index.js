import React, { Component } from 'react'
import Brackets from '../Brackets';
import Substract from '../Substract';

const el = ({el, i, addChildElement}) => {

    switch (el.type) {
        case 'brackets':
            return <Brackets key={i} i={i} el={el} addChildElement={addChildElement} >{el.type}></Brackets>;
            break;
        case '-':
            return <Substract key={i} />;
            break;
    }
}

export default el;