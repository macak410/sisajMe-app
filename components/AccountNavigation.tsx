"use client";

import { CalendarClock, House, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "./Logout";

const navLinks = [
  {
    name: "Početna",
    href: "/account",
    icon: <House className="h-5 w-5 text-yellow-500" />,
  },
  // {
  //   name: "Profil",
  //   href: "/account/profile",
  //   icon: <User className="h-5 w-5 text-yellow-500" />,
  // },
  {
    name: "Vaši termini",
    href: "/account/appointments",
    icon: <CalendarClock className="h-5 w-5 text-yellow-500" />,
  },
];

const AccountNavigation = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`py-3 px-5 rounded-md hover:bg-dark-500 hover:text-white transition-colors w-64 flex items-center gap-4 font-medium text-textGray-500 ${
                pathname === link.href ? "bg-dark-500 text-white" : ""
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-10">
          <Logout />
        </li>
      </ul>
    </nav>
  );
};

export default AccountNavigation;
