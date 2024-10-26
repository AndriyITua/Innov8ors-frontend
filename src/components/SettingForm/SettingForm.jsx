import { useState, useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import {
  updateUserPhoto,
  updateUserInfo,
  updateUserPassword,
} from "../../redux/auth/operationUpdate";

// шаблоны валидации
import { emailRegExp, nameRegExp } from "../../constants";
import { defaultMan, defaultWoman } from "../../constants";

import { MdOutlineFileUpload } from "react-icons/md";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import * as Yup from "yup";

import css from "./SettingForm.module.css";

// шаблон валидации полей
let ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "too short, min 3!")
    .max(30, "too long, max 30!")
    .matches(nameRegExp, "invalid input!")
    .required("enter name"),
  email: Yup.string()
    .min(8, "format example@mail.com")
    .matches(emailRegExp, "format example@mail.com")
    .required("enter email"),
  password: Yup.string()
    .nullable() // Поле может быть пустым (null)
    .min(8, "min 8 characters")
    .max(64, "max 64 characters")
    .notRequired() // Поле необязательно для заполнения
    .test("password-check", "min 8 characters", function (value) {
      if (value) {
        return value.length >= 8; // Проверка только если есть значение
      }
      return true; // Если поле пустое, пропускаем проверку
    }),
  newPassword: Yup.string()
    .nullable() // Разрешаем пустое значение
    .notRequired() // Поле newPassword не обязательно для заполнения по умолчанию
    .test(
      "new-password-check",
      "required if password entered",
      function (value) {
        const { password } = this.parent; // Доступ к полю password
        if (password && password.length > 0) {
          return value && value.length >= 8; // Проверка: если password не пустой, проверяем newPassword (минимум 8 символов)
        }
        return true; // Если password пустой, проверка пропускается
      }
    )
    .min(8, "min 8 characters")
    .max(64, "max 64 characters"),
  repeatNewPassword: Yup.string()
    .nullable()
    .notRequired()
    .test("repeat-new-password-check", "is required", function (value) {
      const { newPassword } = this.parent; // Доступ к полю newPassword
      if (newPassword && newPassword.length > 0) {
        return value && value === newPassword; // Проверка: если newPassword заполнено, repeatNewPassword должен совпадать
      }
      return true; // Если newPassword пустое, проверки нет
    })
    .oneOf([Yup.ref("newPassword"), null], "passwords must match"), // Дополнительная проверка на совпадение паролей
});

