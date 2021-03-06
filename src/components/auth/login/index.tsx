import { useNavigate } from "react-router";
import { useFormik, Form, FormikProvider } from "formik";
import { ILoginModel, ILoginResult } from "./types";
import { LoginSchema } from "./validation";
//import classNames from "classnames";
import axios from "axios";
import { InputGroup } from "../../common/inputGroup";

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
      const { data } = res;
      console.log("token", data.access_token);
      localStorage.Token = data.access_token;
      navigator("/user-profile");
      window.location.reload();
    }
    catch (ex) {
      console.log("Problem", ex);
    }

  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit, values } = formik;
  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-3 col-md-6">
          <h1 className="text-center">Вхід на сайт</h1>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
            <InputGroup
                field="email"
                label="Електронна пошта"
                onChange={handleChange}
                touched={touched.email}
                error={errors.email}
                value={values.email}
              />

              <InputGroup
                type="password"
                field="password"
                label="Пароль"
                onChange={handleChange}
                touched={touched.password}
                error={errors.password}
                value={values.password}
              />
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
