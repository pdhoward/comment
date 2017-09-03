import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { getAllPosts }        from '../store/postStore';
import PostForm               from './PostForm';
import _                      from 'lodash';
import PostList               from './PostList';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getAllPosts());
  }

  render() {
    const category = _.get(this.props, 'match.params.category', null);
    return (
      <div>
        <PostList category={category} />
        <PostForm />
      </div>
    );
  }
};



export default connect()(Home);
