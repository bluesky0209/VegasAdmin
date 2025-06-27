import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { addUser, updateUser } from "../../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";
import { toast, Slide } from "react-toastify";
import { handleUpdateBalance } from "../../redux/actions/auth";

export default function UserAddModal({ isOpen, setIsOpen, modalType, selectedUser }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, modalType: string, selectedUser: any }) {
  const { getRoles, createUser, updateUserData, getUser } = useApi();
  const { auth } = useSelector((state: any) => ({ auth: state.auth }));
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [bonusType, setBonusType] = useState("general");

  const bonus = [
    { value: 'cashback', label: 'Cashback' },
    { value: 'wager', label: 'Wager' }
  ]

  const handleSave = async () => {
    if (!selectedRole || !username || !password) {
      return;
    }
    const res = await createUser(username, password, auth.userData.permission._id, auth.userData._id, selectedRole.title, balance, bonusType);
    if (res.data) {
      dispatch(addUser(res.data) as any);
      dispatch(handleUpdateBalance(res.data.adminbalance) as any);
      toast.success("User created successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        transition: Slide,
        style: { top: '70px' }
      });
    } else {
    }
    setIsOpen(false);
  };

  const handleChange = async () => {
    if (!selectedRole || !username || !password) {
      return;
    }
    const res = await updateUserData(selectedUser._id, username, password, selectedRole._id);
    if (res.data) {
      dispatch(updateUser({ index: selectedUser._id, data: res.data }) as any);
      toast.success("User updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        transition: Slide,
        style: { top: '70px' }
      });
    } else {
    }
    setIsOpen(false);
    setUsername("");
    setPassword("");
  }

  const fetchRoles = async () => {
    try {
      const res = await getRoles({ order: auth.userData.permission.order + 1 });
      if (res.data.results) {
        console.log(res.data.results[0], "res")
        setSelectedRole(res.data.results[0]);
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const getUserInfo = async (userId: string) => {
    try {
      const res = await getUser(userId);
      if (res?.data) {
        setUsername(res.data.username);
        setSelectedRole(res.data.permission);
        setPassword(res.data.password);
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (modalType === "edit") {
      getUserInfo(selectedUser._id);
    }
  }, [modalType, selectedUser]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="user-add-modal max-w-[584px] p-5 lg:p-10"
    >
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        {modalType === "edit" ? "Edit" : "New"} {selectedRole?.title}
      </h4>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <div className="col-span-1">
          <Label>Username</Label>
          <Input type="text" value={username} onChange={(e: any) => setUsername(e.target.value)} disabled={modalType === "edit"} placeholder="Emirhan" />
        </div>
        <div className="col-span-1">
          <Label>Password</Label>
          <Input type="text" value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder="**" />
        </div>
        <div className="col-span-1">
          <Label>Role</Label>
          <Input type="text" value={selectedRole?.title} disabled />
        </div>

        {
          modalType === "add" && (
            <div className="col-span-1">
              <Label>Balance</Label>
              <Input type="text" value={balance} onChange={(e: any) => setBalance(e.target.value)} />
            </div>
          )
        }
        {
          (selectedRole?.title === 'player' && modalType === "add") && (
            <div className="col-span-1 mt-2">
              <Label>Bonus Type</Label>
              <div className="relative">
                <select
                  className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  value={bonusType}
                  onChange={(e) => {
                    setBonusType(e.target.value)
                  }}
                >
                  <option value="general">Select bonus type</option>
                  {bonus.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                      className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                    >
                      {item.value}
                    </option>
                  ))}
                </select>
                {bonusType && (
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setBonusType("general")}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )
        }

      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
          Close
        </Button>

        {modalType === "edit" ?
          (<Button size="sm" onClick={handleChange}>
            Update
          </Button>) :
          (<Button size="sm" onClick={handleSave}>
            Create
          </Button>)
        }
      </div>
    </Modal>
  );
}
