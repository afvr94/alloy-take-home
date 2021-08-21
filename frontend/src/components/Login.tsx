import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { login } from '../api';

const Login: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    try {
      await login(email, password);
      console.log('logged');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-50 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form
        className="bg-gray-50 flex flex-col justify-center w-1/3 px-8 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email" className="input-label">
          Email
          <input
            id="email"
            type="text"
            className="sm:text-sm w-full p-2 mt-1 text-black transition duration-150 ease-in-out bg-white border border-gray-500 rounded appearance-none"
            data-testid="email"
            {...register('email', {
              required: 'The email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Entered value does not match email format',
              },
            })}
          />
        </label>
        {errors.email && (
          <p className="text-xs font-semibold text-red-500" data-testid="username-error">
            {errors.email.message}
          </p>
        )}
        <label htmlFor="password" className="input-label mt-6">
          Password
          <input
            id="password"
            type="password"
            className="sm:text-sm w-full p-2 mt-1 text-black transition duration-150 ease-in-out bg-white border border-gray-500 rounded appearance-none"
            {...register('password', { required: 'The password is required' })}
            data-testid="password"
          />
        </label>
        {errors.password && (
          <p className="text-xs font-semibold text-red-500" data-testid="password-error">
            {errors.password.message}
          </p>
        )}
        <NavLink
          className="mt-4 ml-auto text-purple-600 transition duration-150 ease-in-out cursor-pointer"
          to="/register"
          data-testid="forgot-password"
        >
          Sign up
        </NavLink>
        <button
          type="submit"
          className="hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-center w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};
export default Login;
