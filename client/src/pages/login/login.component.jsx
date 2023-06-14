import { Link } from 'react-router-dom';
import './login.styles.scss'
const Login = () => {
  return (
    <div className="c-form">
      <div className="mt-64">
        <h1 className="form__title">Login</h1>
        <form onSubmit="{handleLoginSubmit}">
          <input
            type="email"
            placeholder="your@email.com"
            value="{email}"
            // onChange={ev => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value="{password}"
            // onChange={ev => setPassword(ev.target.value)}
          />
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
