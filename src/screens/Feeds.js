import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { queryAllFeedLists , } from '../db/schema';
export default class Feeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sortState: '',
        feedList: [],
        checkHeart: [],
        checkBookmark: [],
        heartToggle: false
    };
    
}
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
  this.reloadData()
}

reloadData = () => {
  queryAllFeedLists()
  .then((feedlist) => {
      this.setState({feedList: feedlist})
  })
  .catch((error) => {
      console.log('errorrr in reload', error)
      this.setState({feedList: []})
  })
}

handleSettingsAccountPress = () =>{
  console.log('icon pressed');
  this.props.navigation.navigate('Profile');
}

toggleHeart = (item) => {
//  console.log('index is ----', index);

  const {checkHeart} = this.state;
  if (!checkHeart.includes(item)) {
  this.setState({checkHeart: [...checkHeart, item]})
  console.log('index is -', ...checkHeart);
  } else {
    this.setState({checkHeart: checkHeart.filter(a => a !== item)})
    console.log('index is ----', item);
  }
}

toggleBookmark = (item) => {
  //  console.log('index is ----', index);
  
    const {checkBookmark} = this.state;
    if (!checkBookmark.includes(item)) {
    this.setState({checkBookmark: [...checkBookmark, item]})
    console.log('index is -', ...checkBookmark);
    } else {
      this.setState({checkBookmark: checkBookmark.filter(a => a !== item)})
      console.log('index is ----', item);
    }
  }



// reloadData = () => {
//   queryAllFeedLists()
//   .then((feedList) => {
//     this.setState({feedList: feedList});
//   })
//   .catch((err) => {
//     console.log('erroe isss', err);
//     this.setState({feedList: []});
//   });
// }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
      {
        this.state.feedList.map((item, idx, index) => {
           return(
            <View key = {idx} style= {{ flex: 1, margin: 10, }}>
                <Image
                style= {styles.imageComponentRow}
                source= {
                  {uri: `data:image/gif;base64,${item.imageRow}`} }/>
                  <Text>{item.creationDate}</Text>
                  <View style= {{flexDirection: 'row'}}>
                      <TouchableOpacity onPress= {() => this.toggleHeart(item.creationDate)} >
                        <View>
                          <Icon
                            name= {this.state.checkHeart.includes(item.creationDate) ? 'heart': 'heart-outline'}
                            size= {20}
                            color={'#ff0000'}
                            style= {{alignSelf: 'flex-start', marginHorizontal: 10,}}
                            />
                      </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress= {() => this.toggleBookmark(item.creationDate)} >
                    <Icon
                      name= {this.state.checkBookmark.includes(item.creationDate) ? 'bookmark-plus' : 'bookmark-plus-outline'}
                      size= {20}
                      color={'#1976D2'}
                      style= {{alignSelf: 'flex-start', marginHorizontal: 5}}
                      />
                      </TouchableOpacity>
                    </View>      
            </View>
           ) 
        })
    }
    </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  liststyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#DAF7A6',
    padding: 10,
  },
  imageComponentRow: {
    height: 160,
    margin: 2,
    borderRadius: 5,
},
});
