import React from "react";
import { useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
 
const Favourites = () => {

  const [FavouriteBooks, setFavouriteBooks] = React.useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchFavourites = async () => {
    const response = await axios.get(
      "http://localhost:1000/api/v1/get-favourite-books",
      { headers }
    );

    setFavouriteBooks(response.data.data);
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <div className='grid grid-cols-4 gap-4'>
        {FavouriteBooks.length === 0 && (
          <p className="text-white text-xl col-span-4 text-center">
            No favourite books found.
          </p>
        )}
      {FavouriteBooks && FavouriteBooks.map((items,i)=>(
        <div key={i}>
          <BookCard 
            data={items} 
            favourite={true} 
            refreshFavourites={fetchFavourites}
          />
        </div>
      ))}
    </div>
  );
};

export default Favourites;