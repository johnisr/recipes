import React from 'react';
import { Field } from 'redux-form';
import { Segment } from 'semantic-ui-react';
import RecipeField from '../RecipeField/RecipeField';

const RecipeFieldTime = props => {
  const { fields, label, showAllErrors } = props;
  if (!fields.length) fields.push();

  return (
    <div>
      {fields.map(time => (
        <Segment.Group key={label}>
          <Segment>
            <h4>{label}</h4>
          </Segment>
          <Segment.Group raised>
            <Segment.Group horizontal>
              <Segment>
                <Field
                  label="days"
                  name={`${time}.days`}
                  type="number"
                  component={RecipeField}
                  placeholder="days"
                  showAllErrors={showAllErrors}
                />
              </Segment>
              <Segment>
                <Field
                  label="hours"
                  name={`${time}.hours`}
                  type="number"
                  component={RecipeField}
                  placeholder="hours"
                  showAllErrors={showAllErrors}
                />
              </Segment>
              <Segment>
                <Field
                  label="min"
                  name={`${time}.minutes`}
                  type="number"
                  component={RecipeField}
                  placeholder="min"
                  showAllErrors={showAllErrors}
                />
              </Segment>
              <Segment>
                <Field
                  label="sec"
                  name={`${time}.seconds`}
                  type="number"
                  component={RecipeField}
                  placeholder="sec"
                  showAllErrors={showAllErrors}
                />
              </Segment>
            </Segment.Group>
          </Segment.Group>
        </Segment.Group>
      ))}
    </div>
  );
};

export default RecipeFieldTime;
