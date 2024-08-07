import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BookCard = ({ image, title, author, price, bookid, fav }) => {
  const headers = {
    bookid: bookid,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const removeFromFavourite = async () => {
    try {
      const response = await axios.put(
        "https://my-book-store-tgmm.onrender.com/api/v1/remove-from-favourite",
        {},
        { headers }
      );
      toast.success(response.data.message, {
        style: {
          backgroundColor: "green",
          color: "white",
        },
        duration: 3000, // Display the toast for 5 seconds
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove from favourites", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
        duration: 3000, // Display the toast for 5 seconds
      });
    }
  };

  return (
    <div className="w-full bg-zinc-800 text-zinc-100 rounded p-4">
      <Toaster />
      <Link to={`/view-book-details/${bookid}`} className="">
        <div className="w-full flex items-center justify-center bg-zinc-900 ">
          <img src={image} alt="book" className="h-40 object-cover" />
        </div>
        <h1 className="mt-4 text-xl font-semibold">{title}</h1>
        <p className="mt-2 text-zinc-400 font-semibold">by {author}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">₹ {price}</p>
      </Link>
      {fav === true && (
        <button
          className="mt-4 bg-red-100 w-full rounded text-red-600 py-2 font-semibold hover:bg-red-200 transition-all duration-300"
          onClick={removeFromFavourite}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
