import React, { useState, useEffect } from "react";
import useDebounce from "./useDebounce";

function index() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("API call with:", debouncedSearchTerm);
      // Make an API request here
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default index;

