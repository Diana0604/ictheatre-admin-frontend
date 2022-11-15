import React from "react";
import NavItem from "./NavItem";

const MENU_LIST = [
  { text: "Home", href: "/" },
  { text: "Admin", href: "/admin" },
  { text: "State Display", href: "/state" },
  { text: "Companies Manager", href: "/companies" },
];

const Navbar = () => {

  return (
    <header>
      <nav className={`nav`}>
        {MENU_LIST.map((menu) =>
        (
          <NavItem key={menu.text} {...menu} />
        )
        )}
      </nav>
    </header>
  );
};

export default Navbar;