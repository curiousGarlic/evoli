import React from 'react';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.scss';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: '', password: '' })
        } catch (error) {
            console.log(error)
        }

    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value })
    };

    render() {
        const { email, password } = this.state;
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={email}
                        label='email'
                        handleChange={this.handleChange}
                        required />
                    <FormInput 
                        name='password' 
                        type='password' 
                        value={password}
                        label='password'
                        handleChange={this.handleChange}
                        required 
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>via Google</CustomButton>
                    </div>   
                </form>
            </div>
        );
    }
}

export default SignIn;

