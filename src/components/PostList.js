import React, { Component }       from 'react';
import { connect }                from 'react-redux';
import PropTypes                  from 'prop-types';
import _                          from 'lodash';
import { Grid, Loader, Segment, Icon } from 'semantic-ui-react';
import Post                       from './Post';
import Panel                      from "./common/Panel";

class PostList extends Component {
  renderLoading() {
    return (
      <Loader active inline='centered' />
    );
  }

  renderError() {
    return (
      <Segment color='red' textAlign='center'>
        <Icon name='warning sign' color='red' />
        Failed to load the posts
      </Segment>
    );
  }

  renderNoResults() {
    return (
      <Segment color='grey' textAlign='center'>
        <Icon name='info circle' color='grey' />
        There are no posts to show
      </Segment>
    );
  }

  renderPosts() {
    const { posts } = this.props;
    const postComponents = posts.map(post => {
      return (
        <Grid.Row key={post.id}>
          <Grid.Column>
            <Post id={post.id} />
          </Grid.Column>
        </Grid.Row>
      );
    });
    return <Grid columns={1}>{postComponents}</Grid>;
  }

  renderQuotes() {
    const { posts } = this.props;
    console.log("ENTERED POSTLIST")
    console.log(this.props)
    console.log("and here are the magic posts")
    console.log(posts)

    const postComponents = posts.map(post => {
      return (
        <Post id={post.id} />
      );
    });
    console.log("and here are postcomponents")
    console.log(postComponents)

    return
      <Panel
        quote={postComponents}
      />



    /*
    <Post id={this.props.quote.id} />
    const postComponents = posts.map(post => {
      return (
        <Grid.Row key={post.id}>
          <Grid.Column>
            <Post id={post.id} />
          </Grid.Column>
        </Grid.Row>
      );
    });
    return <Grid columns={1}>{postComponents}</Grid>;
    */
  }


  render() {
    const { loading, error, posts } = this.props;

    return  this.renderQuotes();

  }
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  category: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.object
};

PostList.defaultProps = {
  posts: []
};

const mapStateToProps = (state, ownProps) => {
  const { category } = ownProps;
  const { sortBy, sortOrder } = state.post;
  let posts = _.values(state.post.posts);
  if (_.isString(category)) {
    posts = _.values(posts).filter(post => post.category === category);
  }
  posts = posts.sort((a, b) => {
    const temp = a[sortBy] - b[sortBy];
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return  temp * modifier;
  });
  const { loading, error } = state.post.posts;
  return { loading, error, posts };
};

export default connect(mapStateToProps)(PostList);
