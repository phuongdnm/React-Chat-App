import React from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import { connect } from 'react-redux';

// prettier-ignore
const App = ({ currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor }) => (
  <Grid columns="equal" className="app" style={{ background: secondaryColor }}>
    <ColorPanel
      currentUser={currentUser}
      key={currentUser && currentUser.name}
    />
    <SidePanel currentUser={currentUser} key={currentUser && currentUser.id} primaryColor={primaryColor}/>

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        currentChannel={currentChannel}
        key={currentChannel && currentChannel.id}
        currentUser={currentUser}
        isPrivateChannel={isPrivateChannel}
      />
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel
        key={currentChannel && currentChannel.name}
        isPrivateChannel={isPrivateChannel}
        currentChannel={currentChannel}
        userPosts={userPosts}
      />
    </Grid.Column>
  </Grid>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel,
  userPosts: state.channel.userPosts,
  primaryColor: state.colors.primaryColor,
  secondaryColor: state.colors.secondaryColor
});
export default connect(mapStateToProps)(App);
