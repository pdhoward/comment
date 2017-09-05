import React, { Component }     from 'react';
import PropTypes                from 'prop-types';
import { connect }              from 'react-redux';
import _                        from 'lodash';
import { getCommentsForPost }   from '../store/commentStore';
import VisibilitySensor         from 'react-visibility-sensor';
import { Icon, Loader,
         Accordion, Comment }   from 'semantic-ui-react';
import CommentListItem          from './CommentListItem';
import CommentForm              from './CommentForm';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.startOpen ? 0 : -1
    };
  }


  renderComments() {
    console.log(">>>>>>>>>>>>HELLO FROM COMMENT LIST<<<<<<<<<<<<<<")
    const { postId, commentIdsArray } = this.props;
    const num = commentIdsArray.length;
    return (

      commentIdsArray.map(commentId => {
        return <CommentListItem key={commentId} id={commentId} />
          })
    );
  } 

  render() {
    const { commentIdsArray } = this.props;

    return (
      <div style={{ minHeight: '34px' }}>
        {this.renderComments()}
      </div>
    );
  }
};

CommentList.propTypes = {
  postId: PropTypes.string.isRequired,
  commentIdsArray: PropTypes.arrayOf(PropTypes.string),
  commentsLoading: PropTypes.bool,
  commentsLoadError: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const { postId } = ownProps;
  const commentIdsArray = _.get(state.comment.postIdMap, `${postId}.comments`, null);
  return {
    commentIdsArray,
    commentsLoading: _.get(state.comment.postIdMap, `${postId}.loading`, false),
    commentsLoadError: _.get(state.comment.postIdMap, `${postId}.error`, null)
  };
};

export default connect(mapStateToProps)(CommentList);
