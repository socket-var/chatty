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
  }
});

function MessageContainer(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography component="span">
          {props.message}
        </Typography>
      </Paper>
    </div>
  );
}

MessageContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageContainer);
