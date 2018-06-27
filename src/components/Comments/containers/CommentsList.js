import CommentsList from '../components/CommentsList';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux'
import {GET_COMMENTS_LIST} from "../queries";



const withQuery = graphql(GET_COMMENTS_LIST, {
    props: ({ ownProps, data }) => {
        const {loading} = data;
        let {messages=[],total=0} = ownProps;
        if (!data.loading) {
            const {edges, totalCount} = data.getComments;
            messages = edges;
            total = totalCount;
        }

        return {...data, loading, messages, total }
    },
});



const CommentsListWithQuery = withQuery(CommentsList);

const mapStateToProps = (state) => {
    return {
        userId: state.user.info.id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsListWithQuery);