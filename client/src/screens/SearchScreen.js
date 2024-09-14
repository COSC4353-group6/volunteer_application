// import { Helmet } from 'react-helmet-async';
import "../styles/searchscreen.css";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchScreen() {
  return (
    <div className="searchscreen">
      <div className="search-container ">
        <span> Search </span>
        <IoSearchSharp />
      </div>
    </div>
  );
}
