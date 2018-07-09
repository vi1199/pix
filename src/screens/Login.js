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
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager
} = FBSDK;
import { createUser, } from '../db/schema';

export default class Login extends Component {
    constructor () {
        super();
        this.state= {
            name: '',
            picture: '',
            email: ''
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({headerIconPress: this.handleIconPress})
        console.log('REALM PATH``````````', Realm.path);
      }
    static navigationOptions = ({ navigation }) => {
        const params= navigation.state.params || {};
        return {
            title: 'Login',
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
                        name= 'jira'
                        size= {22}
                        color= '#FFFFFF'
                        style= {{padding: 10}}
                    />
                </TouchableOpacity>
            )
        }
    }
    handleIconPress = () =>{
        console.log('icon pressed');
        this.props.navigation.navigate('Feeds');
    }
    render() {
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
        return(
            <View style= {styles.container}>
            <LoginButton
                onLoginFinished = {(error, result) => {
                    if (error) {
                        console.log('error login---', error)
                    } else if (result.isCancelled) {
                        console.log('login is cancelled')
                    } else {
                        AccessToken.getCurrentAccessToken()
                        .then((data) => {

                            const responseInfoCallback = (error, result) => {
                                if (error) {
                                  console.log(error)
                                  alert('Error fetching data: ' + error.toString());
                                } else {
                                  console.log(result)
                                  this.setState({name: result.name, picture: result.picture, email: result.email})
                                //  alert('Success fetching data: ' + result.toString());
                                  const newUser = {
                                      id: Math.floor(Date.now() / 1000),
                                      name: result.name,
                                      email: result.email,
                                      pic: result.picture.data.url
                                  }
                                  createUser(newUser)
                                  .then(this.handleIconPress)
                                  .catch((error) => {
                                      console.log('error is db save item', error)
                                  })
                                }
                              }

                              const infoRequest = new GraphRequest(
                                '/me',
                                {
                                  accessToken: data.accessToken,
                                  parameters: {
                                    fields: {
                                      string: 'email,name,first_name,middle_name,picture'
                                    }
                                  }
                                },
                                responseInfoCallback
                              );
                              new GraphRequestManager().addRequest(infoRequest).start()
                            // console.log('data is', data);
                            // this.setState({token: data.accessToken})
                        })
                    }
                }}
                onLogoutFinished = {() => console.log('logout ---')}/>
            </View>
        );
    }
};

const styles= StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle : {
        padding: 20,
        alignItems: 'center',
        borderRadius: 3,
        elevation: 5,
        backgroundColor: '#1976D2'
    }
})