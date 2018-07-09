import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
var ImagePicker = require('react-native-image-picker');
import { createUser, queryUser, insertFeed, updateFeedList, queryAllFeedLists} from '../db/schema';
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
            image: '',
            name: '',
            email: '',
            aboutme: '',
            photoSource: [],
            imageList: ''
        }
    }

    reloadData = () => {
        queryAllFeedLists()
        .then((feedlist) => {
            this.setState({photoSource: feedlist})
        })
        .catch((error) => {
            console.log('errorrr in reload', error)
            this.setState({photoSource: []})
        })
    }
    componentDidMount() {
        this.props.navigation.setParams({headerIconPress: this.handleIconPress})
        queryUser()
        .then((user) => {
            console.log('data is111111111', user)
            this.setState({name: user[0].name, image: user[0].pic, email: user[0].email})
        })
        .catch((error) => {
            console.log('error in fetch @@@@@@@', error)
        })
        this.reloadData()
    }
    handleIconPress = () =>{
        console.log('icon pressed');
        this.props.navigation.navigate('EditProfile');
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
                let source = { uri: response.data };
                var today = moment().format('MM-DD-YYYY, h:mm:ss a');
                console.log('date issss', today)
                let i=0;
                let p = i+ 1;
                const feed = {
                    id: Math.floor(Date.now() / 1000),
                    creationDate: today,
                    imageRow: response.data
                }
                insertFeed(feed)
                .then(this.reloadData())
                .catch((error) => {
                    console.log('error occured', error)
                })
                // this.setState({
                //     photoSource: response.data
                // });
            }
        });
    }

    ItemSeparatorComponent = () => {
        return (
            <View
              style={{
                height: .5,
                width: "100%",
                backgroundColor: "#000",
              }}
            />
          );
    }

    render() {
        const { navigation } = this.props;
        const emailNew= navigation.getParam('email', this.state.email)
        const usernameNew = navigation.getParam('username', this.state.name)
        const avatarNew = navigation.getParam('avatarSource', '')
        const descNew = navigation.getParam('description', this.state.aboutme)
        console.log('values are, __------',this.props.navigation)
        
        return (
            <View style= {{flex: 1,}}>
            <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style= {styles.container}>
                    <View style= {styles.headerComponent}>
                        <View style= {styles.circleComponent}>
                            <Image
                                style= {styles.imageComponent}
                                source= {
                                    avatarNew ? {
                                    uri: `data:image/gif;base64,${avatarNew}`
                            } :{uri: this.state.image } }/>
                        </View>
                        <View style= {styles.textStyles}>
                            <Text style= {styles.textContainer}>{usernameNew ? usernameNew : this.state.name}</Text>
                            <Text style= {styles.textContainer}>{emailNew ? emailNew : this.state.email}</Text>
                            <Text style= {styles.textContainer}>{descNew ? descNew : ''}</Text>
                        </View>
                    </View>
                    {
                        this.state.photoSource.map((item, idx) => {
                           return(
                            <View key = {idx} style= {{ flex: 1, margin: 20, }}>
                                <Text>{item.creationDate}</Text>
                                <Image
                                style= {styles.imageComponentRow}
                                source= {
                                  {uri: `data:image/gif;base64,${item.imageRow}`} }/>
                            </View>
                           ) 
                        })
                    }
                    <View>
                        
                    </View>
                </View>
            </ScrollView>
            <View style= {styles.buttonContainer}>
            <TouchableOpacity
                    style= {{padding: 10,}}
            onPress= {()=> this.handleImageClick()}>
            <View>
                <Icon
                name= 'plus-circle-outline'
                size= {40}
                color={'#FFFFFF'}
                style= {{alignSelf: 'flex-start', }}
                /> 
            </View>
        </TouchableOpacity>
        </View>
        </View>
        )
    }
};

const styles= StyleSheet.create ({
    container : {
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
    imageComponentRow: {
        height: 120,
        margin: 5,
        borderRadius: 5,
    },
    textStyles: {
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    textContainer: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    buttonContainer: {
        marginTop: 20,
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#1976D2'
    }
})