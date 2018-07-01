import { createStackNavigator } from 'react-navigation';
import Feeds from '../screens/Feeds';
import UserProfile from '../screens/UserProfile';

 export const Routes = createStackNavigator (
    {
        Feeds : {
            screen: Feeds
        },
        Profile : {
            screen: UserProfile
        }
    },
    {
        initialRouteName: 'Feeds'
    }
);


