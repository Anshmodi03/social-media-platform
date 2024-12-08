import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

// Validation schemas
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must contain both letters and numbers"
    )
    .required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must contain both letters and numbers"
    )
    .required("required"),
});

// Initial values
const initialValues = { email: "", password: "" };

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // New custom color for the button and other elements
  const customColor = "#FF4081"; // A bold pink color for a unique touch

  const handleSubmit = async (values, onSubmitProps) => {
    const url = `http://localhost:3001/auth/${pageType}`;
    const method = pageType === "login" ? "POST" : "POST";
    let body;

    if (pageType === "login") {
      body = JSON.stringify(values);
    } else {
      const formData = new FormData();
      formData.append("picture", values.picture);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("location", values.location);
      formData.append("occupation", values.occupation);
      body = formData;
    }

    const response = await fetch(url, {
      method,
      headers:
        pageType === "login" ? { "Content-Type": "application/json" } : {},
      body,
    });
    const data = await response.json();
    onSubmitProps.resetForm();

    if (data) {
      if (pageType === "login") {
        dispatch(setLogin({ user: data.user, token: data.token }));
        navigate("/home");
      } else {
        setPageType("login");
      }
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={pageType === "login" ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {pageType === "register" && (
              <>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    InputProps={{
                      startAdornment: (
                        <IconButton sx={{ color: customColor }}>
                          <PersonIcon />
                        </IconButton>
                      ),
                    }}
                    fullWidth
                  />
                </Box>
                <Box sx={{ gridColumn: "span 2" }}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    InputProps={{
                      startAdornment: (
                        <IconButton sx={{ color: customColor }}>
                          <PersonIcon />
                        </IconButton>
                      ),
                    }}
                    fullWidth
                  />
                </Box>

                <Box sx={{ gridColumn: "span 4" }}>
                  <TextField
                    label="Location"
                    name="location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    error={Boolean(touched.location && errors.location)}
                    helperText={touched.location && errors.location}
                    InputProps={{
                      startAdornment: (
                        <IconButton sx={{ color: customColor }}>
                          <LocationOnIcon />
                        </IconButton>
                      ),
                    }}
                    fullWidth
                  />
                </Box>

                <Box sx={{ gridColumn: "span 4" }}>
                  <TextField
                    label="Occupation"
                    name="occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    error={Boolean(touched.occupation && errors.occupation)}
                    helperText={touched.occupation && errors.occupation}
                    InputProps={{
                      startAdornment: (
                        <IconButton sx={{ color: customColor }}>
                          <WorkIcon />
                        </IconButton>
                      ),
                    }}
                    fullWidth
                  />
                </Box>

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${customColor}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <Box sx={{ gridColumn: "span 4" }}>
              <TextField
                label="Email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <IconButton sx={{ color: customColor }}>
                      <EmailIcon />
                    </IconButton>
                  ),
                }}
                fullWidth
              />
            </Box>

            <Box sx={{ gridColumn: "span 4" }}>
              <TextField
                label="Password"
                type="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <IconButton sx={{ color: customColor }}>
                      <LockIcon />
                    </IconButton>
                  ),
                }}
                fullWidth
              />
            </Box>
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: customColor,
                color: palette.background.alt,
                "&:hover": { color: customColor },
              }}
            >
              {pageType === "login" ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(pageType === "login" ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: customColor,
                "&:hover": { cursor: "pointer", color: "#F50057" },
              }}
            >
              {pageType === "login"
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
