import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Feeds from '../screens/Feeds';
import EditProfile from '../screens/EditProfile';
import Profile from '../screens/Profile';

 export const Routes = createStackNavigator (
    {
        Login : {
            screen: Login
        },
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
        initialRouteName: 'Login'
    }
);


