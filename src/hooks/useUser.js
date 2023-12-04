// Idea of the hook is immediate access to the user object 
// Check if the user is logged in
// const user = useUser();
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            setIsLoading(false);
        });
        return unsubscribe;
    }, [])
    return { user, isLoading };
}

export default useUser;
