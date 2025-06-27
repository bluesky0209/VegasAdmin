const initialState = {
    data: [],
    total: 0,
    params: {},
    selected: {},
    sidebarOpen: false,
    sidebarStatus: 'add'
};

const Providers = (state = initialState, action: any) => {
    switch (action.type) {
        case 'GP_GET_DATA':
            return {
                ...state,
                data: action.data,
                total: action.totalPages,
                params: action.params
            };
        case 'GP_ADD_DATA':
            const aData = [...state.data, action.data];
            return Object.assign({ ...state, data: aData, total: state.total + 1 });
        case 'GP_UPDATE_DATA':
            const index = state.data.findIndex((e: any) => e._id === action.index);
            const uData: any = state.data;
            uData[index] = action.data;
            return Object.assign({ ...state, data: [...uData] });
        case 'GP_DEL_DATA':
            const dData = state.data.filter((e: any) => e._id !== action.index);
            return { ...state, data: dData, total: state.total - 1 };
        case 'GP_GET_CURRENT':
            return { ...state, selected: action.selected };
        case 'GP_SET_SIDEBAR':
            return {
                ...state,
                sidebarStatus: action.status,
                sidebarOpen: !state.sidebarOpen
            };
        default:
            return { ...state };
    }
};

export default Providers;
