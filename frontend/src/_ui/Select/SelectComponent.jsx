import React from 'react';
import _ from 'lodash';
import Select from 'react-select';
import defaultStyles from './styles';

export const SelectComponent = ({ options = [], value, onChange, ...restProps }) => {
  const darkMode = localStorage.getItem('darkMode') === 'true';
  const { styles, hasSearch = false, height, width, placeholder = 'Select..', customOption = undefined } = restProps;

  const useStyles = !_.isEmpty(styles) ? styles : defaultStyles(darkMode, width, height);
  const selectOptions =
    Array.isArray(options) && options.length === 0
      ? options
      : options.map((option) => {
          if (!option.hasOwnProperty('label')) {
            return _.mapKeys(option, (value, key) => (key === 'value' ? key : 'label'));
          }
          return option;
        });

  const currentValue = selectOptions.find((option) => option.value === value) || value;

  const handleOnChange = (newValue) => {
    onChange(newValue.value);
  };

  const renderCustomOption = (option) => {
    if (customOption) {
      return customOption(option);
    }

    return option.label;
  };

  return (
    <React.Fragment>
      <Select
        options={selectOptions}
        value={currentValue}
        search={hasSearch}
        onChange={handleOnChange}
        placeholder={placeholder}
        styles={useStyles}
        formatOptionLabel={(option) => renderCustomOption(option)}
        menuPortalTarget={document.body}
      />
    </React.Fragment>
  );
};
