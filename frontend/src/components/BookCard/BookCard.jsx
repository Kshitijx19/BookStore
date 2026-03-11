import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const BookCard = ({data,favourite,refreshFavourites}) => {

  const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
};

  const handleRemoveBook = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const response = await axios.put(
  "http://localhost:1000/api/v1/remove-book-from-favourite",
  { bookid: data._id },
  { headers }
);

    alert(response.data.message);

    if(refreshFavourites){
      refreshFavourites();   // refresh favourite list
    }
  };

  return (
    <>
    <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-zinc-800 rounded p-4 flex flex-col'>
            <div className='bg-zinc-900 rounded flex items-center justify-center'>
                <img src={data.url} alt="/" className='h-[25vh]'/>
            </div>
            <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
            <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
            <p className="mt-2 text-zinc-200 font-semibold text-xl">
                ₹{data.price}
            </p>
        </div>
    </Link>

    {favourite && (
      <button
        className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
        onClick={handleRemoveBook}
      >
        Remove from favourite
      </button>
    )}

    </>
  );
};

export default BookCard;