import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import { useState } from "react";
import useApi from "../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/actions/users";
import Label from "../form/Label";
import { handleUpdateBalance } from "../../redux/actions/auth";

export default function BalanceAddModal({ isOpen, setIsOpen, modalType, selectedUser }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, modalType: string, selectedUser: any }) {
  const { auth } = useSelector((store: any) => ({ auth: store.auth }));
  const { deposit, withdraw } = useApi();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [bonusType, setBonusType] = useState("general");
  const bonus = [
    { value: 'cashback', label: 'Cashback' },
    { value: 'wager', label: 'Wager' }
  ]
  const handleBalanceAdd = async () => {
    if (amount <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    if (modalType === "In") {
      const res = await deposit({
        userId: selectedUser._id,
        amount: Number(amount),
        payuserId: auth.userData._id,
        bonusType
      });
      if (res.data) {
        dispatch(updateUser({ index: selectedUser._id, data: res.data }) as any);
        dispatch(handleUpdateBalance(res.data.adminbalance) as any);
        setIsOpen(false);
        toast.success("Balance added successfully");
      } else {
        toast.error("Balance not added");
      }
    } else {
      if (Number(amount) > Number(selectedUser?.balance - selectedUser?.wagerBonus)) {
        toast.error("Balance not enough");
        return;
      }
      const res = await withdraw({
        userId: selectedUser._id,
        amount: -Number(amount),
        payuserId: auth.userData._id,
        bonusType: 'general'
      });
      if (res.data) {
        dispatch(updateUser({ index: selectedUser._id, data: res.data }) as any);
        dispatch(handleUpdateBalance(res.data.adminbalance) as any);
        setIsOpen(false);
        toast.success("Balance withdraw successfully");
      } else {
        toast.error("Balance not withdraw");
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="max-w-[584px] p-5 lg:p-10"
    >
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        Balance {modalType}
      </h4>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 mb-6">
        <div className="col-span-1">
          <h4 className="text-lg font-medium text-blue-800 dark:text-blue-800">
            {selectedUser?.username}
          </h4>
        </div>
        {
          selectedUser?.role === 'player' ? (
            <div className="col-span-1 text-gray-800 dark:text-white/90">
              {Number(selectedUser?.balance - selectedUser?.wagerBonus).toFixed(2)} ({Number(selectedUser?.wagerBonus).toFixed(2)})
            </div>
          ) : (
            <div className="col-span-1 text-gray-800 dark:text-white/90">
              {Number(selectedUser?.balance).toFixed(2)}
            </div>
          )
        }
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
        <div className="col-span-1">
          <Button size="md" variant="primary" className="w-full" onClick={() => setAmount(Number(amount) + 10)}>
            {modalType === "In" ? "+" : "-"} 10
          </Button>
        </div>

        <div className="col-span-1">
          <Button size="md" variant="primary" className="w-full" onClick={() => setAmount(Number(amount) + 50)}>
            {modalType === "In" ? "+" : "-"} 50
          </Button>
        </div>
        <div className="col-span-1">
          <Button size="md" variant="primary" className="w-full" onClick={() => setAmount(Number(amount) + 100)}>
            {modalType === "In" ? "+" : "-"} 100
          </Button>
        </div>

        <div className="col-span-1">
          <Button size="md" variant="primary" className="w-full" onClick={() => setAmount(Number(amount) + 500)}>
            {modalType === "In" ? "+" : "-"} 500
          </Button>
        </div>
      </div>
      {
        (selectedUser?.role === 'player' && modalType === "In") && (
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
      <div className="mt-6">
        <Input type="number" value={amount} onChange={(e: any) => setAmount(e.target.value)} placeholder="Enter Amount" />
      </div>

      <div className="flex items-center justify-end w-full gap-3 mt-6">
        {
          modalType === "Out" && selectedUser?.bonusType === "wager" && (
            <Button size="sm" variant="outline" onClick={() => { setAmount(selectedUser?.balance - selectedUser?.wagerBonus) }}>
              Out All
            </Button>
          )
        }
        <Button size="sm" variant="primary" onClick={() => handleBalanceAdd()}>
          {modalType}
        </Button>
        <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
