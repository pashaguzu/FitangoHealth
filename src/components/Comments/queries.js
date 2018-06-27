import gql from 'graphql-tag';
import {UserInfoFragment} from "../../routes/User/fragments";

export const GET_COMMENTS_LIST = gql`
    query GET_COMMENTS_LIST ($tagId: UID!, $tagType: String!, $parentId: UID) {
        getComments (tagId: $tagId, tagType: $tagType, parentId: $parentId) @connection(key: "comments", filter: ["tagId","tagType"]) {
            totalCount
            edges {
                id
                message
                author {
                    ...UserInfo
                }
                createdAt
                isImportant
                unread
                attachments {
                    id
                    type
                    label
                    url
                    size
                }
                replies {
                      totalCount
                      edges {
                            id
                            message
                            author {
                                ...UserInfo
                            }
                            createdAt
                            isImportant
                            unread 
                            attachments {
                                id
                                type
                                label
                                url
                                size
                            }
                            replies {
                                totalCount
                                edges {
                                    id
                                    message
                                    author {
                                        ...UserInfo
                                    }
                                    createdAt
                                    isImportant
                                    unread 
                                    attachments {
                                        id
                                        type
                                        label
                                        url
                                        size
                                    }
                                }
                            }
                          
                      }
                }  
            }
        }
    }
    ${UserInfoFragment}
`;