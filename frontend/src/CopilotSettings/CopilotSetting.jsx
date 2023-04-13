import React, { useEffect, useState } from 'react';
import { ApiKeyContainer } from './ApiKeyContainer';
import { copilotService, orgEnvironmentVariableService } from '@/_services';
import { toast } from 'react-hot-toast';

export const CopilotSetting = () => {
  const [copilotApiKey, setCopilotApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const saveCopilotApiKey = async (apikey) => {
    setIsLoading(true);
    const isCopilotApiKeyPresent = await fetchCopilotApiKey(apikey);

    return setTimeout(() => {
      if (isCopilotApiKeyPresent === true) {
        return orgEnvironmentVariableService
          .create('copilot_api_key', apikey, 'server', false)
          .then(() => {
            setCopilotApiKey(apikey);
            toast.success('Copilot API key saved successfully');
          })
          .finally(() => setIsLoading(false));
      }

      return toast.error('API key is not valid') && setIsLoading(false);
    }, 400);
  };

  const fetchCopilotApiKey = (apiKey) => {
    return new Promise((resolve, reject) => {
      copilotService
        .getCopilotApiKey()
        .then(({ data, status }) => {
          if (status === 200 && data == apiKey) {
            return resolve(true);
          }

          return resolve(false);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  };

  useEffect(() => {
    orgEnvironmentVariableService.getVariables().then((data) => {
      const isCopilotApiKeyPresent = data.variables.some((variable) => variable.variable_name === 'copilot_api_key');
      console.log('---GPT KEY isCopilotApiKeyPresent', data.variables);
      const shouldUpdate = isCopilotApiKeyPresent ? fetchCopilotApiKey(isCopilotApiKeyPresent) : false;
      if (shouldUpdate) {
        //place holder for api key whihc of 32 length, as we wont be sharing the actual key with the user

        const key = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

        setCopilotApiKey(key);
      }
    });

    return () => {
      setCopilotApiKey('');
    };
  }, []);

  return (
    <div className="wrapper org-variables-page animation-fade">
      <div className="page-wrapper">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="row align-items-center">
              <div className="col">
                <div className="page-pretitle"></div>
                <h2 className="page-title copilot" data-cy="page-title">
                  {'Copilot Settings'}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ApiKeyContainer copilotApiKey={copilotApiKey} handleOnSave={saveCopilotApiKey} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
