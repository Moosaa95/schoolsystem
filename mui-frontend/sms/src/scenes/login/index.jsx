// import { LoadingButton } from "@mui/lab";
// import { Card, Checkbox, Grid, TextField } from "@mui/material";
// import { Box, styled, useTheme } from "@mui/system";
// // import { Paragraph } from 'app/components/Typography';
// // import useAuth from 'app/hooks/useAuth';
// import { Formik } from "formik";
// // import { useState } from "react";
// import { NavLink, useNavigate, Navigate } from "react-router-dom";
// import * as Yup from "yup";
// import LOGO from "../../assets/Boy-attending-video-lecture.svg";
// import { useLoginMutation } from "state/authApiSlice";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "state/authSlice";
// import { useRef, useState, useEffect } from "react";

// const Login = () => {
//   const usernameRef = useRef();
//   const errRef = useRef();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errMsg, setErrMsg] = useState("");
//   const navigate = useNavigate();

//   const [login, { isLoading }] = useLoginMutation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     usernameRef.current.focus();
//   }, []);

//   // useEffect(() => {
//   //   const token = localStorage.getItem("SMS_auth_token")
//   //   if (token)
//   // })

//   useEffect(() => {
//     setErrMsg("");
//   }, [username, password]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("username", username);
//     formData.append("password", password);
//     // console.log('email', formData.get("username"), formData, useLoginMutation)

//     try {
//       const userData = await login(formData).unwrap();
//       console.log(userData.login["status"], "user data", username, userData);
//       if (userData.login["status"] === true){
//         dispatch(setCredentials({ ...userData, username }))
//         setUsername('')
//         setPassword('')
//         navigate('/dashboard');
//       }else{
//         console.log(userData.login["message"]);
//       }

//     } catch (err) {
//       console.log(err, 'lololo');
//     }
//   };

//   const handleUsernameInput = (e) => setUsername(e.target.value);
//   const handlePasswordInput = (e) => setPassword(e.target.value);

//   const content = isLoading ? (
//     <h1>Loading...</h1>
//   ) : (
//     <section className="login">
//       <p
//         ref={errRef}
//         className={errMsg ? "errmsg" : "offscreen"}
//         aria-live="assertive"
//       >
//         {errMsg}
//       </p>

//       <h1>Employee Login</h1>

//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           ref={usernameRef}
//           value={username}
//           onChange={handleUsernameInput}
//           autoComplete="off"
//           required
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           onChange={handlePasswordInput}
//           value={password}
//           required
//         />
//         <button>Sign In</button>
//       </form>
//     </section>
//   );

//   return content;
// };

// export default Login;

// // const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

// // const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

// // const ContentBox = styled(Box)(() => ({
// //   height: '100%',
// //   padding: '32px',
// //   position: 'relative',
// //   background: 'rgba(0, 0, 0, 0.01)',
// // }));

// // const JWTRoot = styled(JustifyBox)(() => ({
// //   background: '#1A2038',
// //   minHeight: '100% !important',
// //   '& .card': {
// //     maxWidth: 800,
// //     minHeight: 400,
// //     margin: '1rem',
// //     display: 'flex',
// //     borderRadius: 12,
// //     alignItems: 'center',
// //   },
// // }));

// // // inital login credentials
// // const initialValues = {
// //   username: '',
// //   password: '',
// //   remember: true,
// // };

// // // form field validation schema
// // const validationSchema = Yup.object().shape({
// //   password: Yup.string()
// //     .min(6, 'Password must be 6 character length')
// //     .required('Password is required!'),
// //   username: Yup.string().required('Username is required!'),
// // });

// // const Login = () => {
// //   const theme = useTheme();
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(false);

// // //   const { login } = useAuth();

