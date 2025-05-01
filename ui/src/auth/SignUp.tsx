import { signUp } from '../auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { StyledContainer, StyledTextInput } from './components/StyledComponents';

const SignUp = () => {
    const handleSignUpSubmit = async (formValues: { email: string; password: string }) => {
        try {
            const user = await signUp(formValues.email, formValues.password);
            if (user) {

                console.log(user)
                // navigate
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
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
            console.log(formValues);
            handleSignUpSubmit(formValues);
        },
    });

    return (
        <StyledContainer>
            <h2>Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
                <StyledTextInput label="Email" name="email" description="Enter an email" value={formik.values.email} onChange={formik.handleChange} required id='emailInput' />
                <div>
                    <StyledTextInput label="Password" name="password" value={formik.values.password} onChange={formik.handleChange} required id='passwordInput' />

                </div>
                <button type="submit">Sign Up</button>
            </form>
        </StyledContainer>
    );
};

export default SignUp;