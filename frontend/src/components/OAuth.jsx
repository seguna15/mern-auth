import {GoogleAuthProvider, signInWithPopup, getAuth} from "firebase/auth"
import axios from "axios";
import { app } from "../firebase";
import {useDispatch} from 'react-redux';
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await axios.post("/api/v1/auth/google", {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      
      const {rest} = res.data;
      
      dispatch(signInSuccess(rest));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.response.data));
    }
  }


  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-90'>Continue with google</button>
  )
}

export default OAuth