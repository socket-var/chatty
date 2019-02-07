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
    const { classes, direction, message, localTime } = this.props;

    return (
      <div
        className={direction === "right" ? classes.floatRight : ""}
      >
        <Paper className={classes.root} elevation={1}>
          <Typography variant="body1">{message}</Typography>
          <Typography variant="caption">{localTime}</Typography>
        </Paper>
      </div>
    );
  }
}

MessageBubble.propTypes = {
  classes: PropTypes.object.isRequired,
  direction: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  localTime: PropTypes.string.isRequired
}

export default withStyles(styles)(MessageBubble);
