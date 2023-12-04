// Some State Veriables
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// Binding the values of the inputs to the state variables below

const LoginPage = () => {

    // E-Mail and Password state to keep track
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.meesage);
        }
    }

    return (
        <>
            <h1>Log In</h1>
            {error && <p className='error'>{error}</p>}
            <input
                placeholder='Your email address'
                value={email}
                onChange={e => setEmail(e.target.value)} />
            <input type="password"
                placeholder='Your password'
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <button onClick={logIn}>Log In</button>
            <Link to="/create-account">Don't have an account? Create one here</Link>
        </>

    );
}

export default LoginPage;