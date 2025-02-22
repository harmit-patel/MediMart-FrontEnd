import { IoMdNotifications } from "react-icons/io";

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-6 sticky top-0 bg-gray-100 z-10">
      <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
      <IoMdNotifications className="text-2xl text-gray-600 cursor-pointer" />
    </header>
  );
}