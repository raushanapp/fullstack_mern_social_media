import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material";
import EditOutLinedIcon from "@mui/icons-material/EditOutLined";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("email Invalid").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("email Invalid").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

export const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    // handling from 
    const handleFormSubmit = async (value, onSubmitProps) => { };
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
            
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form action="" onSubmit={handleSubmit}>
                    <Box
                        display='grid'
                        gap='30px'
                        gridTemplateColumns="repeat(4 ,minmax(0,1fr))"
                        sx={{
                            "& > div":{gridColumn:isNonMobile?undefined:"span 4"},
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label='First Name'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{gridColumn:"span 2"}}
                                />

                                <TextField
                                    label='last Name'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{gridColumn:"span 2"}}
                                />
                                <TextField
                                    label='Location'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{gridColumn:"span 2"}}
                                />
                                <TextField
                                    label='Occupation'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{gridColumn:"span 2"}}
                                />
                                {/* picture dropzone box */}
                                <Box
                                    gridColumn='span 4'
                                    border={`1px solid${palette.neutral.medium}`}
                                    borderRadius='5px'
                                    p='1rem'
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture",acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.neutral.amin}`}
                                                p='1rem'
                                                sx={{ "$:hover": { cursor: "pinter" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) :(
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>  
                                                        <EditOutLinedIcon/>
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                  </Dropzone>
                                </Box>
                            </>
                        )}
                        <TextField
                            label='Email'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{gridColumn:"span 2"}}
                        />
                        <TextField
                            label='Password'
                            type='password'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{gridColumn:"span 2"}}
                        />
                    </Box>
                    {/* Button register or login */}
                    <Box
                    >
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover":{color:palette.primary.main},
                            }}
                        >
                            {isLogin?"LOGIN":"REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color:palette.primary.light,
                                },
                            }}
                        >
                           {isLogin?"Don't have an account? Sign Up here.":"Already have an account? Login here."}
                        </Typography>
                    </Box>
                </form>
          )}
        </Formik>
    )
}