// //   const handleFormSubmit = async (values) => {
// //     setLoading(true);
// //     try {
// //     //   await login(values.email, values.password);
// //       navigate('/');
// //     } catch (e) {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <JWTRoot>
// //       <Card className="card">
// //         <Grid container>
// //           <Grid item sm={6} xs={12}>
// //             <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
// //               <img src={LOGO} width="100%" alt="" />
// //             </JustifyBox>
// //           </Grid>

// //           <Grid item sm={6} xs={12}>
// //             <ContentBox>
// //               <Formik
// //                 onSubmit={handleFormSubmit}
// //                 initialValues={initialValues}
// //                 validationSchema={validationSchema}
// //               >
// //                 {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
// //                   <form onSubmit={handleSubmit}>
// //                     <TextField
// //                       fullWidth
// //                       size="small"
// //                       type="text"
// //                       name="username"
// //                       label="Username"
// //                       variant="outlined"
// //                       onBlur={handleBlur}
// //                       value={values.username}
// //                       onChange={handleChange}
// //                       helperText={touched.username && errors.username}
// //                       error={Boolean(errors.username && touched.username)}
// //                       sx={{ mb: 3 }}
// //                     />

// //                     <TextField
// //                       fullWidth
// //                       size="small"
// //                       name="password"
// //                       type="password"
// //                       label="Password"
// //                       variant="outlined"
// //                       onBlur={handleBlur}
// //                       value={values.password}
// //                       onChange={handleChange}
// //                       helperText={touched.password && errors.password}
// //                       error={Boolean(errors.password && touched.password)}
// //                       sx={{ mb: 1.5 }}
// //                     />

// //                     <FlexBox justifyContent="space-between">
// //                       <FlexBox gap={1}>
// //                         <Checkbox
// //                           size="small"
// //                           name="remember"
// //                           onChange={handleChange}
// //                           checked={values.remember}
// //                           sx={{ padding: 0 }}
// //                         />

// //                         {/* <Paragraph>Remember Me</Paragraph> */}
// //                       </FlexBox>

// //                       <NavLink
// //                         to="/session/forgot-password"
// //                         style={{ color: theme.palette.primary.main }}
// //                       >
// //                         Forgot password?
// //                       </NavLink>
// //                     </FlexBox>

// //                     <LoadingButton
// //                       type="submit"
// //                       color="primary"
// //                       loading={loading}
// //                       variant="contained"
// //                       sx={{ my: 2 }}
// //                     >
// //                       Login
// //                     </LoadingButton>

// //                     {/* <Paragraph> */}
// //                       Don't have an account?
// //                       <NavLink
// //                         to="/session/signup"
// //                         style={{ color: theme.palette.primary.main, marginLeft: 5 }}
// //                       >
// //                         Register
// //                       </NavLink>
// //                     {/* </Paragraph> */}
// //                   </form>
// //                 )}
// //               </Formik>
// //             </ContentBox>
// //           </Grid>
// //         </Grid>
// //       </Card>
// //     </JWTRoot>
// //   );
// // };

// // export default Login;

import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LOGO from "../../assets/Boy-attending-video-lecture.svg";
import { useLoginMutation } from "state/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "state/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [login, {isLoading}] = useLoginMutation()
  const dispatch = useDispatch()

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmitForm = async (values) => {
    // values.preventDefault()
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      console.log(formData.get("username"),'NEW', values.password);
      const userData = await login(formData).unwrap();
      if (userData.login["status"] === true){
        dispatch(setCredentials({ ...userData, username: values.username }));
        navigate(userData.login["url"]);
      }else {
        console.log(userData.login["message"])
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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={LOGO} alt="Logo" />
      <Typography variant="h4" component="h1" gutterBottom>Employee Login</Typography>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({ values, handleChange, handleBlur, touched, errors, isSubmitting, handleSubmit }) => (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 360 }}>
            <TextField
              id="username"
              name="username"
              label="Username"
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
              type="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
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
              Sign In
            </LoadingButton>
          </Box>
        )}
      </Formik>
    </Box>
    </>
  );
};

export default Login;
