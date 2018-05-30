import React from 'react';
import { Field } from 'redux-form';
import RecipeField from '../RecipeField/RecipeField';

const RecipeFieldTime = props => {
  const { fields, label, showAllErrors } = props;
  if (!fields.length) fields.push();

  return (
    <div>
      {fields.map(time => (
        <div key={label}>
          <h6>{label}</h6>
          <div className="col s3">
            <Field
              label="days"
              name={`${time}.days`}
              type="number"
              component={RecipeField}
              placeholder="days"
              showAllErrors={showAllErrors}
            />
          </div>
          <div className="col s3">
            <Field
              label="hours"
              name={`${time}.hours`}
              type="number"
              component={RecipeField}
              placeholder="hours"
              showAllErrors={showAllErrors}
            />
          </div>
          <div className="col s3">
            <Field
              label="min"
              name={`${time}.minutes`}
              type="number"
              component={RecipeField}
              placeholder="min"
              showAllErrors={showAllErrors}
            />
          </div>
          <div className="col s3">
            <Field
              label="sec"
              name={`${time}.seconds`}
              type="number"
              component={RecipeField}
              placeholder="sec"
              showAllErrors={showAllErrors}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeFieldTime;
