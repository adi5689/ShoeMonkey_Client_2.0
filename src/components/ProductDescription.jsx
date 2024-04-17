import React, {useState} from 'react';
import SizeChart from '../assets/sizechart.png'

const ProductDescription = ({ product }) => {
  const [showDetails, setShowDetails] = useState(true); // State to manage which content to show
 
  // Function to handle button clicks
  const handleButtonClick = (contentType) => {
     setShowDetails(contentType === 'description');
  };

  return (
    <div className='mt-20'>
      <div className='flex gap-3 mb-4 justify-center items-center'>
        <button className='btn_dark_rounded font-anta !rounded !text-xs !py-[6px] w-36' onClick={() => handleButtonClick('description')}>Description</button>
        {/* <button className='btn_light_rounded font-anta !rounded !text-xs !py-[6px] w-36'>Care Guide</button> */}
        <button className='btn_light_rounded font-anta !rounded !text-xs !py-[6px] w-36' onClick={() => handleButtonClick('sizeGuide')}>Size Guide</button>
      </div>
      <div className='pt-6 flex gap-x-2 medium-16 mb-4 w-full justify-center items-center'>
        {showDetails ? (
          <p className='text-white text-sm'>{product.description}</p>
        ) : (
          <img src={SizeChart} alt="Size Guide" className="w-[50%] h-auto" />
        )}
      </div>
    </div>
  )
}

export default ProductDescription