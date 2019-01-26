import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/PersonSharp';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function SimpleList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            {/* replace with Avatar later */}
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="User 1" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="User 2" />
        </ListItem>
        <ListItem button>
        <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="User 3" />
        </ListItem>
        <ListItem button>
        <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="User 4" />
        </ListItem>
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);