import React from 'react';
import { getShopifyUrl, getSlackUrl } from 'src/api';

const Authentication: React.FC = () => {
  const handleGetSlackUrl = async () => {
    try {
      const { data } = await getSlackUrl();
      window.location.href = data.url;
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetShopifyUrl = async () => {
    try {
      const { data } = await getShopifyUrl();
      console.log(data);
      window.location.href = data.url;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-gray-50 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen py-12">
      <div>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Authenticate your apps
        </h2>
      </div>
      <div className="bg-gray-50 sm:flex-row flex flex-col justify-center w-full px-8 py-4">
        <button
          className="hover:shadow hover:border-purple-500 flex items-center px-4 py-2 border border-gray-300 rounded-lg"
          type="button"
          onClick={handleGetSlackUrl}
        >
          <img
            alt="Add to Slack"
            height="35"
            width="35"
            src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/306_Slack_logo-1024.png"
          />
          <p className="ml-2 font-semibold text-gray-700">Add to Slack</p>
        </button>
        <button
          className="sm:ml-4 sm:mt-0 hover:shadow hover:border-purple-500 flex items-center px-4 py-2 mt-2 ml-0 border border-gray-300 rounded-lg"
          type="button"
          onClick={handleGetShopifyUrl}
        >
          <img
            alt="Add to Shopify"
            height="35"
            width="35"
            src="https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-1024.png"
          />
          <p className="ml-2 font-semibold text-gray-700">Add to Shopify</p>
        </button>
      </div>
    </div>
  );
};

export default Authentication;
