import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../navbar';
import './index.css';

const Login = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const token = Cookies.get("myToken");

    if( token !== undefined){
      navigate("/");
    }
  }, [navigate]);

  const [allValues, setValues] = useState({
    username: '',
    password: '',
    errorMsg: '',
  });


  const onSubmitData = async (event) => {
    event.preventDefault();

    const api = 'https://apis.ccbp.in/login';

    const userDetails = {
      username: allValues.username,
      password: allValues.password,
    };

    const options = {
      method: 'Post',
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(api, options);
      const data = await response.json();

      if (response.ok) {
        setValues({ ...allValues, errorMsg: '' });
        Cookies.set("myToken", data.jwt_token);
        navigate('/');
      } else {
        setValues({ ...allValues, errorMsg: data.error_msg });
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar hideLinks={true} />
      <div className="login-wrapper container-fluid">
        <div className="row justify-content-center" style={{ minHeight: '80vh', alignItems: 'center' }}>
          <div className="col-12 col-sm-10 col-md-6 col-lg-4">
            <div className="glass-card p-4 p-md-5">
              <h2 className="text-center mb-4 fw-bold" style={{ color: 'var(--primary-color)' }}>
                Welcome Back
              </h2>

              <form onSubmit={onSubmitData}>
                <div className="mb-4">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fw-semibold text-dynamic"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg premium-input"
                    id="exampleInputEmail1"
                    placeholder="Enter your username"
                    onChange={(e) => {
                      setValues({ ...allValues, username: e.target.value });
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label fw-semibold text-dynamic"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg premium-input"
                    id="exampleInputPassword1"
                    placeholder="Enter your password"
                    onChange={(e) => {
                      setValues({ ...allValues, password: e.target.value });
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-premium btn-lg w-100 mt-2"
                >
                  Sign In
                </button>

                {allValues.errorMsg && (
                  <div className="alert alert-danger text-center py-2 mt-4 mb-0 border-0 shadow-sm rounded-3">
                    {allValues.errorMsg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;