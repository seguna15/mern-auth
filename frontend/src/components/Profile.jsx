import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const Profile = () => {
  const {currentUser} = useSelector(state => state.user);
  const [visible, setVisible] = useState();


  return (
    <section className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
        />
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          defaultValue={currentUser.email}
        />
        <div className="relative">
          <input
            type={visible? "text": "password"}
            id="password"
            placeholder="Password"
            className="bg-slate-100 rounded-lg p-3 w-full"
          />
          <div className="absolute top-4 right-2">
            {visible ? (
              <FaEye onClick={(e) => setVisible(!visible)} />
            ) : (
              <FaEyeSlash onClick={(e) => setVisible(!visible)} />
            )}
          </div>
        </div>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80">update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </section>
  );
}

export default Profile