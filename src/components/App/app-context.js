import React from 'react';

export const CustomizedLabelsContext = React.createContext();
export const NetworkContext = React.createContext();



export const CustomizedLabelsProvider = (props) => {
    /*const labels =  {
            lessons: 'Regimens',
            lesson: 'Regimen',
            activities: 'Decisions',
            activity: 'Decision',
            planstore: 'Library',
    };*/
    const {labels} = props;
        return (
            <CustomizedLabelsContext.Provider value={labels} >
                {props.children}
            </CustomizedLabelsContext.Provider>
        );
}


export const GetGlobalLabel = (props) => {
    const {type} = props;
    const {defaultValue = type} = props;
    return (
        <CustomizedLabelsContext.Consumer>
            {(context) => {
                console.log(context);
                return context[type] || defaultValue;
            }}
        </CustomizedLabelsContext.Consumer>
    );
}



export const ActiveUserContext = React.createContext();


export const ActiveUserProvider = (props) => {
    const {user} = props;
    //console.log(props, 'ActiveUserProvider');
    return (
        <ActiveUserContext.Provider user={user} >
            {props.children}
        </ActiveUserContext.Provider>
    );
}

export const GetActiveUser = props => {
    return (
        <ActiveUserContext.Consumer>
            {(context) => {
                return context.user;
            }}
        </ActiveUserContext.Consumer>
    );
}

export const withActiveUser = Component => {
    const ActiveUserHOC = props => {
        return (
            <ActiveUserContext.Consumer>
                {context => {
                    console.log(context, 'activeUserContext');
                    const {user={}} = context || {};
                    return <Component
                        {...props}
                         activeUser={user}
                    />
                }}
            </ActiveUserContext.Consumer>
        );
    }
    return ActiveUserHOC;
}

