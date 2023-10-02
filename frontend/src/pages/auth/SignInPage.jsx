import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";
import { signInStart, signInSuccess, signInFailure } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../components/OAuth";

const SignInPage = () => {
  const [formData, setFormData] = useState({});
  const {loading, error } = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await axios.post("/api/v1/auth/login", formData, {withCredentials: true});
      const data = res.data;
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.response.data));
    }
  };

  const [visible, setVisible] = useState(false);
  return (
    <main className="mt-5">
      <section className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className=" font-bold text-gray-500 capitalize ">
              email
            </label>
            <input
              type="email"
              placeholder="email"
              className="w-full bg-slate-100 p-3 rounded-lg"
              id="email"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className=" font-bold text-gray-500 capitalize">
              password
            </label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="password"
                className="w-full bg-slate-100 p-3 rounded-lg"
                id="password"
                onChange={handleChange}
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
            disabled={loading}
            className="bg-slate-700 text-white p-3 uppercase rounded-md hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth/>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Do not have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-500">Sign up</span>
          </Link>
        </div>
         <p className="text-red-700 mt-5">{error ? error.message || "Something went wrong!" : ""}</p>
      </section>
    </main>
  );
};

export default SignInPage;
