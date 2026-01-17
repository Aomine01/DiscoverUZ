import { AuthLayout } from '@/components/auth/auth-layout';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join the Official National Tourism Platform of Uzbekistan"
        >
            <SignupForm />
        </AuthLayout>
    );
}
