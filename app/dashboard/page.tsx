"use client";
import { Navbar } from "@/components/navbar";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaUserMd,
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <aside
        className={`bg-blue-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div className="flex items-center justify-between px-4">
          <span className="text-2xl font-extrabold">HealthCarePlus</span>
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
        <nav>
          <a
            href="#dashboard"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white"
          >
            <FaTachometerAlt className="inline-block mr-2" /> Dashboard
          </a>
          <a
            href="#doctors"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white"
          >
            <FaUserMd className="inline-block mr-2" /> Doctors
          </a>
          <a
            href="#appointments"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white"
          >
            <FaClipboardList className="inline-block mr-2" /> Appointments
          </a>
          <a
            href="#logout"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800 hover:text-white"
          >
            <FaSignOutAlt className="inline-block mr-2" /> Logout
          </a>
        </nav>
      </aside>
      <div className="flex-1 p-10 text-2xl font-bold">
        <header className="flex items-center justify-between mb-10 md:hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars className="w-6 h-6 text-blue-700" />
          </button>
          <span className="text-blue-700 text-xl">Dashboard</span>
        </header>
        <main>
          <h1 className="text-4xl">Welcome to HealthCarePlus Dashboard</h1>
          {/* Add your main content here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
