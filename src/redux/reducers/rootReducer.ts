import { combineReducers } from 'redux';
import auth from './auth/index.ts';
import users from './users/index.ts';
import games from './games/games';
import gameslists from './games/lists';
import gamesproviders from './games/providers';


const rootReducer = combineReducers({
    auth,
    users,
    games,
    gameslists,
    gamesproviders
});

export default rootReducer;
