import { AuthLayout } from '@/components/auth/auth-layout';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
    return (
        <AuthLayout
            title="Login to DiscoverUz"
            subtitle="Official National Tourism Platform of Uzbekistan"
        >
            <LoginForm />
        </AuthLayout>
    );
}
