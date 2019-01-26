import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
  fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  floatBottom: {
    textAlign: "right",
    height: "10vh"
  },
});

function FloatingActionButton(props) {
  const { classes } = props;
  return (
    <div className={classes.fab}>
      <Fab color="primary" aria-label="Add" >
        <AddIcon />
      </Fab>
    </div>
  );
}

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButton);