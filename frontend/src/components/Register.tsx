import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { register as registerApi } from '../api';
import { MongoErrorCode } from '../constants';

type FormData = {
  email: string;
  password: string;
  shopifyUrl: string;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    formState: { errors },
    getValues,
    setError,
    handleSubmit,
    clearErrors,
  } = useForm();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    // if no auth token not authenticated
    if (!authToken) return;
    navigate('/auth');
  }, [navigate]);

  const onSubmit = async ({ email, password, shopifyUrl }: FormData): Promise<void> => {
    clearErrors('server');
    try {
      await registerApi({ email, password, shopifyUrl });
      navigate('/login');
    } catch (err) {
      if (err.response.data.code === MongoErrorCode.DUPLICATED) {
        setError('email', { type: 'server', message: 'Email already exist' });
        return;
      }
      setError('server', { type: 'server', message: ' Oh no! A server error has occurred' });
      setTimeout(() => {
        clearErrors('server');
      }, 2000);
    }
  };

  const validatePassword = (value: string): boolean => {
    const { password } = getValues();
    if (password !== value) return false;
    return true;
  };

  const validateEmail = (value: string) => validator.isEmail(value);

  // A shopify usl should be a valid url, include "myshopify" and not include protocol
  const validateURL = (value: string) => {
    if (!validator.isURL(value, { require_protocol: false, require_valid_protocol: false })) {
      return false;
    }
    if (['http', 'https', 'ftp'].some((str) => value.indexOf(str) >= 0)) return false;
    if (!value.includes('myshopify.com')) return false;
    return true;
  };

  return (
    <div className="bg-gray-50 sm:px-6 lg:px-8 flex flex-col justify-center min-h-screen py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-8">
        <div className="sm:rounded-lg sm:px-10 px-4 py-8 bg-white shadow">
          <form className=" flex flex-col space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Register</h2>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
              <input
                id="email"
                type="text"
                className="sm:text-sm w-full p-2 mt-2 text-black transition duration-150 ease-in-out bg-white border border-gray-500 rounded appearance-none"
                data-testid="email"
                {...register('email', {
                  required: true,
                  validate: validateEmail,
                })}
              />
              {errors?.email?.type === 'required' && (
                <p className="text-xs font-semibold text-red-500" data-testid="username-error">
                  The email is required
                </p>
              )}
              {errors?.email?.type === 'validate' && (
                <p
                  className="text-xs font-semibold text-red-500"
                  data-testid="confirm-password-error"
                >
                  Entered value does not match email format
                </p>
              )}
            </label>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Shopify URL
              <input
                id="shopifyUrl"
                type="text"
                className="sm:text-sm w-full p-2 mt-2 text-black transition duration-150 ease-in-out bg-white border border-gray-500 rounded appearance-none"
                data-testid="shopifyUrl"
                {...register('shopifyUrl', {
                  required: true,
                  validate: validateURL,
                })}
              />
              {errors?.shopifyUrl?.type === 'required' && (
                <p className="text-xs font-semibold text-red-500" data-testid="username-error">
                  The shopify is required (e.g. [your shop name].myshopify.com)
                </p>
              )}
              {errors?.shopifyUrl?.type === 'validate' && (
                <p
                  className="text-xs font-semibold text-red-500"
                  data-testid="confirm-password-error"
                >
                  Entered a valid url (e.g. [your shop name].myshopify.com)
                </p>
              )}
            </label>
            <label htmlFor="password" className="block mt-6 text-sm font-medium text-gray-700">
              Password
              <input
                id="password"
                type="password"
                className="sm:text-sm w-full p-2 mt-1 text-black transition duration-150 ease-in-out bg-white border border-gray-500 rounded appearance-none"
                {...register('password', { required: true, minLength: 8 })}
                data-testid="password"
              />
              {errors?.password?.type === 'required' && (
                <p className="text-xs font-semibold text-red-500" data-testid="password-error">
                  The password is required
                </p>
              )}
              {errors?.password?.type === 'minLength' && (
                <p className="text-xs font-semibold text-red-500" data-testid="password-error">
                  The password must be greater than 8 characters
                </p>
              )}
            </label>
            <label
              htmlFor="confirm_password"
              className="block mt-6 text-sm font-medium text-gray-700"
            >
              Confirm password
              <input
                id="confirmPassword"
                className="sm:text-sm w-full p-2 mt-1 text-black transition duration-150 ease-in-out bg-white border border-gray-500 rounded appearance-none"
                {...register('confirmPassword', {
                  required: true,
                  validate: validatePassword,
                })}
                data-testid="confirm-password"
                autoComplete="off"
                type="password"
              />
              {errors?.confirmPassword?.type === 'required' && (
                <p
                  className="text-xs font-semibold text-red-500"
                  data-testid="confirm-password-error"
                >
                  The confirm password is required
                </p>
              )}
              {errors?.confirmPassword?.type === 'validate' && (
                <p
                  className="text-xs font-semibold text-red-500"
                  data-testid="confirm-password-error"
                >
                  Password mismatch
                </p>
              )}
            </label>
            <NavLink
              className="mt-2 ml-auto text-purple-600 transition duration-150 ease-in-out cursor-pointer"
              to="/login"
              data-testid="forgot-password"
            >
              Back
            </NavLink>
            {errors.server && (
              <p className="text-xs font-semibold text-red-500" data-testid="server-error">
                {errors.server.message}
              </p>
            )}
            <button
              type="submit"
              className="hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
