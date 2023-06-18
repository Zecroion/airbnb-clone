import { Link, Navigate } from 'react-router-dom';
import './login.styles.scss'
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/users.context';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
const Login = () => {
  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext)

  if (redirect) {

    return <Navigate to={"/home"}/>
  }

  
  const onSubmit = async (data) => {
    const { email, password } = data;
      try {
        const { data } = await axios.post('/login', { email, password})
        setUser(data);
        setRedirect(true)
        toast('🎊 Logged In Successfuly!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

      } catch (err) {
        console.log(err)
        toast.error(err.response.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

      }
  }


  return (
    <div className="c-form">
      <div className="mt-64">
        <h1 className="form__title">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            {...register("email", {required: "Email Is Required", pattern: {
              value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Please Enter Valid Email'
          } })}
          />
          {errors?.email?.message && <span className="text-red-500 font-semibold">{errors?.email?.message}</span>}
          <input
            type="password"
            name="password"
            placeholder="password"
            {...register("password", {required: "Password Is Required"})}
          />
          {errors?.password?.message && <span className="text-red-500 font-semibold">{errors?.password?.message}</span>}
          <button className="g-primary">Login</button>
          <div className="form__register">
            Don't have an account yet?{' '}
            <Link className="form__register-cta" to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
