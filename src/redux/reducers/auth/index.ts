const initialState = {
    userData: {},
    token: '',
    locale: 'en',
    isAuth: false
};

const auth = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.data, "action.data")
            return {
                ...state,
                userData: action.data,
                token: action.token,
                isAuth: true
            };
        case 'UPDATE_BALANCE':
            return {
                ...state,
                userData: { ...state.userData, balance: action.data }
            };
        case 'LOGOUT':
            return { ...state, userData: {}, isAuth: false };
        case 'LOCALE':
            return { ...state, locale: action.data };
        default:
            return state;
    }
};

export default auth;
