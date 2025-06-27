import useApi from '../../../hooks/useApi';

export const getData = (data: any, params: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'USR_GET_DATA',
            data: data.results,
            totalPages: data.count,
            params
        });
    }
};

export const deleteUser = (id: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'USR_DEL_DATA',
            index: id
        });
    };
};

export const addUser = (data: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'USR_ADD_DATA',
            data
        });
    };
};

export const updateUser = ({ index, data }: { index: any; data: any }) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'USR_UPDATE_DATA',
            index,
            data
        });
    };
};

export const setSidebarOpen = (status: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'USR_SET_SIDEBAR',
            status
        });
    };
};

export const getUser = ({ id, status }: { id: any; status: any }) => {
    return async (dispatch: any) => {
        const Api = useApi();
        Api.getUser(id).then((res: any) => {
            dispatch({
                type: 'USR_SET_SIDEBAR',
                status
            });
            dispatch({
                type: 'USR_GET_CURRENT',
                selected: res.data
            });
        });
    };
};
