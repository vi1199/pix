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
import { createUser, queryUser} from '../db/schema';

export default class Profile extends Component {
    static navigationOptions = ({ navigation }) => {
        const params= navigation.state.params || {};
        return {
            title: 'Profile',
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
                        name= 'account-edit'
                        size= {22}
                        color= '#FFFFFF'
                        style= {{padding: 10}}
                    />
                </TouchableOpacity>
            )
        }
    }
    constructor() {
        super();
        this.state = {
            image: '',
            name: '',
            email: '',
            aboutme: ''
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({headerIconPress: this.handleIconPress})
        queryUser()
        .then((user) => {
            console.log('data is111111111', user[2].name)
            this.setState({name: user[2].name, image: user[2].pic, email: user[2].email})
        })
        .catch((error) => {
            console.log('error in fetch @@@@@@@', error)
        })
        
    }
    handleIconPress = () =>{
        console.log('icon pressed');
        this.props.navigation.navigate('EditProfile');
    }

    render() {
        const { navigation } = this.props;
        const emailNew= navigation.getParam('email', this.state.email)
        const usernameNew = navigation.getParam('username', this.state.name)
        const avatarNew = navigation.getParam('avatarSource', this.state.image)
        const descNew = navigation.getParam('description', this.state.aboutme)
      //  console.log('values are, __------', email, username, avatar, desc)
        
        return (
            <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style= {styles.container}>
                    <View style= {styles.headerComponent}>
                        <View style= {styles.circleComponent}>
                            <Image
                                style= {styles.imageComponent}
                                source= {{
                                    uri: avatarNew
                            }}/>
                        </View>
                        <View style= {styles.textStyles}>
                            <Text style= {styles.textContainer}>{usernameNew}</Text>
                            <Text style= {styles.textContainer}>{emailNew}</Text>
                            <Text style= {styles.textContainer}>{descNew}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
};

const styles= StyleSheet.create ({
    container : {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    headerComponent: {
        height: 220,
        backgroundColor: '#3498DB'
    },
    circleComponent:{
        height: 120,
        width: 120,
        borderRadius: 120/2,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        elevation: 3,
        marginTop: 20
    },
    imageComponent: {
        height: 120,
        width: 120,
        borderRadius: 120/2,
    },
    textStyles: {
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    textContainer: {
        color: '#FFFFFF',
        fontSize: 17,
    }
})