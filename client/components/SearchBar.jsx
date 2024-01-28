"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const [symbol, setSymbol] = useState("");

  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/stock/${symbol}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        name="search"
        className="p-4 w-full max-w-2x6 bg-white h-[4rem] rounded-[8px] border"
        type="search" // Using the appropriate input type
        placeholder="Enter a stock (e.g. NVDA)" // Placeholder text is helpful for users
        onChange={(e) => setSymbol(e.target.value)}
        value={symbol}
      />
    </form>
  );
};

export default SearchBar;
