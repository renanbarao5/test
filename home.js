import routes from "../routes";
import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  Menu,
  MenuItem,
  Collapse,
  Tooltip
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/AddBoxTwoTone";
import Category2Icon from "@material-ui/icons/Business";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container, Col } from "reactstrap";

const Auth = require("../module/auth.js")();
const drawerWidth = 200;
const styles = theme => ({
  root: {
    display: "-webkit-box",
    flexGrow: 1,
  },
  appBar: {
    background:"#3080a1",
    color:"#fff",
    zIndex: 1300,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  container: {
    width: `calc(100% - 54px)`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  containerShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginTop: 10,
    marginLeft: 12,
    marginRight: 36,
    float:"left",
  },
  hide: {
    display: "none",
  },
  drawer: {
    display: "-webkit-inline-box",
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    background: "#222d32",
    width: drawerWidth,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "#222d32",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 6 + 5,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 6 + 5,
    },
  },
  listIcon: {
    color: "#fff",
    marginTop: "2px"
  },
  toolbar: {
    display: "-webkit-box",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: "30px",
    ...theme.mixins.toolbar
  },
});


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: true,
      anchorEl: null,
      userCredentials: null,
      username: "",
      role: ""
    };
  }


  componentDidMount() {
    var userCredentials = Auth.getUserCredentials();
    if (userCredentials === null) {
      this.props.history.push("/login");
    } else {
      this.setState({
        userCredentials: {
          id: userCredentials.id,
          username: userCredentials.username,
          fullname: userCredentials.fullname,
          role: userCredentials.role,
        },
        username: userCredentials.username,
        role: userCredentials.role
      });
      document.title = "PMS (" + userCredentials.username + ":" + userCredentials.role + ")";
    }
  };


  handleDrawerOpen = () => {
    this.setState({ open: true });
  };


  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  onLogout = () => {
    Auth.clearUserCredentials();
    this.setState({userCredentials: null});
    this.props.history.push("/login");
  };


  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };


  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  loading = () =>
   <div className="animated fadeIn pt-1 text-center">Loading...</div>



  showEmployeeNavPane = (classes) => {
    var checkAuth = Auth.isUserAuthorized(this.state.role, "employee_list");
    if (checkAuth) {
       return (
         <List>
           <ListItem className={classNames(classes.listIcon)} button key="employeeMain" onClick={() => this.props.history.push("/employee/list")}>
             <ListItemIcon>
               <Tooltip title="Employee" placement="bottom-end">
                 <Category2Icon className={classNames(classes.listIcon)} />
               </Tooltip>
             </ListItemIcon>
             <p className="home-sidenav-text font-family-sidenav">Employee</p>
           </ListItem>
         </List>
      );
    }
  }

  showProjectNavPane = (classes) => {
    var checkAuth = Auth.isUserAuthorized(this.state.role, "project_list");
    if (checkAuth) {
       return (
         <List>
           <ListItem className={classNames(classes.listIcon)} button key="projectMain" onClick={() => this.props.history.push("/project/list")}>
             <ListItemIcon>
               <Tooltip title="Project" placement="bottom-end">
                 <Category2Icon className={classNames(classes.listIcon)} />
               </Tooltip>
             </ListItemIcon>
             <p className="home-sidenav-text font-family-sidenav">Project</p>
           </ListItem>
         </List>
      );
    }
  }

  showAllocationNavPane = (classes) => {
    var checkAuth = Auth.isUserAuthorized(this.state.role, "allocation_list");
    if (checkAuth) {
       return (
         <List>
           <ListItem className={classNames(classes.listIcon)} button key="allocationMain" onClick={() => this.props.history.push("/allocation/list")}>
             <ListItemIcon>
               <Tooltip title="Allocation" placement="bottom-end">
                 <Category2Icon className={classNames(classes.listIcon)} />
               </Tooltip>
             </ListItemIcon>
             <p className="home-sidenav-text font-family-sidenav">Allocation</p>
           </ListItem>
         </List>
      );
    }
  }

  showRolesNavPane = (classes) => {
    var checkAuth = Auth.isUserAuthorized(this.state.role, "roles_list");
    if (checkAuth) {
       return (
         <List>
           <ListItem className={classNames(classes.listIcon)} button key="rolesMain" onClick={() => this.props.history.push("/roles/list")}>
             <ListItemIcon>
               <Tooltip title="Roles" placement="bottom-end">
                 <Category2Icon className={classNames(classes.listIcon)} />
               </Tooltip>
             </ListItemIcon>
             <p className="home-sidenav-text font-family-sidenav">Roles</p>
           </ListItem>
         </List>
      );
    }
  }

  showUsersNavPane = (classes) => {
    var checkAuth = Auth.isUserAuthorized(this.state.role, "users_list");
    if (checkAuth) {
       return (
         <List>
           <ListItem className={classNames(classes.listIcon)} button key="usersMain" onClick={() => this.props.history.push("/users/list")}>
             <ListItemIcon>
               <Tooltip title="Users" placement="bottom-end">
                 <Category2Icon className={classNames(classes.listIcon)} />
               </Tooltip>
             </ListItemIcon>
             <p className="home-sidenav-text font-family-sidenav">Users</p>
           </ListItem>
         </List>
      );
    }
  }


  showHistoryNavPane = classes => {
    var checkAuth = Auth.isUserAuthorized(this.state.role, "history_list");
    if (checkAuth) {
      return (
         <List>\n' +
           <ListItem className={classNames(classes.listIcon)} button key="History Main" onClick={() => this.props.history.push("/history/list")}>
             <ListItemIcon>
               <Tooltip title="History" placement="bottom-end">
                 <Category2Icon className={classNames(classes.listIcon)} />
               </Tooltip>
             </ListItemIcon>
             <p className="home-sidenav-text font-family-sidenav">History</p>
           </ListItem>
         </List>
      );
    }
  };

  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Col sm="12" className="main-background">
        <div className={classNames(classes.root)}>
        <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.containerShift]: this.state.open,
            })}
          >
            <Toolbar disableGutters={!this.state.open} className="nav-title-prd">
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
            <p className="font-family-prd font-style-header">ci-tech Project Management System</p>
            <div>
              <p className="font-username">{this.state.username} <span className="font-role">({this.state.role})</span></p>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                className="action-appbar"
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.onLogout}><ExitToApp/>&nbsp;Log Out</MenuItem>
              </Menu>
            </div>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
                <IconButton className={classNames(classes.listIcon)} onClick={this.handleDrawerClose}>
                  {theme.direction === "rtl" ? <ChevronRightIcon className={classNames(classes.listIcon)}/> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            {this.showEmployeeNavPane(classes)}
            {this.showProjectNavPane(classes)}
            {this.showAllocationNavPane(classes)}
            {this.showRolesNavPane(classes)}
            {this.showUsersNavPane(classes)}

          </Drawer>
          <Col lg="12" className={classNames(classes.container, {
              [classes.containerShift]: this.state.open,
            })}>
          <main className="main">
            <div className={classes.toolbar} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                        <route.component {...props} userCredentials={this.state.userCredentials}/>
                      )} />
                      ) : (null);
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          </Col>
        </div>
      </Col>
    );
  }
}


Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


export default withStyles(styles, { withTheme: true })(Home);
