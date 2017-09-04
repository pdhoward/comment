

import React, { Component }       from "react";
import Panel                      from "./common/Panel";
import { connect }                from 'react-redux';
import { getAllPosts }            from '../store/postStore';
import PostForm                   from './PostForm';
import _                          from 'lodash';
import PostList                   from './PostList';

class Home extends Component {

  // Getting all quotes when the component mounts
  componentWillMount() {
    this.props.dispatch(getAllPosts());
  }
  componentDidMount() {
    console.log("component did mount")
    console.log(this.props)
  }
/*
  // A helper method for rendering one panel for each quote
  renderQuotes() {
    console.log(this.props)
    const category = [
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Spoof data here',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'more spoof data here',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  }]
    return category.map(quote => (
      <Panel
        quote={quote}
        key={quote._id}
      />
    ));
  }
  */
  render() {
    const category = _.get(this.props, 'match.params.category', null);

    return (
      <div className="container">
        <PostList category={category} />
        <PostForm />

      </div>
    );
  }
}

export default connect() (Home);
