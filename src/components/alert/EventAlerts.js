import React from "react";
import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import CardLoader from "../load/CardLoader";
import { Card, Col, Row } from "react-bootstrap";

export default function EventAlerts(props) {
  const [open, setOpen] = React.useState(true);
  const [style, setStyle] = React.useState("gg-tooltip event-alerts");

  return (
    <div>
      <Collapse in={open} className={style}>
        <Card>
          <CardLoader pageLoading={props.pageLoading} />
          <Alert
            classes={{
              message: "alert-banner-message",
              icon: "alert-banner-icon gg-align-middle",
            }}
            severity="info"
            action={
              <IconButton
                aria-label="close"
                // color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  setStyle(!style);
                }}
              >
                <CloseIcon fontSize="inherit" className="gg-blue-color" />
              </IconButton>
            }
          >
            <Row>
              {props.data.map((obj) => (
                <Col xs={12} sm={"auto"} className={"mt-1 mb-1"}>
                  <>
                    <AlertTitle>
                      <h5 className={"gg-blue-color"}>{obj.title}</h5>
                    </AlertTitle>
                    {obj.description} {obj.start_date} - {obj.end_date}{" "}
                    <a href={obj.url} target="_blank" rel="noopener noreferrer">
                      <span className="gg-link">{obj.url_name}</span>{" "}
                    </a>{" "}
                    {obj.venue}
                  </>
                </Col>
              ))}
            </Row>
          </Alert>
        </Card>
      </Collapse>
    </div>
  );
}
EventAlerts.propTypes = {
  data: PropTypes.object,
};
