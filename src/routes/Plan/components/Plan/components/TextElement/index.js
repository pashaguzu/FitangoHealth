import React from 'react'
import PropTypes from 'prop-types'
import './index.less';

export default class TextElement extends React.PureComponent {
    static propTypes = {
        item: PropTypes.shape({
                text: PropTypes.string,
            })
    };

    render() {
        const {item} = this.props;
        return <div className="wysiwyg-block" dangerouslySetInnerHTML={{__html: item.text}}></div>;


    }
}