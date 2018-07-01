import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class UserProfile extends Component {
    static navigationOptions = ({ navigation }) => {
        const params= navigation.state.params || {};
        return {
            title: 'Profile',
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                fontWeight: '300',
            },
            headerStyle: {
                backgroundColor: '#1976D2',
              },
            headerRight: (
                <TouchableOpacity>
                    <Icon
                        name= 'settings'
                        size= {22}
                        color= '#FFFFFF'
                        style= {{padding: 10}}
                    />
                </TouchableOpacity>
            )
        }
    }
    render() {
        return(
            <View style= {styles.container}>
                <View>
                </View>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    imageContainer: {

    }

})