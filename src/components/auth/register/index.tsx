import { useNavigate } from "react-router";
import { useFormik, Form, FormikProvider } from "formik";
import { IRegisterModel, IRegisterResult } from "./types";
import { RegisterSchema } from "./validation";
import classNames from "classnames";
import axios from "axios";

const RegisterPage: React.FC = () => {

  const initialValues: IRegisterModel = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: "",
  };

  const navigator = useNavigate();

  const onHandleSubmit = async (values: IRegisterModel) => {
    console.log("Submit form to server:", values);
    try {
        const res = await axios
            .post<IRegisterResult>("http://local.laravel.spu911.com/api/auth/register", values);
        const {data} = res;
        console.log("Messege", data.message);  
        navigator("/");
    }
    catch(ex) {
        console.log("Problem", ex);
    }

  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
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
                <label htmlFor="name" className="form-label">
                  Ім'я
                </label>
                <input
                  type="text"
                  className={classNames("form-control",
                  {"is-invalid": touched.name && errors.name},
                  {"is-valid": touched.name && !errors.name})}
                  autoComplete="off"
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
                {(touched && errors.name) && <span className="text-danger">{errors.name}</span>}
              </div>
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
              <div className="mb-3">
                <label htmlFor="password_confirmation" className="form-label">
                   Підтвердження
                </label>
                <input
                  type="password"
                  className={classNames("form-control",
                  {"is-invalid": touched.password_confirmation && errors.password_confirmation},
                  {"is-valid": touched.password_confirmation && !errors.password_confirmation})}
                  id="password_confirmation"
                  name="password_confirmation"
                  onChange={handleChange}
                />
                {(touched && errors.password_confirmation) && <span className="text-danger">{errors.password_confirmation}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Фото
                </label>
                <input
                  type="text"
                  className={classNames("form-control")}
                  autoComplete="off"
                  name="image"
                  id="image"
                  onChange={handleChange}
                />
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

export default RegisterPage;