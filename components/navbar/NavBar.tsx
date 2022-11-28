import React from "react";
import NavItem from "./NavItem";

/**
 * List of menues in the page that we want to display in the navbar
 */
const MENU_LIST = [
  { text: "Companies Setup", href: "/database/companies" },
  { text: "Player Company Setup", href: "/database/audiencecompany" },
  { text: "Sellers Setup", href: "/database/sellers" },
  { text: "Show Management - Admin ", href: "/showmanagement/admin" },
  { text: "Show Management - Stock Market", href: "/showmanagement/stockmarket" },
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