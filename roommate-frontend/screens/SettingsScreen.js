
import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Alert, AppRegistry, Button, Image, TouchableOpacity } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import ReactNativeSettingsPage, {
  NavigateRow,
  SectionRow,
  SwitchRow,
  CheckRow,
  SliderRow
} from 'react-native-settings-page';
import * as SecureStore from 'expo-secure-store';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { determineURL } from '../utils';

export default class SettingsScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      showProfile: false,
      animalFriendly: false,
      gender: 'MA',
      maxAge: 32,
      maxDistance: 32,
      token: null,
      dialogVisible: false
    };
  }
  componentDidMount() {
    SecureStore.getItemAsync('token')
      .then(token => {
        fetch(`${determineURL()}/api/v1/user/`, {
          method: 'GET',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          })
        })
          .then(response => response.json())
          .then(user => {
            if (user.id !== undefined) {
              this.setState({
                showProfile: user.show_profile,
                animalFriendly: user.animal_friendly,
                gender: user.gender,
                maxAge: user.max_age,
                maxDistance: user.max_distance,
                token
              })
              console.log(user)
            } else {
              throw "Invalid login";
            }
          })
      })
  }
  showDialog = () => {
    this.setState({ dialogVisible: true });
  }
  closeDialog() {
    this.setState({ dialogVisible: false });
  }
  submitInput() {
    this.setState({ dialogVisible: false });
  }
  sendInput(inputText) {
    if (inputText == null) {
      this.closeDialog()
    }
    console.log("sendInput (EC): " + inputText);
  }
  updatePreferences = () => {
    const { gender, animalFriendly, maxAge, showProfile, maxDistance, token } = this.state

    fetch(`${determineURL()}/api/v1/user/`, {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }),
      body: JSON.stringify({
        show_profile: showProfile,
        animal_friendly: animalFriendly,
        gender: gender,
        max_age: maxAge,
        max_distance: maxDistance
      })
    })
  }
  render() {
    const { gender, animalFriendly, maxAge, showProfile, maxDistance, dialogVisible } = this.state

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <ReactNativeSettingsPage>
          <DialogInput isDialogVisible={dialogVisible}
            title={"Email Change"}
            message={"Enter New Email"}
            submitInput={(inputText) => this.sendInput(inputText)}
            closeDialog={() => this.closeDialog()}>
            <DialogInput.Button label="Cancel" onPress={() => this.closeDialog()} />
            <DialogInput.Button label="Delete" onPress={() => this.closeDialog()} />
          </DialogInput>

          <SectionRow text='Account Settings'>
            <NavigateRow
              text='Phone Number'
              iconName='phone'
            /*onPressCallback={this._navigateToScreen}*/
            />
            <NavigateRow
              text='Email'
              iconName='envelope'
              onPressCallback={() => this.showDialog()}
            />
          </SectionRow>

          <SectionRow text='Discovery'>
            <SwitchRow
              text="Animal Friendly"
              iconName="user-secret"
              _value={animalFriendly}
              onPressCallback={() => {
                this.updatePreferences();
              }}
              _onValueChange={() => {
                this.setState({ animalFriendly: !animalFriendly });
              }}
            />
            <SliderRow
              text={`Maximum Distance ${parseInt(maxDistance)}`}
              iconName="location-arrow"
              _color="#dc143c"
              _min={0}
              _max={100}
              value={maxDistance}
              onPressCallback={() => {
                this.updatePreferences();
              }}
              _onValueChange={value => {
                this.setState({ maxDistance: value });
              }}
            />
            <SliderRow
              text={`Maximum Age ${parseInt(maxAge)}`}
              iconName="hashtag"
              _color="#dc143c"
              _min={18}
              _max={120}
              onPressCallback={() => {
                this.updatePreferences();
              }}
              _onValueChange={value => {
                this.setState({ maxAge: value });
              }} />

          </SectionRow>

          <SectionRow text="Usage">
            <SwitchRow
              text="Show Me on Finder"
              iconName="user-secret"
              _value={showProfile}
              onPressCallback={() => {
                this.updatePreferences();
              }}
              _onValueChange={() => {
                this.setState({ showProfile: !showProfile });
              }}
            />
          </SectionRow>

          <SectionRow text="Notifications">
            <SwitchRow
              text="Push Notifications"
              /* Change Finder to App Name*/
              iconName="user-secret"
            /*_value={this.state.switch}
            _onValueChange={() => {
              this.setState({ switch: !this.state.switch });
            }}*/
            />
          </SectionRow>
        </ReactNativeSettingsPage>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Fafafa',
  },
  contentContainer: {
    paddingTop: 15,
    fontSize: 16,

  },

});
