import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdOutlineFileUpload } from "react-icons/md";

import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";

import * as Yup from "yup";
import css from "./SettingForm.module.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
  newPassword: "",
};

// паттерн для валидации имени
const nameRegExp =
  "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";

// шаблон для валидации email
const emailRegexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .matches(nameRegExp, "Invalid input!")
    .required("Fill in the input field!"),
  email: Yup.string()
    .min(5, "Too Short!")
    .matches(emailRegexp, "Invalid input!")
    .required("Fill in the input field!"),
});

const SettingForm = ({ closeModal }) => {
  const id = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setRepeatNewPassword] = useState(false);

  //   const submit = (values, actions) => {
  //     //добавляем контакт
  //     dispatch(addContact(values));
  //     actions.resetForm();
  //   };

  return (
    <Formik
      initialValues={initialValues}
      // onSubmit={submit}
      validationSchema={ValidationSchema}
    >
      <Form className={css.form} >
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
                  src={`https://img.freepik.com/free-photo/photorealistic-view-tree-nature-with-branches-trunk_23-2151478039.jpg`}
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
                />
              </div>
            </div>
          </div>

          <div className={css.genderSetting}>
            <h3 className={css.photoText}>Your gender identity</h3>
            <div className={css.checkGender}>
              <label className={css.genderLabel}>
                <input type="radio" name="option" value="option1" checked/>
                <span className={css.checkboxText}>Woman</span>
              </label>
              <label className={css.genderLabel}>
                <input type="radio" name="option" value="option2" />
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
                  className={css.inputField}
                  placeholder="Name"
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
                  className={css.inputField}
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>
          </div>

          <div className={css.passwordSetting}>
            <h3 className={css.passwordSettingTitle}>Password</h3>
            <label className={css.passwordLabel} htmlFor={`password-${id}`}>
              Outdated password
              <div className={css.inputContainer}>
                <Field
                  className={css.passwordInputField}
                  type={showPassword ? "text" : "password"}
                  name="outdatedPassword"
                  id={`password-${id}`}
                  placeholder="Password"
                  autocomplete="new-password"
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
            <label className={css.passwordLabel} htmlFor={`newPassword-${id}`}>
              New password
              <div className={css.inputContainer}>
                <Field
                  className={css.passwordInputField}
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id={`newPassword-${id}`}
                  placeholder="Password"
                />
                {showNewPassword ? (
                  <HiOutlineEye
                    className={css.eyeIcon}
                    onClick={() => setShowNewPassword(prevState => !prevState)}
                  />
                ) : (
                  <HiOutlineEyeSlash
                    className={css.eyeIcon}
                    onClick={() => setShowNewPassword(prevState => !prevState)}
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
                  className={css.passwordInputField}
                  type={showRepeatNewPassword ? "text" : "password"}
                  name="repeatNewPassword"
                  id={`repeatNewPassword-${id}`}
                  placeholder="Password"
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

        <button type="submit" className={css.button}>
          Save
        </button>
      </Form>
    </Formik>
  );
};

export default SettingForm;
