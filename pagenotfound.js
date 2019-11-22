import React, { Component } from "react";
import { withStyles, Button } from '@material-ui/core';
import Problem from '@material-ui/icons/SentimentVeryDissatisfied';
import PropTypes from "prop-types";

const styles = theme => ({
  iconSize: {
    fontSize: "300px",
    alignItems: "center",
    color:"#9c9c9c",
    background:"#fff",
    border: "1px",
    borderRadius: "150px",
  },
  paddingPage: {
  	paddingTop: 20,
  },
  marginReturn: {
  	marginTop: 20
  },
  fontStyleHeader: {
  	fontSize: 60,
  	fontColor: "#414141",
  	marginTop: 10,
  	marginBottom: 10,
    fontWeight: 300
  },
  fontStyleSub: {
  	fontSize: 15,
    fontWeight: 300
  }
});

class NotFound extends Component {
  render() {
    const { classes } = this.props;

    return (
	<div className={classes.paddingPage}>
  	<center>
    	<Problem className={classes.iconSize} />
    	<h2 className={classes.fontStyleHeader}>PAGE NOT FOUND</h2>
    	<h2 className={classes.fontStyleSub}>Looks like you've followed a broken link or entered a URL that doesn't exist on this system. </h2>
    	<center>
      	<Button 
      		variant="contained" 
      		color="primary" 
          className={classes.marginReturn} 
          onClick={() => this.props.history.push("/dashboard")}
      	>
          Return to Home Page
        </Button>
      </center>
  	</center>
	</div>
	);
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(NotFound));