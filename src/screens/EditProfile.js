import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
var ImagePicker = require('react-native-image-picker');

export default class EditProfile extends Component {
    static navigationOptions = ({ navigation }) => {
        const params= navigation.state.params || {};
        return {
            title: 'Edit Profile',
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                fontWeight: '300',
            },
            headerStyle: {
                backgroundColor: '#1976D2',
            },
        }
    }
    constructor() {
        super();
        this.state = {
            avatarSource: '',
            username: '',
        }
    }

    handleImageClick = () => {
        var options = {
            title: 'Select Avatar',
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    render() {
        return(
            <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style= {styles.container}>
                    <Text style= {styles.textContainer}>UserName</Text>
                    <TextInput
                        defaultValue= {this.state.username}
                        style= {styles.textInputContainer}
                        keyboardType= 'default'
                        returnKeyLabel= 'Next'
                        onChangeText= {(username)=>this.setState({username})}
                        underlineColorAndroid= '#1976D2'/>
                    <Text style= {styles.textContainer}>Email</Text>
                    <TextInput
                        defaultValue= {this.state.email}
                        style= {styles.textInputContainer}
                        keyboardType= 'default'
                        returnKeyLabel= 'Next'
                        onChangeText= {(email)=>this.setState({email})}
                        underlineColorAndroid= '#1976D2'/>
                    <Text style= {styles.textContainer}>Description</Text>
                    <TextInput
                        defaultValue= {this.state.description}
                        style= {styles.textInputContainer}
                        keyboardType= 'default'
                        returnKeyLabel= 'Next'
                        onChangeText= {(description)=>this.setState({description})}
                        underlineColorAndroid= '#1976D2'/>
                    <Text style= {styles.textContainer}>Upload Photo</Text>
                    <View>
                        <Image 
                            source={this.state.avatarSource}
                            style={styles.imageContainer} />
                            {
                                this.state.avatarSource === '' ? 
                                <Icon
                                    name= 'upload'
                                    size= {20}
                                    color={'#1976D2'}
                                    style= {{alignSelf: 'flex-start', marginHorizontal: 20,}}
                                    onPress= {this.handleImageClick}/>
                                : null
                            }
                        
                    </View>
                </View>
                <TouchableOpacity
                    style= {styles.buttonContainer}
                    onPress= {()=> this.handleSaveInput()}>
                    <View >
                    <Text style={styles.buttonText}>SAVE</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles= StyleSheet.create({
    container : {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF'
    },
    imageContainer: {
        height: 90,
        width: 90,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#616161'
    },
    textContainer: {
        fontSize: 14,
        marginHorizontal: 10,
        marginVertical: 5,
    },
    textInputContainer: {
        marginHorizontal: 10,
    },
    buttonContainer: {
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#1976D2'
    },
    buttonText: {
        color: '#FFFFFF'
    }

})