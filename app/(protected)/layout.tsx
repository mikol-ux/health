import Sidebar from "./_component/files/sidebar";
import DashboardTopNav from "./_component/files/topNav";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardTopNav />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
