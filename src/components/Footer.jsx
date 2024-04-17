import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-14 pb-3 lg:p-8 mx-auto">
      <div className=" px-5 md:px-10 mx-auto flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            <div>
              <img src="/output.png" height={44} width={44} />
              <Link to="/" className="mb-10 bold-20 font-anta text-white">
                ShoeMonkey
              </Link>
            </div>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0 flex-col lg:flex-row">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-anta font-medium uppercase text-sm">
                get help
              </div>
              <div className="text-sm font-anta text-white/[0.5] hover:text-white cursor-pointer">
                Order Status
              </div>
              <div className="text-sm font-anta text-white/[0.5] hover:text-white cursor-pointer">
                Delivery
              </div>
              <div className="text-sm font-anta text-white/[0.5] hover:text-white cursor-pointer">
                Returns
              </div>
              <div className="text-sm font-anta text-white/[0.5] hover:text-white cursor-pointer">
                Payment Options
              </div>
              <div className="text-sm font-anta text-white/[0.5] hover:text-white cursor-pointer">
                Contact Us
              </div>
            </div>
            {/* MENU END */}

            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-anta font-medium uppercase text-sm">
                About shoeMonkey
              </div>
              <div className="text-sm font-anta text-white/[0.5] hover:text-white cursor-pointer">
                An online store where you can fulfill all your shoe fetishes!{" "}
                <br />
                With a wide range of products from <br />
                <span className="font-anta text-white hover:text-red-600">Nike, Adidas, Converse</span> and
                all....
              </div>
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        {/* the window.open(url,target) helps to open a external link now if we give -blank in target it opens on a different context/tab but if we give _self, the link will open in the same tab */}
        <div className="flex flex-col gap-4 justify-center md:justify-start">
          <div>
            <div>
             <h1 className="medium-16 font-anta">Contact Us</h1>
             <div>
              <p className="font-anta">Contact No:</p>
              <span className="font-anta">+91 12345 43210</span> 
             </div>
             <div>
              <p className="font-anta">Email :</p>
              <span className="font-anta">support@shoemonkey.com</span> 
             </div>
            </div>  
          </div>
          <div className="flex gap-4 justify-center md:justify-start">
            <div
              onClick={() => window.open("https://facebook.com", "_blank")}
              className="w-10 font-anta h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-black hover:text-blue-500 cursor-pointer"
            >
              <FaFacebookF size={20} />
            </div>
            <div
              onClick={() => window.open("https://twitter.com", "_blank")}
              className="w-10 font-anta h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-black hover:text-blue-500 cursor-pointer"
            >
              <FaTwitter size={20} />
            </div>
            <div
              onClick={() => window.open("https://youtube.com", "_blank")}
              className="w-10 font-anta h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-black hover:text-red-600 cursor-pointer"
            >
              <FaYoutube size={20} />
            </div>
            <div
              onClick={() => window.open("https://instagram.com", "_blank")}
              className="w-10 font-anta h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-black hover:text-red-600 cursor-pointer"
            >
              <FaInstagram size={20} />
            </div>
          </div>
        </div>
        {/* RIGHT END */}
      </div>
      <div className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
        {/* LEFT START */}
        <div className="text-[12px] font-anta text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
          © 2024 ShoeMonkey. All Rights Reserved
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          <div className="text-[12px] font-anta text-white/[0.5] hover:text-white cursor-pointer">
            Guides
          </div>
          <div className="text-[12px] font-anta text-white/[0.5] hover:text-white cursor-pointer">
            Terms of Sale
          </div>
          <div className="text-[12px] font-anta text-white/[0.5] hover:text-white cursor-pointer">
            Terms of Use
          </div>
          <div className="text-[12px] font-anta text-white/[0.5] hover:text-white cursor-pointer">
            Privacy Policy
          </div>
        </div>
        {/* RIGHT END */}
      </div>
    </footer>
  );
};

export default Footer;
