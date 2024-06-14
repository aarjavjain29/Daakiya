import React, { useState } from 'react';
import Response from './Response';
import Prism from 'prismjs';

export default function Input() {
    const [url, setUrl] = useState('');
    const [requestType, setRequestType] = useState('GET');
    const [contentType, setContentType] = useState('json');
    const [parameters, setParameters] = useState([{ key: '', value: '' }]);
    const [requestJson, setRequestJson] = useState('');
    const [response, setResponse] = useState('');

    const handleAddParam = () => {
        setParameters([...parameters, { key: '', value: '' }]);
    };

    const handleParamChange = (index, event) => {
        const newParameters = parameters.slice();
        newParameters[index][event.target.name] = event.target.value;
        setParameters(newParameters);
    };

    const handleRemoveParam = (index) => {
        const newParameters = parameters.slice();
        newParameters.splice(index, 1);
        setParameters(newParameters);
    };
        const handleSubmit = async () => {
            // Show please wait message
            setResponse("Please wait.. Fetching response...");
    
            // Fetch all the values user has entered
            let data;
            if (contentType === "params") {
                data = {};
                parameters.forEach((param, index) => {
                    if (param.key) {
                        data[param.key] = param.value;
                    }
                });
                data = JSON.stringify(data);
            } else {
                data = requestJson;
            }
    
            try {
                let responseText;
                if (requestType === "GET") {
                    const response = await fetch(url, { method: "GET" });
                    responseText = await response.text();
                } else {
                    const response = await fetch(url, {
                        method: "POST",
                        body: data,
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    });
                    responseText = await response.text();
                }
                setResponse(responseText); 
                Prism.highlightAll();
            } catch (error) {
                console.error("Error:", error);
                setResponse("An error occurred while fetching the response.");
            }
        };

    return (
        <div>
            {/* URL box */}
            <div className="form-group row my-5">
                <label htmlFor="url" className="col-sm-2 col-form-label">URL</label>
                <div className="col-sm-10">
                    <input
                        type="text"
                        className="form-control"
                        id="url"
                        placeholder="Enter URL here"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
            </div>

            {/* Request type box */}
            <fieldset className="form-group mb-4">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Request Type</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="requestType"
                                id="get"
                                value="GET"
                                checked={requestType === 'GET'}
                                onChange={(e) => setRequestType(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="get">
                                GET
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="requestType"
                                id="post"
                                value="POST"
                                checked={requestType === 'POST'}
                                onChange={(e) => setRequestType(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="post">
                                POST
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>

            {/* Content type box */}
            <fieldset className="form-group mb-4">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Content Type</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="contentType"
                                id="jsonRadio"
                                value="json"
                                checked={contentType === 'json'}
                                onChange={(e) => setContentType(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="jsonRadio">
                                JSON
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="contentType"
                                id="paramsRadio"
                                value="params"
                                checked={contentType === 'params'}
                                onChange={(e) => setContentType(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="paramsRadio">
                                Custom Parameters
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>

            {/* Parameters box - This will hide on clicking json option in content type  */}
            {contentType === 'params' && (
                <div id="parametersBox" className='mb-4'>
                    {parameters.map((param, index) => (
                        <div className="form-group row" key={index}>
                            <label className="col-sm-2 col-form-label">Parameter {index + 1}</label>
                            <div className="col-md-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Parameter Key"
                                    name="key"
                                    value={param.key}
                                    onChange={(e) => handleParamChange(index, e)}
                                />
                            </div>
                            <div className="col-md-3">
                                <input  
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Parameter Value"
                                    name="value"
                                    value={param.value}
                                    onChange={(e) => handleParamChange(index, e)}
                                />
                            </div>
                            {index > 0 && (
                                <div className="col-md-2">
                                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveParam(index)}>-</button>
                                </div>
                            )}
                        </div>
                    ))}
                   <button type="button" className="btn btn-primary" onClick={handleAddParam}>+</button>
                </div>
            )}

            {/* Json Request box - This will hide on clicking parameters option in content type */}
            {contentType === 'json' && (
                <div className="my-3" id="requestJsonBox">
                    <div className="form-group row">
                        <label htmlFor="requestJsonText" className="col-sm-2 col-form-label">Enter Request Json</label>
                        <div className="col-sm-10">
                            <textarea
                                className="form-control"
                                id="requestJsonText"
                                rows="3"
                                value={requestJson}
                                onChange={(e) => setRequestJson(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
            )}

            {/* Submit button which will trigger fetch api */}
            <div className="form-group row my-2">
                <div className="col-sm-10">
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>

            <Response response={response}/>
        </div>
    );
}
