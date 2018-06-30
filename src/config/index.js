import { createStackNavigator } from 'react-navigation';
import Feeds from '../screens/Feeds';

 export const Routes = createStackNavigator (
    {
        Feeds : {
            screen: Feeds
        },
    },
    {
        initialRouteName: 'Feeds'
    }
);


