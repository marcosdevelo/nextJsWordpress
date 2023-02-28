import { Input } from "components/Input";
import { useState, useEffect } from "react";
import queryString from "query-string";
export const Filters = ({ onSearch }) => {
  const [petFriendly, setPetFriendly] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  useEffect(() => {
    const {
      petFriendly: pet,
      hasParking: parking,
      minPrice: min,
      maxPrice: max,
    } = queryString.parse(window.location.search);
    setPetFriendly(pet === "true");
    setHasParking(parking === "true");
    setMinPrice(min || "");
    setMaxPrice(max || "");
  }, []);

  const handleSearch = () => {
    onSearch({
      petFriendly,
      hasParking,
      minPrice,
      maxPrice,
    });
  };
  return (
    <div className="max-w-5xl mx-auto my-5 flex border-solid border-slate-400 border-2 p-5 rounded-md gap-5">
      <div className="flex-1">
        <div className="">
          <label>
            <input
              type="checkbox"
              checked={hasParking}
              onClick={() => setHasParking((value) => !value)}
            />
            <span className="pl-2">has parking</span>
          </label>
        </div>
        <div className="">
          <label>
            <input
              type="checkbox"
              onClick={() => setPetFriendly((value) => !value)}
            />
            <span className="pl-2">pet friendly</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <label>
          <span>Min price</span>
          <Input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </label>
      </div>
      <div className="flex-1">
        <label>
          <span>Max price</span>
          <Input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>
      </div>
      <div onClick={handleSearch} className="btn">
        Search
      </div>
    </div>
  );
};
