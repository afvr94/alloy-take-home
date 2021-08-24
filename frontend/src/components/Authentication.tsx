import React, { useEffect, useState } from 'react';
import { fetchShopifyUrl, fetchSlackUrl, fetchAccount } from 'src/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { HttpError } from '../constants';
import 'react-toastify/dist/ReactToastify.css';

enum State {
  LOADING = 0,
  ERROR = 1,
  LOADED = 2,
}

const Authentication: React.FC = () => {
  const [account, setAccount] = useState({
    email: '',
    isSlackAuthenticated: false,
    isShopifyAuthenticated: false,
  });
  const [state, setState] = useState(State.LOADING);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const authToken = localStorage.getItem('authToken');
      // if no auth token not authenticated
      if (!authToken) {
        navigate('/login');
        return;
      }
      try {
        setState(State.LOADING);
        const { data } = await fetchAccount();
        setAccount(data);
        setState(State.LOADED);
      } catch (e) {
        setState(State.ERROR);
      }
    })();
  }, [navigate]);

  const handleGetSlackUrl = async () => {
    try {
      const { data } = await fetchSlackUrl();
      window.location.href = data.url;
    } catch (error) {
      if (error?.response?.status === HttpError.UNAUTHENTICATED) {
        navigate('/login');
        return;
      }
      toast.error('There was an error fetching slack url ☹️', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const handleGetShopifyUrl = async () => {
    try {
      const { data } = await fetchShopifyUrl();
      window.location.href = data.url;
    } catch (error) {
      if (error?.response?.status === HttpError.UNAUTHENTICATED) {
        navigate('/login');
        return;
      }
      toast.error('There was an error fetching shopify url ☹️', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  if (state === State.LOADING) {
    return (
      <div className="bg-gray-50 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen py-12">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">🔄 Loading ...</h2>
        </div>
      </div>
    );
  }

  if (state === State.ERROR) {
    return (
      <div className="bg-gray-50 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen py-12">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            There was an error loading the app 😥
          </h2>
        </div>
        <button
          className="hover:shadow hover:border-purple-500 flex items-center px-4 py-2 border border-gray-300 rounded-lg"
          type="button"
          onClick={handleLogout}
        >
          <p className="ml-2 font-semibold text-gray-700">Logout</p>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen py-12">
      <ToastContainer />
      <div>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Authenticate your apps
        </h2>
      </div>
      <div className="bg-gray-50 sm:flex-row flex flex-col justify-center w-full px-8 py-4">
        {!account.isSlackAuthenticated ? (
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
        ) : (
          <h2 className=" flex items-center px-4 py-2 text-2xl">Slack is authenticated! 🚀</h2>
        )}
        {!account.isShopifyAuthenticated ? (
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
        ) : (
          <h3 className=" flex items-center px-4 py-2 text-2xl"> Shopify is authenticated! 🚀</h3>
        )}
      </div>
    </div>
  );
};

export default Authentication;
