import React, { Component } from "react";
import Post from "../Posts/Post";
import { connect } from "react-redux";
import LoadingPosts from "../Posts/LoadingPosts";

class SearchResult extends Component {
  render() {
    const results = this.props.results;
    const items =
      results && results.map((el) => <Post key={el._id} post={el} />);
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Search Results</h2>
        {items ? items : <LoadingPosts />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.search.results,
  loading: state.search.loading,
});

export default connect(mapStateToProps)(SearchResult);
