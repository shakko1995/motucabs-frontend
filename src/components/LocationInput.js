import { useState, useEffect } from "react";
import { searchLocation } from "../api/location.api";

export default function LocationInput({ label, value, onChange }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length > 2) {
        const results = await searchLocation(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative w-full">
      <label className="block mb-1 text-sm font-semibold">{label}</label>
      <input
        className="border p-2 w-full rounded-xl"
        placeholder="Type location..."
        value={value || query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white shadow-md w-full max-h-48 overflow-auto rounded-xl z-10">
          {suggestions.map((loc, i) => (
            <li
              key={i}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(loc);
                setQuery(loc.address);
                setSuggestions([]);
              }}
            >
              {loc.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
