import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

class DireactMessages extends React.Component {
  state = {
    users: []
  };
  render() {
    const { users } = this.state;
    
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail" /> DIRECT MESSAGES
          </span>{' '}
          ({users.length})
        </Menu.Item>
        {/*Users to send direct message */}
      </Menu.Menu>
    );
  }
}

export default DireactMessages;
