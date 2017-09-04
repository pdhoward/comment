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
  handleEdit = () => {
    const { id } = this.props;
    this.props.dispatch(openEditForm(id));
  }

  handleDeleteIntent = () => {
    const { dispatch, id } = this.props;
    dispatch(intentDeleteComment(id));
  }

  handleConfirmDelete = () => {
    const { dispatch, id } = this.props;
    dispatch(confirmDeleteComment(id));
  }

  handleCancelDelete = () => {
    const { dispatch } = this.props;
    dispatch(cancelDeleteComment());
  }

  renderEditForm() {
    const { id } = this.props;
    return (
      <Dimmer active inverted>
        <CommentForm formType='edit' id={id} />
      </Dimmer>
    );
  }

  renderDeleteConfirmation() {
    const { deleting, error } = this.props.delete;
    if (deleting) {
      return (
        <Dimmer active><Loader /></Dimmer>
      );
    } else if (error) {
      return (
        <Dimmer active>
          <div>
            <Header size='tiny' inverted style={{ marginBottom: '8px'}}>
              Something went wrong!
            </Header>
            <Button size='mini' onClick={this.handleCancelDelete}>Cancel</Button>
            <Button size='mini' primary onClick={this.handleConfirmDelete}>
              Retry
            </Button>
          </div>
        </Dimmer>
      );
    } else {
      return (
        <Dimmer active>
          <div>
            <Header size='tiny' inverted style={{ marginBottom: '8px'}}>
              Delete this comment ?
            </Header>
            <Button size='mini' onClick={this.handleCancelDelete}>Cancel</Button>
            <Button size='mini' color='red' onClick={this.handleConfirmDelete}>
              Confirm
            </Button>
          </div>
        </Dimmer>
      );
    }
  }

  render() {
    const {
      id, thumb, author, timestamp, body, voteScore, isEditVisible
          } = this.props;
    const showDeleteConfirmation = id === this.props.delete.id;

    return (
      <div>
        <p>{id}</p>
        <p>{author}</p>
        <p>{timestamp}</p>
        <p>{body}</p>
        <p>{voteScore}</p>
        <p>{isEditVisible}</p>
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
