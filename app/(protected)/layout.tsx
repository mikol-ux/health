import Sidebar from "./_component/files/sidebar";
import DashBoardItem from "./_component/files/dashboardItem";
import SideNavbar from "./_component/files/side";
import { auth } from "@/auth";
import DashboardTopNav from "./_component/files/topNav";
interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="p-1 w-full">
      <div className="flex p-1 min-h-screen min-w-screen gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops)] from-purple-100 to-slate-100">
        {<Sidebar />}
        <DashboardTopNav />
        <div className="w-full flex flex-col justify-start items-center overflow-y-auto max-h-screen p-2">
          {<DashBoardItem />}
          {children}
        </div>
      </div>
    </div>
  );
};
export default ProtectedLayout;
