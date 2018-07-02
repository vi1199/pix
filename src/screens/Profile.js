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
            avatarSource: '',
            image: '',
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({headerIconPress: this.handleIconPress})
    }
    handleIconPress = () =>{
        console.log('icon pressed');
        this.props.navigation.navigate('EditProfile');
    }

    render() {
        return (
            <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style= {styles.container}>
                    <View style= {styles.headerComponent}>
                        <View style= {styles.circleComponent}>
                            <Image
                                style= {styles.imageComponent}
                                source= {{
                                    uri: this.state.image ? this.state.image : null
                            }}/>
                        </View>
                        <View style= {styles.textStyles}>
                            <Text style= {styles.textContainer}>vineet</Text>
                            <Text style= {styles.textContainer}>vineet.vineet@vineet.com</Text>
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