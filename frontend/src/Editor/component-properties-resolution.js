import { resolveReferences } from '@/_helpers/utils';

var resolvePropertiesCalls = 0;
var resolveStylesCalls = 0;
var resolveGeneralPropertiesCalls = 0;
var resolveGeneralStylesCalls = 0;

const abc = (val, currentState, defaultValue, customResolvables, calledFrom = '') => {
  switch (calledFrom) {
    case 'prop':
      // console.log('calls--- comp resolveProperties--- ', ++resolvePropertiesCalls);
      return resolveReferences(val, currentState, defaultValue, customResolvables);
    case 'style':
      // console.log('calls--- comp resolveStyles--- ', ++resolvePropertiesCalls);
      return resolveReferences(val, currentState, defaultValue, customResolvables);
    case 'general':
      // console.log('calls--- comp resolveGeneralProperties--- ', ++resolvePropertiesCalls);
      return resolveReferences(val, currentState, defaultValue, customResolvables);
    case 'generalStyle':
      // console.log('calls--- comp resolveGeneralStyles--- ', ++resolvePropertiesCalls);
      return resolveReferences(val, currentState, defaultValue, customResolvables);
  }
};

export const resolveProperties = (component, currentState, defaultValue, customResolvables) => {
  if (currentState) {
    return Object.entries(component.definition.properties).reduce(
      (properties, entry) => ({
        ...properties,
        ...{
          [entry[0]]: entry[1]?.skipResolve
            ? entry[1].value
            : abc(entry[1].value, currentState, defaultValue, customResolvables, 'prop'),
        },
      }),
      {}
    );
  } else return {};
};

export const resolveStyles = (component, currentState, defaultValue, customResolvables) => {
  if (currentState) {
    const styles = component.definition.styles;
    return Object.entries(styles).reduce((resolvedStyles, entry) => {
      const key = entry[0];
      const value = entry[1]?.skipResolve
        ? entry[1].value
        : abc(entry[1].value, currentState, defaultValue, customResolvables, 'style');
      return {
        ...resolvedStyles,
        ...{ [key]: value },
      };
    }, {});
  } else {
    return {};
  }
};

export const resolveGeneralProperties = (component, currentState, defaultValue, customResolvables) => {
  if (currentState) {
    const generalProperties = component.definition?.general ?? {};
    return Object.entries(generalProperties).reduce((resolvedGeneral, entry) => {
      const key = entry[0];
      const value = entry[1]?.skipResolve
        ? entry[1].value
        : abc(entry[1].value, currentState, defaultValue, customResolvables, 'general');
      return {
        ...resolvedGeneral,
        ...{ [key]: value },
      };
    }, {});
  } else {
    return {};
  }
};

export const resolveGeneralStyles = (component, currentState, defaultValue, customResolvables) => {
  if (currentState) {
    const generalStyles = component.definition?.generalStyles ?? {};
    return Object.entries(generalStyles).reduce((resolvedGeneral, entry) => {
      const key = entry[0];
      const value = entry[1]?.skipResolve
        ? entry[1].value
        : abc(entry[1].value, currentState, defaultValue, customResolvables, 'generalStyle');
      return {
        ...resolvedGeneral,
        ...{ [key]: value },
      };
    }, {});
  } else {
    return {};
  }
};
