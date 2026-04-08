import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const SigninCard = ({
    signinForm,
    setSigninForm,
    onSigninFormSubmit,
    validationError,
    error,
    isSuccess,
    isPending
}) => {

    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
    };

    return (
        <Card classname="w-full h-full">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Sign in to access your account</CardDescription>

                {validationError && (
                    <div className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                        <TriangleAlert className='size-5' />
                        <p>{validationError.message}</p>
                    </div>
                )}

                {error && (
                    <div className='bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                        <TriangleAlert className='size-5' />
                        <p>{error.message}</p>
                    </div>
                )}

                {isSuccess && (
                    <div className='bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary mb-5'>
                        <FaCheck className='size-5' />
                        <p>
                            Successfully signed in. You will be redirected to the home page in a few seconds.
                            <LucideLoader2 className="animate-spin ml-2" />
                        </p>
                    </div>
                )}
            </CardHeader>

            <CardContent>
                <form className='space-y-3' onSubmit={onSigninFormSubmit}>
                    <Input
                        disabled={isPending}
                        placeholder="Email"
                        required
                        type="email"
                        value={signinForm.email}
                        onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
                    />
                    <Input
                        disabled={isPending}
                        placeholder="Password"
                        required
                        type="password"
                        value={signinForm.password}
                        onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
                    />
                    <Button className="w-full" disabled={isPending} size="lg" type="submit">
                        Continue
                    </Button>
                </form>

                <Separator className='my-5' />

                {/* ✅ Google OAuth Button */}
                <button
                    type='button'
                    onClick={handleGoogleSignIn}
                    className='flex items-center justify-center gap-3 w-full border border-gray-200 rounded-md px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm font-medium mb-4'
                >
                    <img
                        src="https://cdn.simpleicons.org/google"
                        className='size-4'
                        alt="Google"
                        width={16}
                        height={16}
                    />
                    Continue with Google
                </button>

                <p className='text-s text-muted-foreground mt-4'>
                    Donot have an account?{' '}
                    <span
                        className='text-sky-600 hover:underline cursor-pointer'
                        onClick={() => navigate('/auth/signup')}
                    >
                        Sign Up
                    </span>
                </p>
            </CardContent>
        </Card>
    );
};