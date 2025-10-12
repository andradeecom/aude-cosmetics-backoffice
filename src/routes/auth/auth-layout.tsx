import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

export const AuthLayout = () => {
  return (
    <div>
      <Outlet />
      <Toaster position="top-right" duration={5000} />
    </div>
  );
};
