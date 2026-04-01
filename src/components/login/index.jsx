import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
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
    <div className="login-wrapper container-fluid">
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center mb-4 text-primary fw-bold">
                Login
              </h2>

              <form onSubmit={onSubmitData}>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fw-semibold"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleInputEmail1"
                    onChange={(e) => {
                      setValues({ ...allValues, username: e.target.value });
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label fw-semibold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="exampleInputPassword1"
                    onChange={(e) => {
                      setValues({ ...allValues, password: e.target.value });
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mt-3"
                >
                  Sign In
                </button>

                {allValues.errorMsg && (
                  <div className="alert alert-danger text-center py-2 mt-3 mb-0">
                    {allValues.errorMsg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;