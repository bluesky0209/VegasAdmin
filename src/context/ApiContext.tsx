import React, { createContext } from "react";
import axios from "axios";
import { toast, Slide } from 'react-toastify';

import { store } from "../redux/storeConfig/store";

interface ApiContextType {
    signIn: (username: string, password: string) => Promise<any>;
    getUsersList: (params: any) => Promise<any>;
    getUser: (id: string) => Promise<any>;
    getUserReports: (params: any) => Promise<any>;
    deleteUser: (id: string, userId: string) => Promise<any>;
    getRoles: (params: any) => Promise<any>;
    createUser: (username: string, password: string, permissionId: string, userId: string, role: string, balance?: number, bonusType?: string) => Promise<any>;
    updateUserData: (id: string, username: string, password: string, permissionId: string) => Promise<any>;
    getGameLists: (params: any) => Promise<any>;
    getGameList: (id: string) => Promise<any>;
    updateGameList: (id: string, params: any) => Promise<any>;
    getProviders: (params: any) => Promise<any>;
    updateProvider: (id: string, params: any) => Promise<any>;
    deposit: (params: any) => Promise<any>;
    withdraw: (params: any) => Promise<any>;
    getPaymentsLists: (params: any) => Promise<any>;
    getBetHistory: (params: any) => Promise<any>;
    deleteBetHistory: (params: any) => Promise<any>;
    getUserInfo: (params: any) => Promise<any>;
    getJackpot: () => Promise<any>;
    getJackpotHistory: (params: any) => Promise<any>;
    getReportByGame: (params: any) => Promise<any>;
    getReportByPlayer: (params: any) => Promise<any>;
    getGamesLabel: () => Promise<any>;
    getReportFinance: (params: any) => Promise<any>;
    getReportDeposit: (params: any) => Promise<any>;
    getReportCash: (params: any) => Promise<any>;
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Add request interceptor to set headers before each request
api.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('token');
    const authToken = (store.getState() as any).auth.token;

    config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
        'admin': true,
        'token': token,
        'authorization': authToken
    };

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;
        console.log("error============>", error)
        if (response && response.status === 400) {
            const msg = `${response.data}`;
            toast.error(msg, {
                position: "top-right",
                transition: Slide,
                hideProgressBar: true,
                autoClose: 5000,
                style: { zIndex: 999999 }
            });
        } else if (response && response.status === 401) {
            console.log("401")
            store.dispatch({ type: 'LOGOUT' });
        } else if (response && response.status === 429) {
            toast.error(response.data, {
                position: "top-right",
                transition: Slide,
                hideProgressBar: true,
                autoClose: 5000,
                style: { zIndex: 999999 }
            });
        } else {
            console.log(response);
        }
        return Promise.reject(error);
    }
);

const APIContext = createContext<ApiContextType | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const signIn = async (username: string, password: string) => {
        const data = await api.post('api/v3/users/admin/signin', {
            username,
            password,
        });
        return data;
    };

    const getUsersList = async (params: any) => {
        return api.post('api/v3/users/admin/list', params);
    }

    const getUser = async (id: string) => {
        return api.get(`api/v3/users/admin/${id}`);
    }

    const deleteUser = async (id: string, userId: string) => {
        return api.delete(`api/v3/users/admin/${id}`, {
            data: {
                userId
            }
        });
    }

    const getRoles = async (params: any) => {
        return api.post('api/v3/users/permission/list', params);
    }

    const createUser = async (username: string, password: string, permissionId: string, userId: string, role: string, balance?: number, bonusType?: string) => {
        return api.post('api/v3/users/admin/create', {
            username,
            password,
            permissionId,
            userId,
            role,
            balance,
            bonusType
        });
    }

    const updateUserData = async (id: string, username: string, password: string, permissionId: string) => {
        return api.put(`api/v3/users/admin/${id}`, {
            username,
            password,
            permissionId,
        });
    }

    const getUserInfo = async (params: any) => {
        return api.get('api/v3/users/admin/info', params);
    }

    const getUserReports = async (params: any) => {
        return api.post('api/v3/users/admin/report', params);
    }

    const getGameLists = async (params: any) => {
        return api.post('api/v3/casinos/lists/list', params);
    }

    const getGameList = async (id: string) => {
        return api.get(`api/v3/casinos/lists/${id}`);
    }

    const getProviders = async (params: any) => {
        return api.post('api/v3/casinos/providers/list', params);
    }

    const updateProvider = async (id: string, params: any) => {
        return api.put(`api/v3/casinos/providers/${id}`, params);
    }

    const updateGameList = async (id: string, params: any) => {
        return api.put(`api/v3/casinos/lists/${id}`, params);
    }

    const deposit = async (params: any) => {
        return api.post('api/v3/payments/deposit', params);
    }

    const withdraw = async (params: any) => {
        return api.post('api/v3/payments/withdraw', params);
    }

    const getPaymentsLists = async (params: any) => {
        return api.post('api/v3/payments/list', params);
    }

    const getBetHistory = async (params: any) => {
        return api.post('api/v3/casinos/history/list', params);
    }

    const deleteBetHistory = async (params: any) => {
        return api.post('api/v3/casinos/history/delete', params);
    }

    const getJackpot = async () => {
        return api.post('api/v3/jackpot/getJackpot');
    }

    const getJackpotHistory = async (params: any) => {
        return api.post('api/v3/jackpot/getJackpotHistory', params);
    }

    const getReportByGame = async (params: any) => {
        return api.post('api/v3/casinos/history/report-by-game', params);
    }

    const getReportByPlayer = async (params: any) => {
        return api.post('api/v3/casinos/history/report-by-player', params);
    }

    const getGamesLabel = async () => {
        return api.post('api/v3/casinos/lists/label');
    }

    const getReportFinance = async (params: any) => {
        return api.post('api/v3/payments/report', params);
    }

    const getReportDeposit = async (params: any) => {
        return api.post('api/v3/payments/report-superagent', params);
    }

    const getReportCash = async (params: any) => {
        return api.post('api/v3/payments/report-user', params);
    }

    return (
        <APIContext.Provider
            value={{
                signIn,
                getUsersList,
                getUser,
                deleteUser,
                getUserReports,
                getRoles,
                createUser,
                updateUserData,
                getGameLists,
                getGameList,
                getProviders,
                updateProvider,
                updateGameList,
                deposit,
                withdraw,
                getPaymentsLists,
                getBetHistory,
                deleteBetHistory,
                getUserInfo,
                getJackpot,
                getJackpotHistory,
                getReportByGame,
                getReportByPlayer,
                getGamesLabel,
                getReportFinance,
                getReportDeposit,
                getReportCash
            }}
        >
            {children}
        </APIContext.Provider>
    );
};

export default APIContext;
