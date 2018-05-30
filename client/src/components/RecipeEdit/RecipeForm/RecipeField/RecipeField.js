import React from 'react';

const isANumber = str => str.match(/^(\s*|\d+)$/);

const RecipeField = props => {
  const {
    input,
    type,
    name,
    label,
    meta: { active, error, touched },
    showAllErrors,
  } = props;
  let inputField;
  if (type === 'textarea') {
    inputField = (
      <textarea
        id={name}
        className="materialize-textarea"
        {...input}
        style={{ marginBottom: '5px' }}
      />
    );
  } else if (type === 'number') {
    inputField = (
      <input
        type="text"
        id={name}
        className="materialize-textarea"
        {...input}
        onChange={e => {
          const { value } = e.target;
          if (isANumber(value)) {
            input.onChange(e);
          }
        }}
        style={{ marginBottom: '5px' }}
      />
    );
  } else {
    inputField = <input id={name} {...input} style={{ marginBottom: '5px' }} />;
  }
  return (
    <div className="input-field">
      {inputField}
      <label className={active || input.value ? 'active' : ''} htmlFor={name}>
        {label}
      </label>
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {(touched || showAllErrors) && error}
      </div>
    </div>
  );
};

export default RecipeField;
