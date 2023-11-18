import React from 'react';

function ProductCard({ product }) {
  const imageData = new Uint8Array(product.image.data.data);
  const base64String = btoa(String.fromCharCode(...imageData));
  const imageSrc = `data:${product.image.contentType};base64,${base64String}`;

  return (
    <div className="min-w-[300px] mx-auto bg-white p-4 rounded-md shadow-md transition-transform transform hover:scale-105 hover:cursor-pointer">
      <img
        src={imageSrc}
        alt={product.title}
        className="mb-4 rounded-md w-full h-40 object-cover"
      />
      <h2 className="text-xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <div className="flex items-center mb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 fill-current ${index + 1 <= product.rating
              ? 'text-yellow-500'
              : 'text-gray-300'
              } mr-1`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 1l2.4 6.2H18l-5 4.8 1.6 7L10 15.4l-6.6 4.6 1.6-7-5-4.8h5.6L10 1z" />
          </svg>
        ))}
        <span className="text-gray-500">{product.rating}</span>
      </div>

      <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700">
        See Details
      </button>
    </div>
  );
}

export default ProductCard;
