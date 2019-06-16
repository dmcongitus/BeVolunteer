import React, { Component } from "react";

import Post from "../../../components/Post/PostCard/PostCard";

import PageLayout from "../../../layouts/PageLayout/PageLayout";
import { getNewfeed } from "../../../services/newfeed";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class SearchPage extends Component {
  state = {
    data: [],
    searchTxt: "",
  };

  
  componentDidMount = () => {
    this.setState({ searchTxt: this.props.match.params.searchText });
    getNewfeed(0)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.match.params.searchText !== prevProps.match.params.searchText) {
      getNewfeed(0)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));
    }
  }

  onPostTypeChanged = postType => {
    getNewfeed(postType)
      .then(data => {
        this.setState(data);
      })
      .catch(e => console.log(e));
  };
  mySearch(post, searchText) {
    if (post.title) {
      if (post.title.toString().indexOf(searchText) >= 0) {
        return true;
      } 
    }
    if (post.address) {
      if (post.address.toString().indexOf(searchText) >= 0) {
        return true;
      } 
    }
    if (post.description) {
      if (post.description.toString().indexOf(searchText) >= 0) {
        return true;
      } 
    }
    return false;
  }
  render() {
    return (
      <PageLayout
        title="Tìm kiếm"
        hasMoreButton
        onPostTypeChanged={this.onPostTypeChanged}
      >
        
        {this.state.data.map(post =>
          this.mySearch(post, this.props.match.params.searchText) === true ? (
            <Post key={post.id} {...post} />
          ) : null
        )}
      </PageLayout>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: { name, permission, exp }
  }
}) => ({ name, permission, exp });

export default withRouter(connect(mapStateToProps)(SearchPage));