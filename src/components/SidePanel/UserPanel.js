import React from 'react';
// prettier-ignore
import { Grid, Header, Icon, Dropdown, Image, Modal, Input, Button } from 'semantic-ui-react';

import firebase from '../../firebase';

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    modal: false
  };

  componentDidMount() {
    this.setState({ user: this.props.currentUser });
  }

  dropdownOptions = () => [
    {
      text: (
        <div>
          Signed in as <strong>{this.state.user.displayName}</strong>
        </div>
      ),
      disabled: true,
      key: 'user'
    },
    {
      text: (
        <div onClick={this.openModal}>
          <Icon name="user" />
          Change Avatar
        </div>
      ),
      key: 'avatar'
    },
    {
      text: (
        <div onClick={this.handleSignOut}>
          <Icon name="sign out alternate" />
          Sign Out
        </div>
      ),
      key: 'signout'
    }
  ];

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('signed out!'));
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  render() {
    const { user, modal } = this.state;
    const { primaryColor } = this.props;

    return (
      <Grid style={{ background: primaryColor }}>
        <Grid.Column>
          <Grid.Row style={{ padding: '1.2em', marginBottom: '2rem' }}>
            {/* App header on top left */}
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>DevChat</Header.Content>
            </Header>
          </Grid.Row>
          {/* User Dropdown */}
          <Header style={{ padding: '0.25em' }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image
                    src={user.photoURL}
                    spaced="right"
                    avatar
                    style={{ marginRight: '1.5rem' }}
                  />
                  {user.displayName}
                </span>
              }
              options={this.dropdownOptions()}
            />
          </Header>

          {/* Change user avatar modal */}
          <Modal open={modal} onClose={this.closeModal}>
            <Modal.Header>Change avatar</Modal.Header>
            <Modal.Content>
              <Input
                fluid
                type="file"
                label="New Avatar: "
                name="previewImage"
              />

              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <Grid.Column className="ui center aligned grid">
                    {/* Image preview*/}
                  </Grid.Column>

                  <Grid.Column>{/*Cropped image preview */}</Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" inverted>
                <Icon name="save" /> Change Avatar
              </Button>
              <Button color="orange" inverted>
                <Icon name="image" /> Preview
              </Button>
              <Button color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
