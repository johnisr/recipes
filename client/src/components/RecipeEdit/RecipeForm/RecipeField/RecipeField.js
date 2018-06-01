import React from 'react';
import { Form, Label, TextArea } from 'semantic-ui-react';

const isANumber = str => str.match(/^(\s*|\d+)$/);

const RecipeField = props => {
  const {
    input,
    type,
    label,
    required,
    meta: { error, touched },
    showAllErrors,
  } = props;
  let inputField;
  if (type === 'textarea') {
    inputField = (
      <TextArea
        autoHeight
        style={{ width: '100%' }}
        placeholder={label}
        {...input}
      />
    );
  } else if (type === 'number') {
    inputField = (
      <Form.Input
        fluid
        placeholder={label}
        {...input}
        onChange={e => {
          const { value } = e.target;
          if (isANumber(value)) {
            input.onChange(e);
          }
        }}
      />
    );
  } else {
    inputField = <Form.Input fluid placeholder={label} {...input} />;
  }
  return (
    <Form.Field required={required} inline>
      <label>{label}</label>
      {(touched || showAllErrors) &&
        error && (
          <Label basic color="red" pointing="left" size="small">
            {error}
          </Label>
        )}
      {inputField}
    </Form.Field>
  );
};

export default RecipeField;
