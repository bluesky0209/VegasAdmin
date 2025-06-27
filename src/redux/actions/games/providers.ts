
export const getData = (params: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'GP_GET_DATA',
            data: params.data.results,
            totalPages: params.data.count,
            params
        });
    };
};

export const deleteProvider = (id: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'GP_DEL_DATA',
            index: id
        });
    };
};

export const addProvider = (data: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'GP_ADD_DATA',
            data
        });
    };
};

export const updateProvider = ({ index, data }: { index: any, data: any }) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'GP_UPDATE_DATA',
            index,
            data
        });
    };
};

export const setSidebarOpen = (status: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'GP_SET_SIDEBAR',
            status
        });
    };
};

export const getProvider = ({ status, data }: { status: any, data: any }) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'GP_SET_SIDEBAR',
            status
        });
        dispatch({
            type: 'GP_GET_CURRENT',
            selected: data
        });
    };
};
