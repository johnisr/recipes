import React from 'react';
import { Field } from 'redux-form';

import RecipeField from '../RecipeField/RecipeField';

const RecipeFieldArray = props => {
  const { fields, label, sublabel, required, showAllErrors } = props;
  if (!fields.length && required) fields.push();
  return (
    <div>
      <div className="row">
        <h4 className="left">{label}</h4>
        <button
          className="btn right"
          type="button"
          onClick={() => fields.push({})}
        >
          <i className="material-icons">add</i>
        </button>
      </div>
      <ul>
        {fields.map((section, index) => (
          <li key={`${section + index}`}>
            <div className="row">
              <div className="col s10">
                <Field
                  label={`${label} Section Title #${index + 1}`}
                  className="col s10"
                  name={`${section}.title`}
                  type="text"
                  component={RecipeField}
                  placeholder="Section Title"
                  showAllErrors={showAllErrors}
                />
              </div>
              <button
                className="btn right"
                type="button"
                title="Remove"
                disabled={fields.length === 1 && required}
                onClick={() => fields.remove(index)}
              >
                <i className="material-icons">delete</i>
              </button>
            </div>
            <Field
              label={sublabel}
              name={`${section}.body`}
              type="textarea"
              component={RecipeField}
              placeholder="body"
              showAllErrors={showAllErrors}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeFieldArray;
