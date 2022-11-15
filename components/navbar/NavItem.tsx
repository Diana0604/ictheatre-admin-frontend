import Link from "next/link";

interface INavItemProps {
  text: string,
  href: string
}

const NavItem = ({ text, href }: INavItemProps) => {
  return (
    <Link style={{ marginRight: "50px" }} href={href}>
      {text}
    </Link>
  );
};

export default NavItem;