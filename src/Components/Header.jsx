import { IoMdNotifications } from "react-icons/io";
import { motion } from "framer-motion";
import titleimg from "../assets/img/titleimg.gif"

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-6 top-0 bg-gray-100 z-10 p-4 shadow-sm">
      {/* Title with Gradient and Animation */}
      <motion.h1
  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  MediMate Dashboard
  <img src={titleimg} alt="Inventory GIF" className="w-12 h-14 ml-1" />
</motion.h1>
      {/* Notification Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <IoMdNotifications className="text-2xl text-gray-600 cursor-pointer" />
        {/* Notification Badge */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
          3
        </span>
      </motion.div>
    </header>
  );
}
