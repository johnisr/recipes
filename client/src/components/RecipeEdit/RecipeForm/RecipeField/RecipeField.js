import React from 'react';
import { Form, Label, TextArea, Dropdown, Popup } from 'semantic-ui-react';
import { allTagsOptions, categories } from '../../../../selectors/allTags';

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
      <Popup
        position="left center"
        header="Tag Categories"
        content={Object.keys(categories).map(key => (
          <div key={categories[key].name}>
            <Label empty circular color={categories[key].color} />
            <span>{categories[key].name}</span>
          </div>
        ))}
        on="focus"
        trigger={
          <Dropdown
            style={{ width: '100%' }}
            placeholder={label}
            multiple
            search
            selection
            upward
            options={allTagsOptions}
            {...input}
            value={fields.getAll() ? fields.getAll() : []}
            onChange={(e, data) => {
              fields.removeAll();
              data.value.forEach((d, index) => fields.insert(index, d));
            }}
          />
        }
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
