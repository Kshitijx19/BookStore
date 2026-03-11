import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";

const AllOrders = () => {

  const [AllOrders, setAllOrders] = useState(null);
  const [UserPopup, setUserPopup] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {

      const response = await axios.get(
        "http://localhost:1000/api/v1/get-all-orders",
        { headers }
      );

      setAllOrders(response.data.data);

    };

    fetch();
  }, []);

  const updateStatus = async (orderid, status) => {

    try {

      await axios.put(
        `http://localhost:1000/api/v1/update-status/${orderid}`,
        { status },
        { headers }
      );

      setAllOrders((prev) =>
        prev.map((order) =>
          order._id === orderid ? { ...order, status } : order
        )
      );

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>

      {!AllOrders && (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      )}

      {AllOrders && (
        <div className="h-full p-0 md:p-4 text-zinc-100">

          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>

          {/* Header */}
          <div className="mt-4 bg-zinc-800 w-full rounded py-3 px-4 flex gap-2 text-sm md:text-base">

            <div className="w-[5%] text-center">Sr.</div>
            <div className="w-[35%] md:w-[25%]">Books</div>
            <div className="w-[15%]">Price</div>
            <div className="w-[30%] md:w-[20%]">Status</div>
            <div className="w-[10%] flex justify-center">
              <FaUserLarge />
            </div>

          </div>

          {/* Orders */}
          {AllOrders.map((items, i) => (

            <div
              key={i}
              className="bg-zinc-800 w-full rounded py-3 px-4 flex gap-2 mt-2 items-center hover:bg-zinc-900 transition"
            >

              <div className="w-[5%] text-center">
                {i + 1}
              </div>

              <div className="w-[35%] md:w-[25%]">
                {items.book.title}
              </div>

              <div className="w-[15%]">
                ₹ {items.book.price}
              </div>

              {/* Status Dropdown */}
              <div className="w-[30%] md:w-[20%]">

                <select
                  value={items.status}
                  onChange={(e) =>
                    updateStatus(items._id, e.target.value)
                  }
                  className="bg-zinc-900 text-white p-2 rounded outline-none"
                >
                  <option value="Order placed">Order placed</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
                </select>

              </div>

              {/* User Icon */}
              <div className="w-[10%] flex justify-center">

                <button
                  onClick={() => setUserPopup(items.user)}
                  className="text-zinc-400 hover:text-white transition text-lg"
                >
                  <FaUserLarge />
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Glassmorphism Popup */}

      {UserPopup && (

        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setUserPopup(null)}
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl p-8 w-[320px] shadow-2xl animate-scaleIn"
          >

            {/* Avatar */}
            <div className="flex flex-col items-center">

              <img
                src={
                  UserPopup.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover mb-4 border border-white/30"
              />

              <h2 className="text-xl font-semibold">
                {UserPopup.username}
              </h2>

              <p className="text-zinc-300 text-sm mt-1">
                {UserPopup.email}
              </p>

            </div>

            {/* Close Button */}
            <button
              onClick={() => setUserPopup(null)}
              className="mt-6 w-full bg-white text-black py-2 rounded hover:bg-zinc-200 transition"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </>
  );
};

export default AllOrders;