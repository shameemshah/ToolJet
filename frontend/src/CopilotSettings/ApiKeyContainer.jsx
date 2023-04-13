import React, { useEffect, useState } from 'react';

export const ApiKeyContainer = ({ copilotApiKey = '', handleOnSave, isLoading = false }) => {
  const [inputValue, setInputValue] = useState(copilotApiKey);

  const handleOnchange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue(copilotApiKey);
  }, [copilotApiKey]);

  return (
    <div className="container-xl mt-3">
      <div className="row">
        <div class="mb-3 col-8">
          <small className="text-green">
            <img className="encrypted-icon" src="assets/images/icons/padlock.svg" width="12" height="12" />
            <span className="text-success mx-2 font-500">API KEY</span>
          </small>
          <input
            type="password"
            class="form-control mt-2"
            name="example-text-input"
            placeholder=""
            value={inputValue}
            onChange={handleOnchange}
          />
        </div>
      </div>

      <div
        className={`btn btn-primary ${isLoading ? 'btn-loading' : ''}`}
        data-cy="add-new-variables-button"
        onClick={(e) => {
          e.preventDefault();
          handleOnSave(inputValue);
        }}
      >
        Save
      </div>

      <div class="alert alert-warning mt-4" role="alert">
        <h4 class="alert-title"> Don&apos;t have an API key?</h4>
        <div class="text-muted">
          <strong style={{ fontWeight: 700, color: '#3E63DD' }}>ToolJet Copilot </strong>
          is currently in <strong style={{ fontWeight: 700, color: '#3E63DD' }}>beta</strong> and provided on request.
          Join our waitlist to be notified when API keys become available, or sign up for beta access to get started
          today.
        </div>
        <div className="mt-2">
          <button type="button" className="btn btn-light mr-2">
            Sign up for Beta Access
          </button>
        </div>
      </div>
    </div>
  );
};
