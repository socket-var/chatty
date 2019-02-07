import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { SnackbarContent } from "@material-ui/core";


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});


class ToastNotifier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      this.setState({ open: true });
    }
  }

  render() {
    const { classes, message, variant} = this.props;
    const Icon = variantIcon[variant];

    return (
      <div>
        <Snackbar
          // className={classNames(classes[variant])}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          autoHideDuration={3000}
          variant={this.props.variant}
          open={this.state.open}
          onClose={this.handleClose}
          
        >
          <SnackbarContent 
            className={classNames(classes[variant])}
            message={
              <span id="message-id">
                <Icon className={classNames(classes.icon, classes.iconVariant)} />
                {message}
              </span>
            }
          />
        </Snackbar>
      </div>
    );
  }
}

ToastNotifier.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired
};

export default withStyles(styles)(ToastNotifier);
