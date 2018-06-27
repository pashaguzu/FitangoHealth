import { connect } from 'react-redux';
import React from 'react';

const HaveModulePure = (props) => {
    const module = props.module || '';
    const modules = props.modules || {};

    if (module in modules) {
        return [props.children];
    } else {
        return ('');
    }

}

const mapStateToProps = (state) => {
    //const regions = state.regions.get('entities').toJS();
    //const currentRegionId = state.regions.get('currentId');
    const modules = state.network.modules;
    const modules_kv = {};
    Object.values(modules).forEach((module) => {
        modules_kv[module.placeholder] = module;
    });
    return {
        modules:modules_kv
    };
};

const mapDispatchToProps = {
};


export const HaveModule = connect(mapStateToProps, mapDispatchToProps)(HaveModulePure);