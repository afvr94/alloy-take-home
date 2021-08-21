import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    formState: { errors },
    getValues,
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
      await registerApi(email, password);
      console.log('registered');
      navigate('/login');
    } catch (err) {
      // TODO: ADD TO A ENUM
      if (err.response.data.code === 11000) {
        console.log('duplicated');
      }
      console.log(err.response.data);
      console.log(err);
    }
  };

  const validatePassword = (value: string): boolean => {
    const { password } = getValues();
    if (password !== value) return false;
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
            <label htmlFor="password" className="block mt-6 text-sm font-medium text-gray-700">
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
            <label
              htmlFor="confirm_password"
              className="block mt-6 text-sm font-medium text-gray-700"
            >
              Confirm password
              <input
                id="confirmPassword"
                className="sm:text-sm w-full p-2 mt-1 text-black transition duration-150 ease-in-out bg-white border border-gray-500 rounded appearance-none"
                {...register('confirmPassword', {
                  required: 'The confirm password is required',
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
