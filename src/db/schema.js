import Realm from 'realm';
export const FEEDLIST_SCHEMA = "FeedList";
export const USER_SCHEMA = "User";

export const UserSchema = {
    name: USER_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: { type: 'int', default: 0 },
        name: 'string',
        email: 'string',
        pic: 'string',
    }
};

export const FeedListSchema = {
    name: FEEDLIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: { type: 'int', default: 0},
        creationDate : 'string',
        imageRow: 'string',
        feeds: { type: 'list', objectType: USER_SCHEMA }
    }
}

const databaseOptions = {
    path: 'PixDb.realm',
    schema: [FeedListSchema, UserSchema],
    schemaVersion: 0, //optional    
};

//User
export const createUser = (newUser) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            realm.create(USER_SCHEMA, newUser);
            resolve(newUser);
        });
    })
    .catch((error) => reject(error))
});

//FeedList 
export const insertFeed = (newList) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            realm.create(FEEDLIST_SCHEMA, newList);
            resolve(newList);
        });
    })
    .catch((error) => reject(error))
});

export const updateFeedList = feedList => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let updatingFeedList = realm.objectForPrimaryKey(FEEDLIST_SCHEMA, feedList.id);   
            updatingFeedList.name = feedList.name;    
            resolve();     
        });
    }).catch((error) => reject(error));;
});

export const queryUser = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allUsers = realm.objects(USER_SCHEMA);
        resolve(allUsers);  
    }).catch((error) => {        
        reject(error);  
    });;
});

export const queryAllFeedLists = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let feedList = realm.objects(FEEDLIST_SCHEMA);
        resolve(feedList);  
    }).catch((error) => {        
        reject(error);  
    });;
});


console.log('REALM PATH``````````', Realm.defaultPath);
export default new Realm(databaseOptions);
