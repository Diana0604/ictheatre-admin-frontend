import Link from "next/link";

/**
 * Props needed to create a NavItem object
 * text -> text to be displayed
 * href -> page to navigate to when clicked
 */
interface INavItemProps {
  text: string,
  href: string
}

/**
 * One single item of a nav bar
 * @param props { text, href } -> test to display and ref to page
 * @returns
 */
const NavItem = ({ text, href }: INavItemProps) => {
  return (
    <Link style={{ marginRight: "50px" }} href={href}>
      {text}
    </Link>
  );
}

export default NavItem;