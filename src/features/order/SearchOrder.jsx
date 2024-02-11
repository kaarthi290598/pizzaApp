import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!search) return;
    navigate(`/order/${search}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Order #
        "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=" rounded-full bg-yellow-200 px-4 py-2 text-sm
         transition-all duration-100 placeholder:text-stone-400 focus:outline-none
          focus:ring focus:ring-yellow-500 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
