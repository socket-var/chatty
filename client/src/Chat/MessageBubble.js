import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    maxWidth: "60%",
    display: "inline-block"
  },
  floatRight: {
    alignSelf: "flex-end"
  }
});

function MessageBubble(props) {
  const { classes } = props;
  
  return (
    <div className={props.direction == "right"? classes.floatRight : ""}>
      
      <Paper className={classes.root} elevation={1}>
        <Typography component="div">
          {props.message}
        </Typography>
      </Paper>
    </div>
  );
}

MessageBubble.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageBubble);
