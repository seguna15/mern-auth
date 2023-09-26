import { useState } from 'react'
import {Link} from 'react-router-dom';
import {FaEyeSlash, FaEye} from 'react-icons/fa';


const SignUpPage = () => {

  const [visible, setVisible] = useState(false);
  return (
    <main className="">
      <section className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold">Sign Up</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className=" font-bold text-gray-500 ">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-slate-100 p-3 rounded-lg "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className=" font-bold text-gray-500 ">
              email
            </label>
            <input
              type="email"
              placeholder="email"
              className="w-full bg-slate-100 p-3 rounded-lg "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className=" font-bold text-gray-500 ">
              password
            </label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="password"
                className="w-full bg-slate-100 p-3 rounded-lg "
              />
              <div className="absolute top-4 right-2">
                {visible ? (
                  <FaEye onClick={(e) => setVisible(!visible)} />
                ) : (
                  <FaEyeSlash onClick={(e) => setVisible(!visible)} />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-slate-700 text-white p-3 uppercase rounded-md hover:opacity-95 disabled:opacity-80"
          >
            Sign Up
          </button>
          <div className="flex gap-2">
            <p>Have an account?</p>
            <Link to="/sign-in">
              <span className="text-blue-500">Sign in</span>
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default SignUpPage