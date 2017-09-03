

import React, { Component }       from "react";
import Panel                      from "./common/Panel";
import { connect }                from 'react-redux';
import { getAllPosts }            from '../store/postStore';
import PostForm                   from './PostForm';
import _                          from 'lodash';
import PostList                   from './PostList';

class Home extends Component {
  constructor() {
    super();

    // Binding getQuotes to our component since we'll be passing this
    // method to child components
  
  }
  // Getting all quotes when the component mounts
  componentDidMount() {
    this.props.dispatch(getAllPosts());
  }

  // A helper method for rendering one panel for each quote
  renderQuotes() {
    const category = _.get(this.props, 'match.params.category', null);
    return category.map(quote => (
      <Panel
        quote={quote}
        key={quote._id}
      />
    ));
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <hr />
          {this.renderQuotes()}
        </div>
      </div>
    );
  }
}

export default connect() (Home);