const SettingForm = ({ closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setRepeatNewPassword] = useState(false);

  const id = useId();
  const dispatch = useDispatch();

  const { username, email, photo, gender } = useSelector(selectUser);
  const name = username ?? "David";
  const useremail = email ?? "email@gmail.com";
  const userGender = gender ?? "woman";
  const userphoto = photo ?? (gender === "man" ? defaultMan : defaultWoman);

  const initialValues = {
    selectedOptions: userGender,
    name: "",
    email: "",
    password: "",
    newPassword: "",
    repeatNewPassword: "",
  };

  // функція вибору файлу
  const handleFileChange = event => {
    const file = event.target.files[0];
    dispatch(updateUserPhoto(file));
  };

  // сабміт форми
  const submit = (values, actions) => {
    // проверка на пароль - нет пароля - отправляем почту
    if (!values.password) {
      const { name, email, selectedOptions = "woman" } = values;
      const data = {
        username: name,
        email,
        gender: selectedOptions,
      };
      dispatch(updateUserInfo(data));
      actions.resetForm();
      return;
    }

    // если есть пароли - отправляем их
    const { password, newPassword, repeatNewPassword } = values;
    dispatch(
      updateUserPassword({
        password,
        newPassword,
        repeatNewPassword,
      })
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submit}
      validationSchema={ValidationSchema}
      validateOnChange={true}
      validateOnBlur={false}
    >
      {({ errors, touched }) => (
        <Form className={css.form}>
          <div className={css.settingWrapper}>
            <h2 className={css.settingTitle}>Setting</h2>
            <button className={css.closeButton} onClick={closeModal}>
              <TfiClose className={css.closeIcon} />
            </button>
          </div>

          <div className={css.formSetting}>
            <div className={css.photoSetting}>
              <h3 className={css.photoText}>Your photo</h3>
              <div className={css.uploadPhoto}>
                <div className={css.photoCard}>
                  <img
                    className={css.photo}
                    src={userphoto}
                    alt={`modal photo`}
                  />
                </div>
                <div>
                  <label htmlFor="fileInput" className={css.uploadLabel}>
                    <MdOutlineFileUpload />
                    <span className={css.uploadPhotoText}>Upload photo</span>
                  </label>
                  <input
                    className={css.uploadInput}
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div className={css.genderPasswordWrapper}>
              <div className={css.genderEmailWrapper}>
                <div className={css.genderSetting}>
                  <h3 className={css.photoText}>Your gender identity</h3>
                  <div className={css.checkGender}>
                    <label className={css.genderLabel}>
                      <Field
                        className={css.genderLabelRadio}
                        type="radio"
                        name="selectedOptions"
                        value="woman"
                      />
                      <span className={css.checkboxText}>Woman</span>
                    </label>
                    <label className={css.genderLabel}>
                      <Field
                        className={css.genderLabelRadio}
                        type="radio"
                        name="selectedOptions"
                        value="man"
                      />
                      <span className={css.checkboxText}>Man</span>
                    </label>
                  </div>
                </div>

                <div className={css.userNameSetting}>
                  <div className={css.userNameInput}>
                    <label htmlFor={`name-${id}`} className={css.userNameText}>
                      Your name
                    </label>
                    <div className={css.inputText}>
                      <Field
                        type="text"
                        name="name"
                        id={`name-${id}`}
                        className={`${css.inputField} ${
                          errors.name && touched.name
                            ? `${css.inputError} ${css.placeholderError}`
                            : ""
                        }`}
                        placeholder={`${name}`}
                        autoComplete={"current-name"}
                      />
                      <ErrorMessage
                        name="name"
                        component="span"
                        className={css.error}
                      />
                    </div>
                  </div>

                  <div className={css.userNameInput}>
                    <label htmlFor={`email-${id}`} className={css.userNameText}>
                      E-mail
                    </label>
                    <div className={css.inputText}>
                      <Field
                        type="text"
                        name="email"
                        id={`email-${id}`}
                        className={`${css.inputField} ${
                          errors.email && touched.email
                            ? `${css.inputError} ${css.placeholderError}`
                            : ""
                        }`}
                        placeholder={`${useremail}`}
                        autoComplete={"current-email"}
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className={css.error}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={css.passwordSetting}>
                <h3 className={css.passwordSettingTitle}>Password</h3>
                <label className={css.passwordLabel} htmlFor={`password-${id}`}>
                  Outdated password
                  <div className={css.inputContainer}>
                    <Field
                      className={`${css.passwordInputField} ${
                        errors.password && touched.password
                          ? `${css.inputError} ${css.placeholderError}`
                          : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id={`password-${id}`}
                      placeholder="Password"
                      autoComplete={"new-password"}
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className={css.passwordError}
                    />
                    {showPassword ? (
                      <HiOutlineEye
                        className={css.eyeIcon}
                        onClick={() => setShowPassword(prevState => !prevState)}
                      />
                    ) : (
                      <HiOutlineEyeSlash
                        className={css.eyeIcon}
                        onClick={() => setShowPassword(prevState => !prevState)}
                      />
                    )}
                  </div>
                </label>
                <label
                  className={css.passwordLabel}
                  htmlFor={`newPassword-${id}`}
                >
                  New password
                  <div className={css.inputContainer}>
                    <Field
                      className={`${css.passwordInputField} ${
                        errors.newPassword && touched.newPassword
                          ? `${css.inputError} ${css.placeholderError}`
                          : ""
                      }`}
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      id={`newPassword-${id}`}
                      placeholder="Password"
                      autoComplete={"new-password"}
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="span"
                      className={css.passwordError}
                    />
                    {showNewPassword ? (
                      <HiOutlineEye
                        className={css.eyeIcon}
                        onClick={() =>
                          setShowNewPassword(prevState => !prevState)
                        }
                      />
                    ) : (
                      <HiOutlineEyeSlash
                        className={css.eyeIcon}
                        onClick={() =>
                          setShowNewPassword(prevState => !prevState)
                        }
                      />
                    )}
                  </div>
                </label>
                <label
                  className={css.passwordLabel}
                  htmlFor={`repeatNewPassword-${id}`}
                >
                  Repeat new password
                  <div className={css.inputContainer}>
                    <Field
                      className={`${css.passwordInputField} ${
                        errors.repeatNewPassword && touched.repeatNewPassword
                          ? `${css.inputError} ${css.placeholderError}`
                          : ""
                      }`}
                      type={showRepeatNewPassword ? "text" : "password"}
                      name="repeatNewPassword"
                      id={`repeatNewPassword-${id}`}
                      placeholder="Password"
                      autoComplete={"new-password"}
                    />
                    <ErrorMessage
                      name="repeatNewPassword"
                      component="span"
                      className={css.passwordError}
                    />
                    {showRepeatNewPassword ? (
                      <HiOutlineEye
                        className={css.eyeIcon}
                        onClick={() =>
                          setRepeatNewPassword(prevState => !prevState)
                        }
                      />
                    ) : (
                      <HiOutlineEyeSlash
                        className={css.eyeIcon}
                        onClick={() =>
                          setRepeatNewPassword(prevState => !prevState)
                        }
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          <button type="submit" className={css.button}>
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingForm;
