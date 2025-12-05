import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthCallback = () => { 
    const [searchParams] = useSearchParams(); // allows reading the URL query parameters
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        // extract data from url using searchParams
        const token = searchParams.get('token');
        const needsPostalCode = searchParams.get('needsPostalCode') === 'true'; // compare the needsPostalCode and turn it into a boolean

        if (!token) { 
            // If there is no token, something went wrong with the backend handling
            navigate('/login?error=oauth_failed')
            return ;
        }

        // save token to local storage for access
        localStorage.setItem('token', token)

        // redirect the user depending on if they need the postalCode or not
        if (needsPostalCode) { 
            navigate('/complete-profile')
        } else { 
            navigate('/dashboard') // navigate to the authenticated landing page
        }
    }, [searchParams, navigate]) // whenever parama ers change or is navigated to a different page, call useEffect

    return (
        <div>
            <p>Completing sign in...</p>
        </div>
    )
} 

export default AuthCallback;