import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // Import the Prism.js CSS file

export default function Response({ response }) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [response]);

  return (
    <div className="my-3" id="responseJsonBox">
      <div className="form-group row">
        <label htmlFor="responseJsonText" className="col-sm-2 col-form-label">Response</label>
        <div className="col-sm-10">
          <pre id="responsePre" className="language-javascript">
            <code ref={codeRef} className="language-javascript">
            {response ? response : 'no data'}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
