import React,{useEffect, useState} from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaShoppingCart, FaHeart, FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { MdOutlineDelete } from 'react-icons/md';

const ViewBookDetails = () => {

  const { id } = useParams();
  const [Data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

    
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  if (!Data) {
    return (
      <div className='h-screen bg-zinc-900 flex items-center justify-center'>
        <Loader />
      </div>
    );
  }
const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
};

const handleFavourite = async () => {
  try {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      { bookid: id },
      { headers }
    );

    alert(response.data.message);

  } catch (error) {

    if (error.response && error.response.data) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong");
    }

  }
};
const handleCart = async () => {
  try {

    const cartHeaders = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: id,
    };

    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers: cartHeaders }
    );

    alert(response.data.message);

  } catch (error) {
    if (error.response && error.response.data) {
      alert(error.response.data.message);
    } else {
      alert("Something went wrong");
    }
  }
};
    const deleteBook = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:1000/api/v1/delete-book/${id}`,
      { headers }
    );

    alert(response.data.message);
    navigate("/all-books");

  } catch (error) {
    alert("Error deleting book");
  }
}


  return (
    <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start'>

      {/* Book Image */}
      <div className='bg-zinc-800 rounded p-4 py-12 h-[70vh] lg:h-[88vh] w-full lg:w-3/6 flex flex-col lg:flex-row items-center justify-center gap-6'>

        <img
          src={Data.url}
          alt={Data.title}
          className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded'
        />

        {/* USER BUTTONS */}
        {isLoggedIn && role === "user" && (
          <div className="flex flex-row lg:flex-col gap-4 mt-6 lg:mt-0">

            <button  onClick={handleFavourite}
            className="bg-white rounded-lg lg:rounded-full text-3xl p-3 text-red-500 hover:scale-110 transition flex items-center justify-center">
              <FaHeart />
              <span className="ms-4 block lg:hidden text-base text-zinc-800">
                Favourites
              </span>
            </button>

            <button className="bg-blue-500 text-white rounded-lg lg:rounded-full text-3xl p-3 hover:scale-110 transition flex items-center justify-center"onClick={handleCart}>
              <FaShoppingCart />
              <span className="ms-4 block lg:hidden text-base">
                Add to Cart
              </span>
            </button>

          </div>
        )}

        {/* ADMIN BUTTONS */}
        {isLoggedIn && role === "admin" && (
          <div className="flex flex-row lg:flex-col gap-4 mt-6 lg:mt-0">

            <Link to={`/update-book/${id}`} className="bg-white rounded-lg lg:rounded-full text-3xl p-3 hover:scale-110 transition flex items-center justify-center">
              <FaEdit />
              <span className="ms-4 block lg:hidden text-base text-zinc-800">
                Edit Book
              </span>
            </Link>

            <button className="bg-white text-red-500 rounded-lg lg:rounded-full text-3xl p-3 hover:scale-110 transition flex items-center justify-center"
            onClick={deleteBook}
            >
              <MdOutlineDelete />
              <span className="ms-4 block lg:hidden text-base">
                Delete Book
              </span>
            </button>

          </div>
        )}

      </div>

      {/* Book Details */}
      <div className="p-4 w-full lg:w-3/6">

        <h1 className="text-4xl text-zinc-300 font-semibold">
          {Data.title}
        </h1>

        <p className="text-zinc-400 mt-1">
          by {Data.author}
        </p>

        <p className="text-zinc-500 mt-4 text-xl">
          {Data.desc}
        </p>

        <p className="flex mt-4 items-center text-zinc-400">
          <GrLanguage className="me-3" /> {Data.language}
        </p>

        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
          Price : ₹ {Data.price}
        </p>

      </div>

    </div>
  );
};

export default ViewBookDetails;