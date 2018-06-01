import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

const Dashboard = () => {
  return (
    <div>
      Dashboard!
      <div className="fixed-action-btn">
        <Button
          icon
          positive
          circular
          as={Link}
          to="/recipesNew"
          floated="right"
        >
          <Icon name="add" size="large" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
