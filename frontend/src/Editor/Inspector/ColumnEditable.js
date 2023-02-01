import React from 'react';
import { QuerySelector } from './QuerySelector';

import { CodeHinter } from '../CodeBuilder/CodeHinter';

export function renderQuerySelector (component, dataQueries, eventOptionUpdated, eventName, eventMeta) {
  let definition = component.component.definition.events[eventName];
  definition = definition || {};

  return (
    <QuerySelector
      param={{ name: eventName }}
      definition={definition}
      eventMeta={eventMeta}
      dataQueries={dataQueries}
      eventOptionUpdated={eventOptionUpdated}
    />
  );
}

export function renderColumnEditable (
  component,
  componentMeta,
  paramUpdated,
  dataQueries,
  currentState,
  components = {},
  param = 'showOnDesktop',
  paramType = 'others',
  darkMode = false,
) {
  const componentDefinition = component.component.definition;
  const paramTypeDefinition = componentDefinition[paramType] || {};
  const definition = paramTypeDefinition[param] || {};

  const meta = componentMeta[paramType][param];

  return (
    <Code
      param={{ name: param, ...component.component.properties[param] }}
      definition={definition}
      dataQueries={dataQueries}
      onChange={paramUpdated}
      paramType={paramType}
      components={components}
      componentMeta={componentMeta}
      currentState={currentState}
      darkMode={darkMode}
      componentName={component.component.name || null}
      type={meta.type}
      fxActive={definition.fxActive ?? false}
      onFxPress={(active) => {
        paramUpdated({ name: param, ...component.component.properties[param] }, 'fxActive', active, paramType);
      }}
      component={component}
    />
  );
}

export const Code = ({
  param,
  definition,
  onChange,
  paramType,
  componentMeta,
  currentState,
  darkMode,
  componentName,
  onFxPress,
  fxActive,
  component,
}) => {
  const initialValue = definition ? definition.value : '';
  const paramMeta = componentMeta[paramType][param.name];
  const displayName = paramMeta.displayName || param.name;

  function handleCodeChanged (value) {
    onChange(param, 'value', value, paramType);
  }

  const options = paramMeta.options || {};

  const getfieldName = React.useMemo(() => {
    return param.name;
  }, [param]);

  return (
    <div className={`mb-2 field ${options.className}`}>
      <CodeHinter
        enablePreview={true}
        currentState={currentState}
        initialValue={initialValue}
        mode={options.mode}
        theme={darkMode ? 'monokai' : options.theme}
        lineWrapping={true}
        className={options.className}
        onChange={(value) => handleCodeChanged(value)}
        componentName={`widget/${componentName}::${getfieldName}`}
        type={paramMeta.type}
        paramName={param.name}
        paramLabel={displayName}
        fieldMeta={paramMeta}
        onFxPress={onFxPress}
        fxActive={fxActive}
        component={component}
      />
    </div>
  );
};
