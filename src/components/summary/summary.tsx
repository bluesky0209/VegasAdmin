"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import useApi from "../../hooks/useApi";
import Button from "../ui/button/Button";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useSelector } from "react-redux";
import { checkRole } from "../../utils/roles";
import SearchSelect from "../ui/select/select";

export default function Summary() {
    const Api = useApi();
    const { userData } = useSelector((state: any) => ({
        userData: state.auth.userData,
    }));
    const [currentData, setCurrentData] = useState([]);
    // const [superagents, setSuperagents] = useState([]);
    const [agents, setAgents] = useState([]);
    const [cashiers, setCashiers] = useState([]);
    const [tempsuperagents, setTempsuperagents] = useState([]);
    const [tempagents, setTempagents] = useState([]);
    const [tempcashiers, setTempcashiers] = useState([]);
    const [superagent, setSuperagent] = useState({ value: '' });
    const [agent, setAgent] = useState({ value: '' });
    const [cashier, setCashier] = useState({ value: '' });
    const [players, setPlayers] = useState([]);
    const [tempplayers, setTempplayers] = useState([]);
    const [player, setPlayer] = useState({ value: '' });
    const [date, setDate] = useState([
        new Date(new Date().setMonth(new Date().getMonth() - 1)),
        new Date()
    ])

    const getProfit = async () => {
        try {
            await Api.getReportProfit({ date, superagent: superagent?.value, agent: agent?.value, cashier: cashier?.value, player: player?.value })
                .then((res) => {
                    if (res?.data) {
                        let data: any = [];
                        data.push(res.data)
                        setCurrentData(data)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (e) {
            console.log(e)
        }
    }

    const getUsers = async () => {
        await Api.getUsersLabel({ username: userData.username, role: userData.role })
            .then((res) => {
                if (res?.data) {
                    const superagent = res.data.filter((item: any) => item.role === 'superagent');
                    setTempsuperagents(superagent);
                    // setSuperagents(superagent);
                    const agent = res.data.filter((item: any) => item.role === 'agent');
                    setTempagents(agent);
                    setAgents(agent);
                    const cashier = res.data.filter((item: any) => item.role === 'cashier');
                    setTempcashiers(cashier);
                    setCashiers(cashier);
                    const player = res.data.filter((item: any) => item.role === 'player');
                    setTempplayers(player);
                    setPlayers(res.data.filter((item: any) => item.role === 'player'));
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }

    const getProfitByRole = async () => {
        await Api.getReportProfitByRole({ date, role: userData.role, username: userData.username })
            .then((res) => {
                if (res?.data) {
                    console.log(res.data, "profit by role")
                    setCurrentData(res.data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getData = () => {
        if (superagent.value || agent.value || cashier.value || player.value) {
            getProfit()
        } else {
            getProfitByRole();
        }
    }

    const selectSuperagent = (e: any) => {
        setSuperagent(e)
        setAgent({ value: '' })
        setCashier({ value: '' })
        setPlayer({ value: '' })
        const agentsData = agents.filter((item: any) => item.parent.superagent === e.value)
        setTempagents(agentsData)
        const cashiersData = cashiers.filter((item: any) => item.parent.superagent === e.value)
        setTempcashiers(cashiersData)
        const playersData = players.filter((item: any) => item.parent.superagent === e.value)
        setTempplayers(playersData)
    }

    const selectAgent = (e: any) => {
        setAgent(e);
        setCashier({ value: '' })
        setPlayer({ value: '' })
        const cashiersData = cashiers.filter((item: any) => item.parent.agent === e.value)
        setTempcashiers(cashiersData)
        const playersData = players.filter((item: any) => item.parent.agent === e.value)
        setTempplayers(playersData)
    }

    const selectCashier = (e: any) => {
        setCashier(e);
        setPlayer({ value: '' })
        const playersData = players.filter((item: any) => item.parent.cashier === e.value)
        setTempplayers(playersData)
    }

    useEffect(() => {
        getUsers();
        getProfitByRole();
    }, []);

    const checkDisable = (level: any) => {
        if (level === 'agent') {
            if (userData.role === 'superagent') {
                return false
            }
            return !superagent.value
        } else if (level === 'cashier') {
            if (userData.role === 'agent') {
                return false;
            }
            return !agent.value
        } else if (level === 'player') {
            return !cashier.value
        }
    }

    return (
        <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
            <div className="grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-4 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl mb-3">
                {checkRole(userData.permission.order, "superagent") && (
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                        <label className="text-gray-500 dark:text-gray-400">Super Agent</label>
                        <div className="flex items-center gap-2">
                            <SearchSelect
                                options={tempsuperagents}
                                value={superagent}
                                onChange={selectSuperagent}
                                placeholder="Select Super Agent"
                            />
                            {superagent.value && (
                                <button
                                    onClick={() => {
                                        setSuperagent({ value: '' });
                                        setTempagents(agents);
                                        setAgent({ value: '' });
                                        setTempcashiers(cashiers);
                                        setCashier({ value: '' })
                                        setTempplayers(players);
                                        setPlayer({ value: "" })
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                )}
                {checkRole(userData.permission.order, "agent") && (
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                        <label className="text-gray-500 dark:text-gray-400">Agent</label>
                        <div className="flex items-center gap-2">
                            <SearchSelect
                                options={tempagents}
                                value={agent}
                                onChange={selectAgent}
                                placeholder="Select Agent"
                                isDisabled={checkDisable('agent')}
                            />
                            {agent.value && (
                                <button
                                    onClick={() => {
                                        setAgent({ value: '' })
                                        setTempcashiers(cashiers);
                                        setCashier({ value: '' })
                                        setTempplayers(players);
                                        setPlayer({ value: '' })
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                )}
                {checkRole(userData.permission.order, "cashier") && (
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                        <label className="text-gray-500 dark:text-gray-400">Cashier</label>
                        <div className="flex items-center gap-2">
                            <SearchSelect
                                options={tempcashiers}
                                value={cashier}
                                onChange={selectCashier}
                                placeholder="Select Cashier"
                                isDisabled={checkDisable('cashier')}
                            />
                            {cashier.value && (
                                <button
                                    onClick={() => {
                                        setCashier({ value: '' })
                                        setTempplayers(players);
                                        setPlayer({ value: '' })
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                )}
                {checkRole(userData.permission.order, "player") && (
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                        <label className="text-gray-500 dark:text-gray-400">Player</label>
                        <div className="flex items-center gap-2">
                            <SearchSelect
                                options={tempplayers}
                                value={player}
                                onChange={setPlayer}
                                placeholder="Select Player"
                                isDisabled={checkDisable('player')}
                            />
                            {player.value && (
                                <button
                                    onClick={() => setPlayer({ value: '' })}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center z-20 gap-3">
                    <Flatpickr
                        options={{
                            mode: "range",
                            dateFormat: "Y-m-d",
                            defaultDate: [date[0], date[1]],
                            onChange: (selectedDates: any) => {
                                if (selectedDates.length === 2) {
                                    setDate([selectedDates[0], selectedDates[1]]);
                                }
                            }
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    />
                </div>
                <Button size="sm"
                    onClick={getData}
                >
                    Search
                </Button>
            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div>
                    <Table>
                        <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                {[
                                    { key: "Id", label: "Id" },
                                    { key: "username", label: "User" },
                                    { key: "role", label: "Role" },
                                    { key: "balance", label: "Balance" },
                                    { key: "profit", label: "Profit" },
                                ].map(({ key, label }) => (
                                    <TableCell
                                        key={key}
                                        isHeader
                                        className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                                    >
                                        <div
                                            className="flex items-center justify-between cursor-pointer"
                                        >
                                            <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                                                {label}
                                            </p>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData.map((item: any, i: any) => (
                                <TableRow key={i + 1} className="cursor-pointer">
                                    <TableCell className="border text-center dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                                        {item.username}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                                        {item.role}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-red-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-red-400 whitespace-nowrap ">
                                        {item.balance.toFixed(2)}
                                    </TableCell>
                                    <TableCell className={`px-4 py-4 font-normal border dark:border-white/[0.05] border-gray-100 text-theme-sm whitespace-nowrap ${item.profit >= 0 ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
                                        {item.profit.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow key="total" className="cursor-pointer">
                                <TableCell className="border text-center dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                                    total
                                </TableCell>
                                <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                                    -
                                </TableCell>
                                <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                                    -
                                </TableCell>
                                <TableCell className="px-4 py-4 font-normal text-red-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-red-400 whitespace-nowrap ">
                                    -
                                </TableCell>
                                <TableCell className={`px-4 py-4 font-normal border dark:border-white/[0.05] border-gray-100 text-theme-sm whitespace-nowrap ${currentData.reduce((sum: any, item: any) => sum + item.profit, 0) >= 0 ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`}>
                                    {currentData.reduce((sum: any, item: any) => sum + item.profit, 0).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
