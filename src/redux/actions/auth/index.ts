import { AppDispatch } from "../../storeConfig/store";

interface LoginAction {
    type: 'LOGIN';
    data: any;
    token: string;
}

export const handleLogin = (data: any) => {
    return (dispatch: AppDispatch) => {
        const action: LoginAction = {
            type: 'LOGIN',
            data: data.user,
            token: data.session.accessToken
        };
        dispatch(action);
    };
};

export const handleUpdateBalance = (data: any) => {
    return (dispatch: AppDispatch) => {
        dispatch({ type: 'UPDATE_BALANCE', data });
    };
};

export const handleLogout = () => {
    return (dispatch: any) => {
        dispatch({ type: 'LOGOUT' });
    };
};
