import { useNavigate } from "react-router";
import { useFormik, Form, FormikProvider } from "formik";
import { ILoginModel, ILoginResult } from "./types";
import { LoginSchema } from "./validation";
import classNames from "classnames";
import axios from "axios";
import { getUserToken } from "../user";

const LoginPage: React.FC = () => {

  const initialValues: ILoginModel = {
    email: "",
    password: "",
  };

  const navigator = useNavigate();

  const onHandleSubmit = async (values: ILoginModel) => {
    console.log("Submit form to server:", values);
    try {
        const res = await axios
            .post<ILoginResult>("http://local.laravel.spu911.com:80/api/auth/login", values);
        const {data} = res;
        console.log("token", data.access_token);  
        getUserToken(data.access_token);
        navigator("/user-profile")
    }
    catch(ex) {
        console.log("Problem", ex);
    }

  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit } = formik;
  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <h1 className="text-center">Вхід на сайт</h1>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Електронна пошта
                </label>
                <input
                  type="email"
                  className={classNames("form-control",
                  {"is-invalid": touched.email && errors.email},
                  {"is-valid": touched.email && !errors.email})}
                  autoComplete="off"
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
                {(touched && errors.email) && <span className="text-danger">{errors.email}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Пароль
                </label>
                <input
                  type="password"
                  className={classNames("form-control",
                  {"is-invalid": touched.password && errors.password},
                  {"is-valid": touched.password && !errors.password})}
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
                {(touched && errors.password) && <span className="text-danger">{errors.password}</span>}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
