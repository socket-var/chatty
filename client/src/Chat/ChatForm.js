import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import SendIcon from '@material-ui/icons/Send';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  stretch: {
    width: "100%"
  }
};

function CustomizedInputBase(props) {
  const { classes } = props;

  return (
    <Paper className={[classes.root, classes.stretch].join(" ")} elevation={1}>
      <InputBase className={classes.input} placeholder="Enter your message here" value={props.text} onChange={props.handleChange}/>
      <IconButton className={classes.iconButton} aria-label="InsertPhoto">
        <InsertPhotoIcon />
      </IconButton>
      <Divider className={classes.divider} />
      <IconButton color="primary" className={classes.iconButton} aria-label="Send" onClick={props.sendMessage}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputBase);
