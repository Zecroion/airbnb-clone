import { Link, Navigate } from 'react-router-dom';
import './register.styles.scss';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/users.context';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
  }})

  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);


  if (redirect) {
    return <Navigate to={"/home"}/>
  }

  
  const onSubmit = async (data) => {
    const { name, email, password } = data;
      try {
        await axios.post('/register', { name, email, password })
        try {
          const {data} = await axios.post('/login', { email, password })
          setUser(data)
          setRedirect(true);
          toast('🎊 Registered Successfuly!', {
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
  
      } catch (err) {
        console.log(err)
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
    };
  }
  

  if (redirect) {
    return <Navigate to={"/home"}/>
  }

  return (
    <div className="c-form">
      <div className="mt-64">
        <h1 className="form__title">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            {...register("name", { required: "Name Is Required", maxLength: 20 })}
            placeholder="John Doe"
          />
          {errors?.name?.message && <span className="text-red-500 font-semibold">{errors?.name?.message}</span>}        

          <input
            type='email'
            {...register("email", {
              required: "Email Is Required", pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Please Enter Valid Email'
            } })}
            placeholder="your@email.com"
          />
          {errors?.email?.message && <span className="text-red-500 font-semibold">{errors?.email?.message}</span>}        
          <input
            type='password'
            {...register("password", {
              required: "Password Is Required", minLength: {
                value: 6, 
                message: 'Password should be more than 6 chars'
            } })}
            placeholder="password"
          />
          {errors?.password?.message && <span className="text-red-500 font-semibold">{errors?.password?.message}</span>}        
          <button type='submit' className="g-primary">Register</button>
          <div className="form__register">
            Already a member?{' '}
            <Link className="form__register-cta" to={'/login'}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
