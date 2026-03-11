import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {

  const [Profile, setProfile] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-information",
        { headers }
      );

      setProfile(response.data.data);
    };

    fetch();
  }, []);

  return (
    <div className='bg-zinc-900 px-2 md:px-12 text-white flex flex-col md:flex-row min-h-screen py-8 gap-4'>
      
      {!Profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {Profile && (
        <>
          <div className='w-full md:w-1/6 h-auto lg:h-[100%]'>
            <Sidebar data={Profile}/>
            <MobileNav data={Profile}/>
          </div>

          <div className='w-full md:w-5/6'>
            <Outlet />
          </div>
        </>
      )}

    </div>
  );
};

export default Profile;