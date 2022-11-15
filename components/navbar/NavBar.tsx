import React from "react";
import NavItem from "./NavItem";

/**
 * List of menues in the page that we want to display in the navbar
 */
const MENU_LIST = [
  { text: "Admin", href: "/admin" },
  { text: "State Display", href: "/state" },
  { text: "Companies Manager", href: "/companies" },
];

/**
 * Iterates throgh MENU_LIST and creates a NavItem per element
 * @returns A collection of NavItems to be displayed at top of page
 */
const Navbar = () =>
(
  <header>
    <nav className={`nav`}>
      {MENU_LIST.map((menu) =>
      (
        <NavItem key={menu.text} {...menu} />
      )
      )}
    </nav>
  </header>
)

export default Navbar;