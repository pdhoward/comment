import React, { Component }       from 'react';
import PropTypes                  from 'prop-types';
import { connect }                from 'react-redux';
import _                          from 'lodash';
import moment                     from 'moment';
import { Link, withRouter }       from 'react-router-dom';
import {
  Card, Image, Icon, Popup, Button, Dimmer, Header, Loader, Label, Segment
}                                 from 'semantic-ui-react';
import CommentList                from './CommentList';
import VoteBox                    from './VoteBox';
import { getPost }                from '../store/postStore';
import { openEditForm }           from '../store/postFormStore';
import { intentDeletePost,
         cancelDeletePost,
         confirmDeletePost }      from '../store/postStore';

class Post extends Component {
  componentDidMount() {
    console.log("POSTJS COMPONENT MOUNTED")
    console.log(this.props)
    const { id, post } = this.props;
    if (post == null) {
      console.log("INSIDE POST - DISPATCH")

      this.props.dispatch(getPost(id));
    }
  }


  renderPost() {
    const { isDetailView } = this.props;
    const {
      id, timestamp, title, body, author, category, voteScore, thumb
              } = this.props.post;
    const showDeleteConfirmation = id === this.props.delete.id;

    return (
      <CommentList postId={id} startOpen={isDetailView} />
      );
    }

  render() {
    const { post } = this.props;
    const { loading, error } = post || {};

    return this.renderPost();

  };
}
Post.propTypes = {
  id: PropTypes.string.isRequired,
  post: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
  delete: PropTypes.object
};

PropTypes.defaultProps = {
  delete: {}
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id || ownProps.match.params.postId;
  return {
    id,
    post: state.post.posts[id],
    delete: state.post.delete,
    isDetailView: _.get(ownProps.match, 'params.postId')
  };
};

export default withRouter(connect(mapStateToProps)(Post));
