import React, { Component }   from 'react';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import moment                 from 'moment';
import {
  Comment, Icon, Divider, Dimmer, Header, Button, Loader
}                             from 'semantic-ui-react';
import VoteBox                from './VoteBox';
import { openEditForm }       from '../store/commentFormStore';
import {
  intentDeleteComment, confirmDeleteComment, cancelDeleteComment
}                             from '../store/commentStore';
import CommentForm            from './CommentForm';

class CommentListItem extends Component {


  render() {
    const {
      id, thumb, author, timestamp, body, voteScore, isEditVisible
          } = this.props;
    const showDeleteConfirmation = id === this.props.delete.id;

    return (
      <div>
        {"hello world"}
      </div>

      );
    }
};

CommentListItem.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  voteScore: PropTypes.number,
  thumb: PropTypes.string,
  delete: PropTypes.object,
  isEditVisible: PropTypes.bool
};

CommentListItem.defaultProps = {
  voteScore: 0,
  delete: {}
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  return {
    ...state.comment.comments[id],
    isEditVisible: !!state.commentForm.editComments[id],
    delete: state.comment.delete,
  };
};

export default connect(mapStateToProps)(CommentListItem);
