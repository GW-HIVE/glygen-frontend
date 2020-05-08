import React, { useState } from "react";
import copyIcon from "../images/icons/copy.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Image } from "react-bootstrap";
const ReactCopyClipboard = props => {
  const { value } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <CopyToClipboard text={value} onCopy={handleCopy}>
        {/* <button>Copy to clipboard</button> */}

        <Image src={copyIcon} alt="Related glycans" />
      </CopyToClipboard>

      {copied ? <span style={{ color: "red" }}>Copied.</span> : null}
    </div>
  );
};
export default ReactCopyClipboard;
