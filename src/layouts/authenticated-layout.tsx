import React, { useState } from "react";
import { UserIcon } from "lucide-react";
import useAuthStore from "../stores/AuthStore";
import useClickOutside from "./hooks/use-click-outside";

export const AuthenticatedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const { logout, user } = useAuthStore();

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const closeContent = () => {
    setIsContentVisible(false);
  };

  const menuRef = useClickOutside(closeContent);

  return (
    <div className="py-20 relative">
      <div className="absolute top-6 sm:right-12 right-4">
        <button
          onClick={toggleContentVisibility}
          className="bg-secondary-200 rounded-full size-12 flex items-center justify-center cursor-pointer"
        >
          <UserIcon className="size-8 text-secondary-100" />
        </button>

        <div
          ref={menuRef}
          className={` text-white transition-all duration-500 ease-in-out overflow-hidden bg-secondary-200 flex gap-2 items-center justify-center flex-col px-6 py-3 rounded-sm absolute right-0 ${
            isContentVisible
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <h3 className="text-sm font-semibold">{user?.username}</h3>

          <button
            onClick={logout}
            className="bg-primary bg-opacity-10 px-3 py-2 rounded-md text-primary font-bold"
          >
            Logout
          </button>
        </div>
      </div>

      {children}
    </div>
  );
};
