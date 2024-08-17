import { React, useState, createElement } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { logout } from '../features/authSlice'
import { useLogoutMutation } from '../features/userApiSlice'

import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import { useSelector } from 'react-redux'

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    route:"/user-profile",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,  
    route:"/edit-profile",
  },
];

const findInitial = (user) => {
  const nameParts = user.name.split(" ");
  const firstName = nameParts[0].split('');
  const secondName = nameParts[1] ? nameParts[1].split('') : '';
  const firstNameInitial = firstName[0] ? firstName[0] : "";

  if (secondName != null) {
    var lastNameInitial = secondName[0] ? secondName[0] : "";
  }
  
  const displayInitail = (firstNameInitial + lastNameInitial).toUpperCase();
  return displayInitail;
}

const AvatarComponent = () => { 

  const { userInfo } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();

  const [logoutMutation] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    try {
      const res = await logoutMutation().unwrap();
      dispatch(logout());
      navigate('/');
      toast.success("Logged out successfully")
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        {/* <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            withBorder={true}
            color="blue-gray"
            className=" p-0.5"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
          />
        </Button> */}
        <button className='bg-white text-indigo-700 h-10 w-10 rounded-full font-semibold '>
          {findInitial(userInfo)}
        </button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, route }, key) => 
         (
          <Link to={route}
            key={label}
            className='outline-none'
          >
              <MenuItem
                onClick={closeMenu}
                className={"flex items-center gap-2 rounded"}
              >
                {createElement(icon, {
                  className: "h-4 w-4 text-indigo-700",
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color="indigo"
                >
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          )
        )}
        <MenuItem
              onClick={handleLogout}
              className= "flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
        >
          <PowerIcon
            className='h-4 w-4 text-red-500'
            strokeWidth={2}
          />
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color= "red"
              >
                Sign Out
              </Typography>
            </MenuItem>
      </MenuList>
    </Menu>
  )
}

export { AvatarComponent as default, findInitial }