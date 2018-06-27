import React from 'react'
import {ApolloProvider} from 'react-apollo';
import {Provider} from 'react-redux'
import {shallow,mount } from 'enzyme';
import gql from 'graphql-tag';
import createStore from '../../../../store/createStore'
import apolloClient from '../../../../clients/apolloClient';
const store = createStore(window.__INITIAL_STATE__);
import { execute ,buildSchema } from 'graphql';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { expect } from 'chai';
import  CareTeam from '../../containers/careTeamContainer';
describe('CareTeam', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        let component = withRouter(div);
        ReactDOM.render(<CareTeam />,component);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('works',      (date) => {
        renderer.create(
            <ApolloProvider client={apolloClient}>
                <IntlProvider locale={'en'}>
                    <Provider store={store}>
                        <CareTeam />
                    </Provider>
                </IntlProvider>
            </ApolloProvider>
        );
    });
});
