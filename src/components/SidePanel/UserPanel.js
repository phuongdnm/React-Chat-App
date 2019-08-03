import React from 'react';
// prettier-ignore
import { Grid, Header, Icon, Dropdown, Image, Modal, Input, Button } from 'semantic-ui-react';

import firebase from '../../firebase';
import AvatarEditor from 'react-avatar-editor';

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    modal: false,
    previewImage: '',
    croppedImage: '',
    blob: ''
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

  handleChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        this.setState({ previewImage: reader.result });
      });
    }
  };

  handleCropImage = () => {
    if (this.avatarEditor) {
      this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
        let imageUrl = URL.createObjectURL(blob);
        this.setState({
          croppedImage: imageUrl,
          blob
        });
      });
    }
  };

  render() {
    const { user, modal, previewImage, croppedImage } = this.state;
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
                onChange={this.handleChange}
              />

              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <Grid.Column className="ui center aligned grid">
                    {/* Image preview*/}
                    {previewImage && (
                      <AvatarEditor
                        ref={node => (this.avatarEditor = node)}
                        image={previewImage}
                        width={120}
                        height={120}
                        border={50}
                        scale={1.2}
                      />
                    )}
                  </Grid.Column>

                  <Grid.Column>
                    {/*Cropped image preview */}
                    {croppedImage && (
                      <Image
                        style={{ margin: '3.5em auto' }}
                        width={100}
                        height={100}
                        src={croppedImage}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              {croppedImage && (
                <Button color="green" inverted>
                  <Icon name="save" /> Change Avatar
                </Button>
              )}
              <Button color="orange" inverted onClick={this.handleCropImage}>
                <Icon name="image" /> Preview/ Save preview
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
