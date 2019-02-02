import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    maxWidth: "60%",
    display: "inline-block",
    margin: "0.6em 0"
  },
  floatRight: {
    alignSelf: "flex-end"
  }
});

class MessageBubble extends React.Component{
  constructor(props) {
    super(props);

    this.state = {};
  }



  render() {
    const { classes } = this.props;

    return (
      <div
        className={this.props.direction === "right" ? classes.floatRight : ""}
      >
        <Paper className={classes.root} elevation={1}>
          <Typography component="div">{this.props.message}</Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MessageBubble);
