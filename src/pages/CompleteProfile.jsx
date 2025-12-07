// PAGE WHERE THE USER WILL BE ASKED THE POSTAL CODE AFTER OAUTH LOGIN
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CompleteProfile = () => { 
    const [postalCode, setPostalCode] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault()
        setError('')
        setLoading(true)

        try { 
            // acquire token from local storage 
            const token = localStorage.getItem('token') 

            // ask user to login again if the token is not acquired
            if (!token) { 
                setError('Authentication token not found. Please sign in again')
                navigate('/login')
                return;
            }

            // call the backend to complete and update the user profile
            const response = await fetch('http://localhost:5000/api/auth/complete-profile', { 
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ postalCode})
            });

            // get and convert the data from response
            const data = await response.json(); // convert response into an object

            // payload will contain a success and message field so get the value from those 
            if (data.success) { 
                navigate('/dashboard')
            } else { 
                setError(data.message || 'Failed to update profile. Please try again')
            }

        }
        catch (error) { 
            setError('Failed to update profile')
        }
        finally { 
            setLoading(false)
        }
    }

    return ( 
        <div>
            <h2>Complete Your Profile</h2>
            <p>One more step! Please provide your postal code.</p>
            
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Postal Code (e.g., T2P1J9)"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                />
                
                <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Complete Profile'}
                </button>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )
}

export default CompleteProfile;