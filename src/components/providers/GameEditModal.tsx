import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { addUser, updateUser } from "../../redux/actions/users";
import { useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";

export default function UserAddModal({ isOpen, setIsOpen, modalType, selectedUser }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, modalType: string, selectedUser: any }) {
  const { getRoles, createUser, updateUserData } = useApi();
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSave = async () => {
    if (!selectedRole || !username || !password) {
      return;
    }
    const res = await createUser(username, password, selectedRole._id, selectedUser._id, selectedRole.title);
    if (res.data) {
      dispatch(addUser(res.data) as any);
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
    console.log(username, password, selectedRole, "selectedUser._id");
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
  }

  const fetchRoles = async () => {
    const res = await getRoles({});
    if (res.data.results) {
      // const role = res.data.results.filter((role: any) => role.title !== 'admin')
      setRoles(res.data.results);
      if (modalType !== "edit") {
        setSelectedRole(roles[0]);
      }
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (modalType === "edit") {
      setUsername(selectedUser.username);
      console.log(selectedUser.permissionId, "permissionId");
      setSelectedRole(selectedUser.permission);
      setPassword(selectedUser.password);
    }
  }, [modalType, selectedUser]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="user-add-modal max-w-[584px] p-5 lg:p-10"
    >
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        User Information
      </h4>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <div className="col-span-1">
          <Label>Username</Label>
          <Input type="text" value={username} onChange={(e: any) => setUsername(e.target.value)} placeholder="Emirhan" />
        </div>

        <div className="col-span-1">
          <Label>Password</Label>
          <Input type="test" value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder="**" />
        </div>
        <div className="col-span-1">
          <Label>Role</Label>
          <div className="relative z-20 bg-transparent">
            <select
              className="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              value={selectedRole?._id}
              onChange={(e: any) => setSelectedRole(roles.find((role: any) => role._id === e.target.value))}
            >
              {roles.map((value: any) => (
                <option
                  key={value._id}
                  value={value._id}
                  className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                >
                  {value.title}
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
