import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  iframe: {
    height: "450px",
    width: "100%",
  },
});


class PDFViewer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        {
          this.props.fileUrl ?
            <iframe
            title ={this.props.filename}
            className={classes.iframe}
            src={this.props.fileUrl}
            allowFullScreen >
          </iframe>
          :<div className="file-error-message">Unable to retrieve file from database</div>
          }
      </div>
    );
  }
}


export default withStyles(styles)(PDFViewer);