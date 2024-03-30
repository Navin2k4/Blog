import { Button, Navbar, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';


const Header = () => {

  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2 ">
      <Link to="/" className="self-center whitespace-nowrap text-l font-semibold dark:text-white
      sm:text-xl">
        <span className="
        px-2 py-1 bg-gradient-to-r 
       from-blue-600 via-violet-600 to-red-600 rounded-lg text-white mr-1" >InkWhisper</span>Chronicles
      </Link>
      <form>
        <TextInput type="text" placeholder="Search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 pt-1 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2
      md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in" >
          <Button gradientDuoTone="purpleToBlue">
            Sign In
          </Button>
        </Link>
        <NavbarToggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}> 
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default Header;
