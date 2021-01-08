import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = [
    "text/plain",
    // "text/rtf",
    // "application/pdf",
    // "application/msword",
    // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      // setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select accepted file type (.txt)");
    }
  };

  return (
    <form>
      <label>
        <input className="mt-2" type="file" onChange={handleChange} />
      </label>
      <div className="output">
        {error && (
          <div className="error" style={{ color: "red" }}>
            {error}
          </div>
        )}
        {file && <div>{file.name}</div>}
      </div>
    </form>
  );
};

export default UploadForm;
