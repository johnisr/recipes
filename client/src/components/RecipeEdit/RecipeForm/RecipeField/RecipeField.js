import React from 'react';
import { Form, Label, TextArea, Dropdown } from 'semantic-ui-react';
import allTags from '../../../../selectors/allTags';
import tagsToOptions from '../../../../selectors/tagsToOptions';

const isANumber = str => str.match(/^(\s*|\d+)$/);

const RecipeField = props => {
  const {
    input,
    type,
    label,
    required,
    meta: { error, touched },
    showAllErrors,
    fields,
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
  } else if (type === 'category') {
    inputField = (
      <Dropdown
        style={{ width: '100%' }}
        placeholder={label}
        multiple
        search
        selection
        upward
        options={tagsToOptions(allTags)}
        {...input}
        value={fields.getAll() ? fields.getAll() : []}
        onChange={(e, data) => {
          fields.removeAll();
          data.value.forEach((d, index) => fields.insert(index, d));
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
