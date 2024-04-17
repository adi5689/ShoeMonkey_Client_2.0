import React, { useState } from "react";

const SizeSelector = ({ onSizeSelected, setErrorMessage, sizes }) => {
 const [selectedSize, setSelectedSize] = useState(null);

 const sizeData = [
    "UK 6",
    "UK 6.5",
    "UK 7",
    "UK 7.5",
    "UK 8",
    "UK 8.5",
    "UK 9",
    "UK 9.5",
    "UK 10",
    "UK 10.5",
    "UK 11",
 ];

 const handleSizeClick = (size) => {
    if (sizes.includes(size)) {
      setSelectedSize(size);
      onSizeSelected(size);
      setErrorMessage('');
    } else {
      console.log(`Size ${size} is not available.`);
    }
 };

 return (
    <div className="mb-4">
      <h4 className="bold-16 text-white">Select Size:</h4>
      <div className="grid grid-cols-4 lg:grid-cols-4 gap-6 lg:w-[500px] my-3 text-white">
        {sizeData.map((size, index) => (
          <div
            key={index}
            className={`size-button h-10 w-20 flexCenter cursor-pointer rounded-md ${
              selectedSize === size ? "ring-2 ring-green-500" : "ring-2 ring-white"
            } ${sizes.includes(size) ? "" : "opacity-50 cursor-not-allowed"}`}
            onClick={() => handleSizeClick(size)}
          >
            {size}
          </div>
        ))}
      </div>
    </div>
 );
};

export default SizeSelector;