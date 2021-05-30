import React from "react";
import { Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import { useState } from "react";
//import { getJson } from "../data/api";
import "../../css/feedback.css";
import { FaRegLightbulb } from "react-icons/fa";
import { AiFillQuestionCircle } from "react-icons/ai";
import { AiFillBug } from "react-icons/ai";
import { postTo } from "../../data/api";
import { validateEmail } from "../../utils/common";
import { Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SequenceHighlighter from "./SequenceHighlighter";

const SequenceDashboard = (props) => {
  const { defaultSubject = "Suggestion" } = props;

  const [isOpen, setIsOpen] = useState(false);

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("None Given");
  const [subject, setSubject] = useState(defaultSubject);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [fNameValidated, setFNameValidated] = useState(false);
  const [lNameValidated, setLNameValidated] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [messageValidated, setMessageValidated] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [contactUsResponseMessage, setContactUsResponseMessage] = useState("");

  const [contactUsErrorMessage, setContactUsErrorMessage] = useState("");

  const messageMaxLen = 2400;
  const [messageCharsLeft, setMessageCharsLeft] = useState(messageMaxLen);

  const handleWordCount = (e) => {
    const charCount = e.target.value.length;
    const charLength = messageMaxLen - charCount;
    setMessageCharsLeft(charLength);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      fname: fname,
      lname: "not given",
      email: email,
      page: window.location.href,
      // page: window.location.href.split("?")[0],
      subject: "Feedback Form " + subject,
      message: message,
    };

    const url = `/auth/contact?query=${JSON.stringify(formData)}`;
    const myHeaders = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    postTo(url, myHeaders)
      .then((response) => {
        setContactUsResponseMessage(response.data.message);
      })
      .catch((error) => {
        setContactUsErrorMessage(
          "Oops, something went wrong! We did not receive your message. Please try again later."
        );
      });

    resetForm();
  };

  const resetForm = () => {
    setFName("");
    setLName("");
    setEmail("");
    setSubject("Suggestion");
    setMessage("");
    setMessageCharsLeft(`${messageMaxLen}`);
    setFormValidated(false);
    setFNameValidated(false);
    setLNameValidated(false);
    setEmailValidated(false);
    setMessageValidated(false);
  };

  const closeForm = () => {
    resetForm();
    setIsOpen(!isOpen);
  };

  const onlyText = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z-]/g, "");
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="form">
      <div className={"sidebar-contact feedback_ protvistaicon" + (isOpen ? " active" : "")}>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <div
              className={"toggle rotate" + (isOpen ? " active mt-1" : "")}
              onClick={() => closeForm()}
            >
              {isOpen ? (
                <CloseIcon style={{ fill: "white" }} />
              ) : (
                <span className="name">
                  <b className="color-white">Sites</b>
                </span>
              )}
            </div>
            <div className="scroll">
              <h5>Site Feature</h5>
              <SequenceHighlighter 
                details={props.details}
                sequenceObject={props.sequences}
                selectedHighlights={props.selectedHighlights}
                setSelectedHighlights={props.setSelectedHighlights}
                highlightsCount={props.highlightsCount}
                setHighlightsCount={props.setHighlightsCount}
                sequenceSearchText={props.sequenceSearchText}
                setSequenceSearchText={props.setSequenceSearchText}
                showNumbers={props.showNumbers}
              />
              
            </div>
          </Col>
        </Row>
      </div>
    </form>
  );
};
export default SequenceDashboard;
