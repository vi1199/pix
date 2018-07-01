import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  YellowBox
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Feeds extends Component {
  static navigationOptions = ({ navigation }) => {
    const params= navigation.state.params || {};
    return {
        title: 'Feeds',
        headerTintColor: '#FFFFFF',
        headerStyle: {
          backgroundColor: '#1976D2',
        },
        headerTitleStyle: {
            fontWeight: '300',
        },
        headerRight: (
            <TouchableOpacity onPress= {params.headerIconPress}>
                <Icon
                    name= 'account-circle'
                    size= {22}
                    color= '#FFFFFF'
                    style= {{padding: 10}}
                />
            </TouchableOpacity>
        )
    }
}
componentDidMount() {
  this.props.navigation.setParams({headerIconPress: this.handleSettingsAccountPress})
}

handleSettingsAccountPress = () =>{
  console.log('icon pressed');
  this.props.navigation.navigate('Profile');
}
  render() {
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
