import React, { useState } from "react";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./updateProfile";
import ForgetPassword from "./ForgetPassword";
import UpdateTodos from "./UpdateTodos";

const Modal = ({
  isUpdate,
  isUpdatePassword,
  isForgetPassword,
  isUpdateTodos,
  close,
  todo,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  console.log(todo);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            {isUpdate && <UpdateProfile />}
            {isUpdatePassword && <UpdatePassword />}
            {isForgetPassword && <ForgetPassword />}
            {isUpdateTodos && <UpdateTodos todo={todo} close={close} />}
            <div className="mt-4">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={close}
              >
                Kapat
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
