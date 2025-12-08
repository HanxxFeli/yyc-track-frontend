import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthCallback = () => { 
    const [searchParams] = useSearchParams(); // allows reading the URL query parameters
    const navigate = useNavigate();
    const { setAuthFromToken } = useAuth();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => { 
        const handleCallback = async () => { 
            // extract data from url using searchParams
            const token = searchParams.get('token');
            const needsPostalCode = searchParams.get('needsPostalCode') === 'true'; // compare the needsPostalCode and turn it into a boolean

            if (!token) { 
                // If there is no token, something went wrong with the backend handling
                navigate('/login?error=oauth_failed')
                return ;
            }

            // save token to local storage for access (save as authtoken instead of just token)
            localStorage.setItem('authToken', token)

            // update authcontext with the token
            const result = await setAuthFromToken(token)

            if (!result.success) { 
                navigate('/login?error=auth_failed')
                return;
            }

            // redirect the user depending on if they need the postalCode or not
            if (needsPostalCode) { 
                navigate('/complete-profile')
            } else { 
                navigate('/dashboard') // navigate to the authenticated landing page
            }

            setIsProcessing(false);
        }

        handleCallback(); // call the async callback handler

    }, [searchParams, navigate, setAuthFromToken]) // whenever parama ers change or is navigated to a different page, call useEffect

    return (
        <div>
            <p>Completing sign in...</p>
        </div>
    )
} 

export default AuthCallback;