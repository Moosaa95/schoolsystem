
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import LOGO from "../../assets/Boy-attending-video-lecture.svg";
import { useChangePasswordMutation } from "state/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "state/authSlice";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [changePassword, {isLoading}] = useChangePasswordMutation()
  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("new password is required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("confirm Password is required"),
  });

  const handleSubmitForm = async (values) => {
    // values.preventDefault()
    console.log("LOGINX ")
    console.log(values);
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("confirm_password", values.confirmPassword);
      console.log(formData.get("username"),'NEW', values.confirmPassword);
      const userData = await changePassword(formData).unwrap();
      console.log(userData, 'udser data after');
      if (userData["status"] === true){
        dispatch(setCredentials({ ...userData, username: values.username }));
        navigate(userData["url"]);
      }else {
        console.log(userData["message"])
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const content = isLoading ? (
  //   <Typography variant="h1">Loading...</Typography>
  // ) : (
    
  // );

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p:"25px" }}>
      {/* <img src={LOGO} alt="Logo" /> */}
      <Typography variant="h3" component="h1" gutterBottom>Change Password</Typography>
      <Formik
        initialValues={{ username: "", password: "", confirmPassword:""}}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({ values, handleChange, handleBlur, touched, errors, isSubmitting, handleSubmit }) => (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 360 }}>
            <TextField
              id="username"
              name="username"
              label="New username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              id="password"
              name="password"
              label="New Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              margin="normal"
              fullWidth
              required
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              margin="normal"
              fullWidth
              required
            />
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              loading={isSubmitting}
              sx={{ mt: 3 }}
            >
              Change Password
            </LoadingButton>
          </Box>
        )}
      </Formik>
    </Box>
    </>
  );
};

export default ChangePassword;