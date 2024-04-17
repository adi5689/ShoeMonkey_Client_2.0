import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice"; 
import { selectIsLoggedIn } from "../features/user/userSlice"; 
import logo from "../assets/output.png";
import Navbar from "./Navbar";
import { MdClose, MdMenu } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import logoutIcon from "../assets/logout.svg";
import userIcon from '../assets/user.svg';
import { resetCart, selectTotalCartItems } from "../features/cart/cartSlice";
import Modal from 'react-modal';

const Header = () => {
 const [menuOpened, setMenuOpened] = useState(false);
 const [modalIsOpen, setModalIsOpen] = useState(false);
 const totalItems = useSelector(selectTotalCartItems);
 const isLoggedIn = useSelector(selectIsLoggedIn); 
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const toggleMenu = () => setMenuOpened(!menuOpened);

 const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    setModalIsOpen(false);
    navigate('/'); 
 };

 return (
    <header className="fixed top-0 left-0 m-auto max_padd_container w-full bg-[#000000] ring-1 ring-slate-900/5 z-[50]">
      <div className="px-4 flexBetween py-3 max-xs:px-2">
        {/* LOGO */}
        <div>
          <Link to="/" className="font-anta text-white">
            <img src={logo} alt="logo" height={66} width={66} /> ShoeMonkey
          </Link>
        </div>

        {/* DESKTOP NAVBAR */}
        <Navbar
          containerStyles={
            "hidden md:flex gap-x-5 xl:gap-x-10 medium-15 uppercase text-white"
          }
        />

        {/* MOBILE NAVBAR */}
        <Navbar
          containerStyles={`${
            menuOpened
              ? "flex item-start text-left flex-col gap-y-12 fixed top-36 right-8 py-12 px-6 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
              : "flex item-start flex-col gap-y-12 fixed top-36 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"
          }`}
          toggleMenu={toggleMenu}
        />

        {/* BUTTONS */}
        {/* MENU BUTTONS */}
        <div className="flexBetween sm:gap-x-3 bold-16">
          {menuOpened ? (
            <MdClose
              className="text-white md:hidden cursor-pointer hover:text-red-600 mr-2 p-1 ring-1 ring-white hover:ring-red-600 h-8 w-8 rounded-md"
              onClick={toggleMenu}
            />
          ) : (
            <MdMenu
              className="text-white md:hidden cursor-pointer hover:text-[#40bf80] mr-2 p-1 ring-1 ring-white hover:ring-[#40bf80] h-8 w-8 rounded-md"
              onClick={toggleMenu}
            />
          )}
          {/* USER BUTTON */}
          <div className="flexBetween sm:gap-x-3">
            <NavLink to={"cart"} className={"flex"}>
              <IoMdCart className="text-white cursor-pointer hover:text-[#40bf80] mr-2 p-1 ring-1 ring-white hover:ring-[#40bf80] h-8 w-8 rounded-md" />
              <span className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-3 right-4">
                {totalItems}
              </span>
            </NavLink>
            {isLoggedIn ? (
              <button
                onClick={() => setModalIsOpen(true)}
                className={"btn_secondary_rounded flexCenter gap-x-2 medium-16 hidden font-anta"}
              >
                <img src={logoutIcon} alt="logout" height={19} width={19} />
                Logout
              </button>
            ) : (
              <NavLink to={"login"} className={"btn_secondary_rounded flexCenter gap-x-2 medium-16"}>
                <img src={userIcon} alt="usericon" height={19} width={19}/>
                Login 
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Logout Confirmation"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '4px',
            outline: 'none'
          }
        }}
      >
        <h2 className="font-anta mb-6">Are you sure you want to logout?</h2>
        <div className="flex justify-between gap-x-4">
        <button onClick={handleLogout} className="font-anta p-2 bg-red-600 rounded-md">Yes, logout</button>
        <button onClick={() => setModalIsOpen(false)} className="font-anta p-2 bg-green-600 rounded-md">No, stay logged in</button>
        </div>
      </Modal>
    </header>
 );
};

export default Header;
