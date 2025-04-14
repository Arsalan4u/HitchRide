// // components/FreeLocationAutocomplete.tsx
// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";

// interface Props {
//   placeholder: string;
//   value: string;
//   onChange: (value: string) => void;
// }

// const FreeLocationAutocomplete: React.FC<Props> = ({ placeholder, value, onChange }) => {
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchSuggestions = async () => {
//       if (value.length < 3) {
//         setSuggestions([]);
//         return;
//       }
//       try {
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${value}`,
//           { signal: controller.signal }
//         );
//         const data = await res.json();
//         setSuggestions(data.map((item: any) => item.display_name));
//         setShowDropdown(true);
//       } catch (err) {
//         if (err.name !== "AbortError") console.error(err);
//       }
//     };

//     fetchSuggestions();
//     return () => controller.abort();
//   }, [value]);

//   return (
//     <div style={{ position: "relative" }}>
//       <Input
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         onFocus={() => setShowDropdown(true)}
//         onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
//         style={{ paddingLeft: "37px", border: "1px solid #ccc", borderRadius: "5px", height: "50px" }}
//       />
//       {showDropdown && suggestions.length > 0 && (
//         <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 max-h-60 overflow-y-auto text-sm">
//           {suggestions.map((suggestion, idx) => (
//             <li
//               key={idx}
//               onClick={() => {
//                 onChange(suggestion);
//                 setShowDropdown(false);
//               }}
//               className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//             >
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default FreeLocationAutocomplete;




import React, { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const FreeLocationAutocomplete: React.FC<Props> = ({ placeholder, value, onChange }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update local input value when prop value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      if (inputValue.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setSuggestions(data.map((item: any) => item.display_name));
        setShowDropdown(true);
      } catch (err) {
        if ((err as Error).name !== "AbortError") console.error(err);
      }
    };

    fetchSuggestions();
    return () => controller.abort();
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Update both local and parent state
    setInputValue(suggestion);
    onChange(suggestion);
    
    // Force input update
    if (inputRef.current) {
      inputRef.current.value = suggestion;
    }
    
    setShowDropdown(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <div style={{ position: "relative" }}>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        onBlur={handleBlur}
        style={{ paddingLeft: "37px", border: "1px solid #ccc", borderRadius: "5px", height: "50px" }}
      />
      {showDropdown && suggestions.length > 0 && (
        <ul 
          ref={dropdownRef}
          className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 max-h-60 overflow-y-auto text-sm"
        >
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent blur event
                handleSuggestionClick(suggestion);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FreeLocationAutocomplete;
