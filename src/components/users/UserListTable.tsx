"use client";

import { useState, useEffect } from "react";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { toast, Slide } from 'react-toastify';

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import { MinusIcon, PencilIcon, PlusIcon, TrashBinIcon } from "../../icons";
import PaginationWithButton from "./PaginationWithButton";
import useApi from "../../hooks/useApi";
import { useDispatch } from "react-redux";
import { deleteUser, getData } from "../../redux/actions/users";
import { useSelector } from "../../redux/storeConfig/store";
import Button from "../ui/button/Button";
import UserAddModal from "./UserAddModal";
import BalanceAddModal from "./BalanceAddModal";
import { useNavigate } from "react-router";
const MySwal = withReactContent(Swal);

export default function UserListsTable({ role, cashier, agent, superagent }: { role: string, cashier: string, agent: string, superagent: string }) {
    const permission: any = {
        superagent: 1,
        agent: 2,
        cashier: 3,
        player: 4,
    }
    const statusObj: any = [{ label: "all", value: "" }, { label: "online", value: true }, { label: "offline", value: false }];
    const Api = useApi();
    const dispatch = useDispatch();
    const { users } = useSelector((state: any) => ({ users: state.users }));
    const { auth } = useSelector((state: any) => ({ auth: state.auth }));
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [balModal, setBalOpen] = useState(false);
    const [modalType, setModalType] = useState("add");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [status, setStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [currentData, setCurrentData] = useState<any[]>([]);

    const getUserLists = async (role: string, search: string, cashier: string, agent: string, superagent: string, status: any) => {
        const parentId = auth.userData._id;
        try {
            await Api.getUsersList({
                pageSize: itemsPerPage, page: currentPage, role: role, permissionId: auth.userData
                    .permission._id, parentId: parentId, search: search, cashier: cashier, agent: agent, superagent: superagent, status: status
            })
                .then((res) => {
                    if (res.data) {
                        dispatch(getData(res.data, {}) as any)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        } catch (error) {
            console.error("Error in getUserLists:", error);
        }
    }

    const handleDelete = async (id: any) => {
        // if (auth.userData.role !== 'admin') {
        //     return toast.error('You are not allowed to delete this user');
        // }
        return MySwal.fire({
            title: 'Are you sure?',
            text: `You won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg',
                cancelButton: 'bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg ml-2'
            },
            buttonsStyling: false
        }).then(async (result) => {
            if (result.value) {
                await Api.deleteUser(id, auth.userData._id)
                    .then((res: any) => {
                        if (res.data) {
                            toast.success("User deleted successfully", {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: true,
                                transition: Slide,
                                style: { top: "70px" }
                            });
                            dispatch(deleteUser(id) as any)
                        }
                    })
            }
        });
    }

    useEffect(() => {
        console.log(currentPage, itemsPerPage, role, "role")
        getUserLists(role, searchTerm, cashier, agent, superagent, status);
    }, [currentPage, itemsPerPage, role, searchTerm, cashier, agent, superagent, status]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // const handleSort = (key: SortKey) => {
    //     if (sortKey === key) {
    //         setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    //     } else {
    //         setSortKey(key);
    //         setSortOrder("asc");
    //     }
    // };

    useEffect(() => {
        if (users.data.length > 0) {
            setTotalItems(users.total);
            setTotalPages(Math.ceil(users.total / itemsPerPage));
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
            const currentData = users?.data;
            setStartIndex(startIndex);
            setEndIndex(endIndex);
            setCurrentData(currentData);
        } else {
            setCurrentData([]);
        }
    }, [users]);

    const TableCells = ({ key, label }: { key: string, label: string }) => {
        return (
            <TableCell
                key={key}
                isHeader
                className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
            >
                <div
                    className="flex items-center justify-between cursor-pointer"
                // onClick={() => handleSort(key as SortKey)}
                >
                    <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                        {label}
                    </p>
                    {/* <button className="flex flex-col gap-0.5">
                        <svg
                            className={`text-gray-300 dark:text-gray-700  ${sortKey === key && sortOrder === "asc"
                                ? "text-brand-500"
                                : ""
                                }`}
                            width="8"
                            height="5"
                            viewBox="0 0 8 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                                fill="currentColor"
                            />
                        </svg>
                        <svg
                            className={`text-gray-300 dark:text-gray-700  ${sortKey === key && sortOrder === "desc"
                                ? "text-brand-500"
                                : ""
                                }`}
                            width="8"
                            height="5"
                            viewBox="0 0 8 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button> */}
                </div>
            </TableCell>
        )
    }

    return (
        <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
            <UserAddModal isOpen={isOpen} setIsOpen={setIsOpen} modalType={modalType} selectedUser={selectedUser} />
            <BalanceAddModal isOpen={balModal} setIsOpen={setBalOpen} modalType={modalType} selectedUser={selectedUser} />
            <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 dark:text-gray-400"> Show </span>
                    <div className="relative z-20 bg-transparent">
                        <select
                            className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value))
                                setCurrentPage(1)
                            }}
                        >
                            {[10, 20, 50, 100].map((value) => (
                                <option
                                    key={value}
                                    value={status}
                                    className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                >
                                    {value}
                                </option>
                            ))}
                        </select>
                        <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
                            <svg
                                className="stroke-current"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                                    stroke=""
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400"> entries </span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-gray-500 dark:text-gray-400"> Status </span>
                    <div className="relative z-20 bg-transparent">
                        <select
                            className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value)
                                setCurrentPage(1)
                            }}
                        >
                            {statusObj.map((item: any) => (
                                <option
                                    key={item.label}
                                    value={item.value}
                                    className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                                >
                                    {item.label}
                                </option>
                            ))}
                        </select>
                        <span className="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400">
                            <svg
                                className="stroke-current"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                                    stroke=""
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none left-4 top-1/2 dark:text-gray-400">
                        <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                                fill=""
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Search..."
                        className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
                    />
                </div>
                {
                    permission[role] === auth.userData.permission.order + 1 &&
                    <Button size="sm" onClick={() => { setIsOpen(true); setModalType("add") }}>
                        Add New
                        <PlusIcon className="size-5" />
                    </Button>
                }

            </div>

            <div className="max-w-full overflow-x-auto custom-scrollbar">
                <div>
                    <Table>
                        <TableHeader className="border-t border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCells key="id" label="ID" />
                                <TableCells key="status" label="Status" />
                                {
                                    permission[role] > 1 &&
                                    <TableCells key="superagent" label="Super agent" />
                                }
                                {
                                    permission[role] > 2 &&
                                    <TableCells key="agent" label="Agent" />
                                }
                                {
                                    permission[role] > 3 &&
                                    <TableCells key="cashier" label="Cashier" />
                                }
                                <TableCells key="email" label="Email" />
                                <TableCells key="username" label="Username" />
                                <TableCells key="permission.title" label="Role" />
                                <TableCells key="balance" label="Balance" />
                                {(auth.userData.role === "admin" || auth.userData.permission.order + 1 === permission[role]) && <TableCell
                                    key="inout"
                                    isHeader
                                    className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                                >
                                    <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                                        In/Out
                                    </p>
                                </TableCell>}
                                <TableCell
                                    key="action"
                                    isHeader
                                    className="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
                                >
                                    <p className="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                                        Action
                                    </p>
                                </TableCell>
                                {permission[role] < 2 && (
                                    <TableCells key="count.agent" label="Agents" />
                                )}
                                {permission[role] < 3 && (
                                    <TableCells key="count.cashier" label="Cashiers" />
                                )}
                                {permission[role] < 4 && (
                                    <TableCells key="count.player" label="Players" />
                                )}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData.map((item: any, i: any) => (
                                <TableRow key={i + 1} className="cursor-pointer">
                                    <TableCell className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap ">
                                        {item.id}
                                    </TableCell>
                                    <TableCell className="px-4 py-1 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap text-center">
                                        {item?.active ? `🟢` : `🔴`}
                                    </TableCell>
                                    {
                                        permission[role] > 1 &&
                                        <TableCell className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap ">
                                            {item.parent?.superagent}
                                        </TableCell>
                                    }
                                    {
                                        permission[role] > 2 &&
                                        <TableCell className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap ">
                                            {item.parent?.agent}
                                        </TableCell>
                                    }
                                    {
                                        permission[role] > 3 &&
                                        <TableCell className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap ">
                                            {item.parent?.cashier}
                                        </TableCell>
                                    }
                                    <TableCell className="px-4 py-4 font-medium text-gray-800 border border-gray-100 dark:border-white/[0.05] dark:text-white text-theme-sm whitespace-nowrap ">
                                        {item.email}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                                        {item.username}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                                        {item?.permission?.title}
                                    </TableCell>
                                    <TableCell className="px-4 py-4 font-normal text-gray-800 border dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-gray-400 whitespace-nowrap ">
                                        {(item.balance).toFixed(2)}
                                    </TableCell>
                                    {(auth.userData.role === "admin" || auth.userData.permission.order + 1 === permission[role]) &&
                                        <TableCell className="px-2 py-2 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap ">
                                            <div className="flex items-center justify-center w-full gap-2">
                                                <button onClick={() => {
                                                    setBalOpen(true);
                                                    setModalType("In");
                                                    setSelectedUser(item)
                                                }} className="bg-green-500 p-1 text-white dark:text-white rounded-full">
                                                    <PlusIcon className="size-5" />
                                                </button>
                                                <button onClick={() => {
                                                    setBalOpen(true);
                                                    setModalType("Out");
                                                    setSelectedUser(item)
                                                }} className="bg-error-500 p-1 text-white dark:bg-error-500 rounded-full">
                                                    <MinusIcon className="size-5" />
                                                </button>
                                            </div>
                                        </TableCell>}
                                    <TableCell className="px-4 py-4 font-normal text-gray-800 border border-gray-100 dark:border-white/[0.05] text-theme-sm dark:text-white/90 whitespace-nowrap ">
                                        <div className="flex items-center justify-center w-full gap-2">
                                            {auth.userData.role === "admin" && (
                                                <button onClick={() => handleDelete(item._id)} className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
                                                    <TrashBinIcon className="size-5" />
                                                </button>
                                            )}

                                            <button
                                                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                                                onClick={() => {
                                                    setIsOpen(true);
                                                    setModalType("edit");
                                                    setSelectedUser(item);
                                                }}>
                                                <PencilIcon className="size-5" />
                                            </button>
                                        </div>
                                    </TableCell>
                                    {
                                        permission[role] < 2 &&
                                        <TableCell className="px-4 py-4 font-normal text-blue-500 border dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-blue-500 whitespace-nowrap cursor-pointer">
                                            <a onClick={() => {
                                                navigate('/agent')
                                            }} >
                                                {item.count?.agent}
                                            </a>
                                        </TableCell>
                                    }
                                    {
                                        permission[role] < 3 &&
                                        <TableCell className="px-4 py-4 font-normal text-blue-500 border dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-blue-500 whitespace-nowrap cursor-pointer">
                                            <a onClick={() => {
                                                navigate(`/cashier?${item.role}=${item.username}`)
                                            }} >
                                                {item.count?.cashier}
                                            </a>
                                        </TableCell>
                                    }
                                    {
                                        permission[role] < 4 &&
                                        <TableCell className="cursor-pointer px-4 py-4 font-normal text-blue-500 border dark:border-white/[0.05] border-gray-100 text-theme-sm dark:text-blue-500 whitespace-nowrap cursor-pointer">
                                            <a onClick={() => {
                                                navigate(`/player?${item.role}=${item.username}`)
                                            }} >
                                                {item.count?.player}
                                            </a>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                    {/* Left side: Showing entries */}

                    <PaginationWithButton
                        totalPages={totalPages}
                        initialPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                    <div className="pt-3 xl:pt-0">
                        <p className="pt-3 text-sm font-medium text-center text-gray-500 border-t border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-t-0 xl:pt-0 xl:text-left">
                            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

