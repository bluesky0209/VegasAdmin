const initialState = {
    data: [],
    total: 0,
    params: {},
    selected: {},
    sidebarOpen: false,
    sidebarStatus: 'add'
};

const users = (state = initialState, action: any) => {
    switch (action.type) {
        case 'USR_GET_DATA':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            };
        case 'USR_DEL_DATA':
            const data = state.data.filter((e: any) => e._id !== action.index);
            return { ...state, data, total: state.total - 1 };
        case 'USR_ADD_DATA':
            const addData = [...state.data, action.data];
            return Object.assign({ ...state, data: addData, total: state.total + 1 });
        case 'USR_UPDATE_DATA':
            const index = state.data.findIndex((e: any) => e._id === action.index);
            const upateData: any = state.data;
            upateData[index] = action.data;
            return Object.assign({ ...state, data: [...upateData] });
        case 'USR_GET_CURRENT':
            return { ...state, selected: action.selected };
        case 'USR_SET_SIDEBAR':
            return {
                ...state,
                sidebarStatus: action.status,
                sidebarOpen: !state.sidebarOpen
            };
        default:
            return { ...state };
    }
};

export default users;
