import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import isVideo from "../../utils/isVideo";

const styles = {
  paper: {
    padding: 10,
    display: "flex",
    marginTop: 10,
  },
  avatar: {
    minWidth: 10,
    margin: "4px 10px 4px 4px",
  },
  login: {
    marginBottom: 5,
  },
  time: {
    marginLeft: 10,
    color: "#bbb",
    fontSize: 14,
  },
  media: {
    width: "100%",
  },
};

class Post extends Component {
  render() {
    const { classes, post } = this.props;
    return (
      <Paper className={classes.paper}>
        <div
          className={classes.avatar}
          style={{
            backgroundColor: `#${post.user.id.slice(post.user.id.length - 3)}`,
          }}
        />
        <div>
          <h3 className={classes.login}>
            <Link to={`/profile/${post.user.id}`}>{post.user.name}</Link>
            <span className={classes.time}>
              {new Date(post.createdAt).toLocaleString("hi-IN")}
            </span>
          </h3>
          {post.media && isVideo(post.media) ? (
            <video src={post.media} controls className={classes.media}></video>
          ) : (
            <img src={post.media} className={classes.media} />
          )}
          {post.text}
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Post);
