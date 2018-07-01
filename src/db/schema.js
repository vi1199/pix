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
        description: 'string',
        picture: 'data?',
        birthday: 'date'
    }
};

export const FeedListSchema = {
    name: FEEDLIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        creationDate : {date},
        feeds: { type: 'list', objectType: USER_SCHEMA }
    }
}

const databaseOptions = {
    path: 'PixDb.realm',
    schema: [FEEDLIST_SCHEMA, USER_SCHEMA],
    schemaVersion: 0, //optional    
};

//User
export const createUser = newUser => new Promise((resolve, reject) => {
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
export const insertFeed = newList => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            realm.create(FEEDLIST_SCHEMA, newList);
            resolve(newList);
        });
    })
    .catch((error) => reject(error))
});

export default new Realm(databaseOptions);
