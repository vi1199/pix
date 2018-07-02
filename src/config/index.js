import { createStackNavigator } from 'react-navigation';
import Feeds from '../screens/Feeds';
import EditProfile from '../screens/EditProfile';
import Profile from '../screens/Profile';

 export const Routes = createStackNavigator (
    {
        Feeds : {
            screen: Feeds
        },
        Profile: {
            screen: Profile
        },
        EditProfile : {
            screen: EditProfile
        }
    },
    {
        initialRouteName: 'Feeds'
    }
);


