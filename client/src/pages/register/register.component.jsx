import { Link } from 'react-router-dom';
import './register.styles.scss';
const Register = () => {
  return (
    <div className="c-form">
      <div className="mt-64">
        <h1 className="form__title">Register</h1>
        <form className="max-w-md mx-auto" onSubmit="{registerUser}">
          <input type="text" placeholder="John Doe" value="{name}"
            // onChange={(ev) => setName(ev.target.value)}
          />
          <input type="email" placeholder="your@email.com" value="{email}"
            // onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value="{password}"
            // onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="g-primary">Register</button>
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
