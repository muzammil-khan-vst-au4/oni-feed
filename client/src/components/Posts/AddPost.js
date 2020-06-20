import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Button, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";

const styles = {
  paper: {
    padding: 8,
  },
  textField: {
    width: "100%",
  },
  media: {
    size: 50,
    margin: 30,
  },
  button: {
    width: "20%",
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#800080",
    color: "#fff",
    "&:hover": {
      color: "#800080",
    },
  },
};

class AddPost extends Component {
  state = {
    text: "",
    media: "",
    data: null,
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.postMedia(this.state.data);
    const postData = {
      text: this.state.text,
      media: this.state.media,
    };

    this.props.addPost(postData);
    this.setState({ text: "", media: "", data: null });
  };

  handleMediaChange = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gakbg3vt");
    this.setState({
      data,
    });
  };

  postMedia = async (data) => {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/deo2tr2pt/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    this.setState({
      media: file.secure_url,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <TextField
          multiline
          rowsMax="4"
          label="What's is new?"
          className={classes.textField}
          onChange={this.handleChange}
          value={this.state.text}
        />
        <input
          type="file"
          className={classes.media}
          onChange={this.handleMediaChange}
        />
        <Button
          variant="outlined"
          className={classes.button}
          onClick={this.handleSubmit}
        >
          Send
        </Button>
      </Paper>
    );
  }
}

export default connect(null, { addPost })(withStyles(styles)(AddPost));
