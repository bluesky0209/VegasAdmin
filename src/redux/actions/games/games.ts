

export const getData = (params: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'CBH_GET_DATA',
            data: params.data.results,
            totalPages: params.data.count,
            params
        });
    };
};

export const deleteGamesHistory = (id: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'CBH_DEL_DATA',
            index: id
        });
    };
};

export const addGamesHistory = (data: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'CBH_ADD_DATA',
            data
        });
    };
};

export const updateGamesHistory = ({ index, data }: { index: any; data: any }) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'CBH_UPDATE_DATA',
            index,
            data
        });
    };
};

export const setSidebarOpen = (status: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: 'CBH_SET_SIDEBAR',
            status
        });
    };
};

// export const getGamesHistory = ({ id, status }: { id: any; status: any }) => {
//     return async (dispatch: any) => {
//         const Api = useApi();
//         Api.getGamesHistory(id).then((res: any) => {
//             dispatch({
//                 type: 'CBH_SET_SIDEBAR',
//                 status
//             });
//             dispatch({
//                 type: 'CBH_GET_CURRENT',
//                 selected: res.data
//             });
//         });
//     };
// };
