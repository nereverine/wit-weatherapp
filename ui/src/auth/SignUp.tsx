import { signUp, login } from '../auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { StyledContainer, StyledTextInput } from './components/StyledComponents';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUp = () => {
    const navigate = useNavigate();
    const [onLoginPage, setOnLoginPage] = useState<boolean>(true);

    const handleFormSubmit = async (formValues: { email: string; password: string }) => {
        if (!onLoginPage) {
            try {
                const user = await signUp(formValues.email, formValues.password);
                if (user) {
                    navigate('/dashboard')
                }
            } catch (error) {
                console.error("Error signingup:", error);
            }
        } else {
            try {
                const user = await login(formValues.email, formValues.password);
                if (user) {
                    navigate('/dashboard')
                }
            } catch (error) {
                console.error("Error loggingin", error)
            }
        }
    };

    const signUpValidationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 charactesr'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: signUpValidationSchema,
        onSubmit: (formValues) => {
            handleFormSubmit(formValues);
        },
    });

    return (
        <StyledContainer>
            <h2>{onLoginPage ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={formik.handleSubmit}>
                <StyledTextInput label="Email" name="email" placeholder='Enter an email' value={formik.values.email} onChange={formik.handleChange} required id='emailInput' />
                {formik.touched.email && formik.errors.email && (
                    <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.email}</div>
                )}
                <StyledTextInput label="Password" name="password" value={formik.values.password} onChange={formik.handleChange} required id='passwordInput' type='password' />
                {formik.touched.password && formik.errors.password && (
                    <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.password}</div>
                )}
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                    <span> {onLoginPage ? 'Dont have an account yet?' : 'Already registered?'} </span>
                    <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setOnLoginPage(!onLoginPage)}>{onLoginPage ? 'Sign Up' : 'Login'}</span>
                </div>
                <button style={{ marginTop: '10px', color: 'gray' }} type="submit">{onLoginPage ? 'Login' : 'Sign Up'}</button>
            </form>
        </StyledContainer>
    );
};

export default SignUp;