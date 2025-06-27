import useApi from '../../../hooks/useApi';


export const getData = (params: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'GL_GET_DATA',
            data: params.results,
            totalPages: params.count,
            params
        });
    };
};

export const deleteList = (id: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'GL_DEL_DATA',
            index: id
        });
    };
};

export const addList = (data: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'GL_ADD_DATA',
            data
        });
    };
};

export const updateList = ({ index, data }: { index: any; data: any }) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'GL_UPDATE_DATA',
            index,
            data
        });
    };
};

export const setSidebarOpen = (status: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'GL_SET_SIDEBAR',
            status
        });
    };
};

export const getList = ({ id, status }: { id: any; status: any }) => {
    return async (dispatch: any) => {
        const Api = useApi();
        Api.getGameList(id).then((res: any) => {
            dispatch({
                type: 'GL_SET_SIDEBAR',
                status
            });
            dispatch({
                type: 'GL_GET_CURRENT',
                selected: res.data
            });
        });
    };
};
