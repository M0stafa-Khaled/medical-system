import { NavLink, useLocation } from "react-router-dom";

interface IProps {
  links: {
    name: string;
    path: string;
  }[];
}

const NavList = ({ links }: IProps) => {
  const activeLink = useLocation().pathname.split("/")[2];
  return (
    <ul className="w-full mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {links.map((link) => (
        <li
          key={link.name}
          className="rounded-lg hover:bg-dark-blue lg:hover:bg-transparent transition-all duration-300 ease-in-out"
        >
          <NavLink
            to={link.path}
            className={`block w-full p-3 text-black transition-all duration-300 rounded-lg ${
              activeLink === link.path.split("/")[2]
                ? "bg-dark/20 dark:bg-dark lg:bg-transparent dark:text-white dark:lg:bg-transparent"
                : "hover:bg-dark/10 dark:hover:bg-dark/50 dark:lg:hover:bg-transparent lg:hover:bg-transparent text-black/70 hover:text-black dark:text-white/50 dark:lg:hover:!text-white"
            }`}
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavList;
