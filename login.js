import {
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Face, Fingerprint } from "@material-ui/icons"
import LoginIcon from "@material-ui/icons/Lock";
import React, { Component } from "react";
import {
  Col,
  Row,
} from "reactstrap";
import PropTypes from "prop-types";

const Auth = require("../module/auth.js")();


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
}


TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


const styles = theme => ({
  root: {
    align:"center",
    flexGrow: 1,
  },
  iconSize: {
    fontSize: "100px",
    alignItems: "center",
    color:"#fff",
    background:"#ef3152",
    border: "1px",
    borderRadius: "65px",
    padding: "12px"
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: theme.spacing.unit
  },
  nav: {
    padding: "7px",
    width: "67%",
    background:"#fff",
    color: "#245f77",

    fontFamily: "Roboto Condensed",
  },
  tab: {
    color: "#fff",
    background: "#245f77",
  }
});


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      username: "",
      password: "",
      message: "",
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }


  componentDidMount() {
    var userCredentials = Auth.getUserCredentials(this.props);

    if (userCredentials) {
      this.props.history.push("/#/dashboard/");
    }
    document.title = "ci-tech Project Management System";
  };


  handleChange = (event, value) => {
    this.setState({ value });
  };


  onChangeInput = name => event => {
    this.setState({
      [name]: event.target.value,
      message: "",
    });
  };


  onSubmit(e) {
    e.preventDefault();

    const Backend = require("../backend_wrapper/backend_express.js")();

    var data = {
      username: this.state.username,
      password: this.state.password,
    };

    var retVal = Backend.authenticateUser(data);
    retVal.then(response => {
      if (response.status === 200) {
        Auth.setUserCredentials(response.data.payload, response.data.token);

        this.props.history.push("/#/dashboard/");
      }
      else {
        this.setState({
          message: response.response.data.message,
          password: "",
        });
      }
    })
    .catch(error => {
      this.setState({
        message: "Unknown error occured.",
        password: "",
      });
    })
  }


  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="12">
            <br/><br/>
            <center>
              <Grid className={classes.nav} justify="center" container>
                <Grid item xs={12} md={12}>
                <center>
                  <p className="font-nav-login">PMS</p>
                  <p className="font-nav-login-sub">ci-tech Project Management System</p>
                  <hr className="hr-login-style"/>
                </center>
                </Grid>
              </Grid>
            </center>
            <br/>
            <Grid justify="center" container spacing={24}>
            <Grid item xs={8} md={4}>
            <center>
            <Paper square className={classes.root}>
              <Tabs
                className={classes.tab}
                value={this.state.value}
                onChange={this.handleChange}
                variant="fullWidth"
                inkbarstyle={{background: "#fff"}}
              >
                <Tab icon={<LoginIcon />} label="LOGIN" />
              </Tabs>
            </Paper>
            </center>
            <br/>
            </Grid>
            </Grid>
            <Grid justify="center" container spacing={24}>
              <Grid item xs={8} md={4}>
                <Paper className={classes.padding}>
                  {value === 0 && <TabContainer>
                  <center>
                    <LoginIcon className={classes.iconSize} />
                  </center>
                  <form onSubmit={this.onSubmit}>
                  <div className={classes.margin}>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <p className="font-login-error">{this.state.message}</p>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                              required
                              id="username"
                              key="usernameKey"
                              value={this.state.username}
                              onChange={this.onChangeInput("username")}
                              label="Username"
                              type="text"
                              fullWidth
                              autoFocus
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField
                              required
                              id="password"
                              key="passwordKey"
                              value={this.state.password}
                              onChange={this.onChangeInput("password")}
                              label="Password"
                              type="password"
                              fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: "10px" }}>
                        <Button type="submit" className="bg-gradient-theme-left" variant="contained" color="primary" style={{ textTransform: "none", background: "#206395" }}>LOG IN</Button>
                    </Grid>
                  </div>
                  </form>
                  </TabContainer>}
                </Paper>
              </Grid>
            </Grid>
          </Col>
        </Row>
      </div>
    );
  }
}


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default (withStyles(styles)(Login));
