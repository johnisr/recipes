import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Grid, Segment, Icon, Button } from 'semantic-ui-react';

import RecipeField from '../RecipeField/RecipeField';

class RecipeFieldArray extends Component {
  componentDidMount() {
    const { fields, required } = this.props;
    if (!fields.length && required) fields.push();
  }
  render() {
    const { fields, label, sublabel, required, showAllErrors } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Grid>
            <Grid.Column floated="left">
              <h3>{label}</h3>
            </Grid.Column>
            <Grid.Column floated="right">
              <Button
                floated="right"
                type="button"
                icon
                positive
                onClick={() => fields.push({})}
              >
                <Icon name="add" size="small" />
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment>
          <Grid>
            {fields.map((section, index, array) => (
              <Grid.Column
                key={`${section + index}`}
                mobile={16}
                tablet={array.length === 1 ? 16 : 8}
                computer={array.length === 1 ? 16 : 8}
              >
                <Segment>
                  <Grid>
                    <Grid.Column width={8} floated="left">
                      <Field
                        label="Title"
                        name={`${section}.title`}
                        type="text"
                        component={RecipeField}
                        showAllErrors={showAllErrors}
                      />
                    </Grid.Column>
                    <Grid.Column floated="right">
                      <Button
                        icon
                        negative
                        floated="right"
                        type="button"
                        disabled={fields.length === 1 && required}
                        onClick={() => fields.remove(index)}
                      >
                        <Icon name="delete" size="small" />
                      </Button>
                    </Grid.Column>
                    <Grid.Column width={16}>
                      <Field
                        label={sublabel}
                        name={`${section}.body`}
                        required={required}
                        type="textarea"
                        component={RecipeField}
                        showAllErrors={showAllErrors}
                      />
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </Segment>
      </Segment.Group>
    );
  }
}

export default RecipeFieldArray;
