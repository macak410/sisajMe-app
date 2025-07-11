import { logout } from "@/lib/actions/customer.actions";
import { LogOut } from "lucide-react";

const Logout = () => {
  return (
    <form action={logout}>
      <button className="py-3 px-5 rounded-md hover:bg-dark-500 hover:text-white transition-colors w-64 flex items-center gap-4 font-medium text-textGray-500">
        <LogOut className="h-5 w-5 text-yellow-500" />
        <span>Odjava</span>
      </button>
    </form>
  );
};

export default Logout;
