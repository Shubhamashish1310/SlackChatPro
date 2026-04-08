import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { useAuth } from '@/hooks/context/useAuth';
import { useToast } from '@/hooks/use-toast';
import axios from '@/config/axiosConfig';

export const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        if (error) {
            toast({ title: 'Sign in failed', variant: 'destructive' });
            navigate('/auth/signin');
            return;
        }

        if (token) {
            const completeLogin = async () => {
                try {
                    localStorage.setItem('token', token);

                    // ✅ Use x-access-token header like your middleware expects
                    const response = await axios.get('/users/me', {
    headers: { 
        'x-access-token': token  // ✅ matches authenticateUser middleware
    }
});

                    const user = response.data.data;
                    const userObject = { ...user, token };

                    localStorage.setItem('user', JSON.stringify(userObject));
                    setAuth({ token, user: userObject, loading: false });

                    toast({ title: 'Successfully signed in with Google! 🎉' });
                    navigate('/home');

                } catch (err) {
                    console.error('Failed to fetch user', err);
                    // Fallback — decode JWT for basic info
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const userObject = { _id: payload._id, token };
                    localStorage.setItem('user', JSON.stringify(userObject));
                    setAuth({ token, user: userObject, loading: false });
                    navigate('/home');
                }
            };

            completeLogin();
        } else {
            navigate('/auth/signin');
        }
    }, []);

    return (
        <div className='h-screen flex items-center justify-center bg-slack'>
            <div className='flex flex-col items-center gap-3'>
                <Loader2Icon className='size-8 animate-spin text-muted-foreground' />
                <p className='text-sm text-muted-foreground'>
                    Signing you in with Google...
                </p>
            </div>
        </div>
    );
};