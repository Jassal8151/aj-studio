import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoLockClosedOutline, IoPersonOutline, IoEyeOutline, IoEyeOffOutline, IoCameraOutline } from 'react-icons/io5';
import SEO from '../../components/common/SEO';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const res = await login(data);
    if (res.success) {
      toast.success('Admin login successful!');
      navigate('/admin/dashboard');
    } else {
      toast.error(res.message || 'Invalid admin credentials');
    }
  };

  const autofillSeedAdmin = () => {
    setValue('username', 'admin@ajstudio.com');
    setValue('password', 'admin123456');
    toast.success('Autofilled default admin credentials');
  };

  return (
    <>
      <SEO title="Admin Portal Authentication | AJ Studio" />

      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-neutral-900/80 border border-neutral-800 rounded-2xl p-8 shadow-2xl relative z-10 space-y-6">
          {/* Header Branding */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center text-amber-400">
                  <IoCameraOutline className="w-6 h-6" />
                </div>
              </div>
            </Link>
            <h1 className="text-2xl font-bold uppercase text-white tracking-wider">
              Admin Access <span className="gold-gradient-text">Portal</span>
            </h1>
            <p className="text-xs text-neutral-400">
              Sign in with administrative privileges to manage portfolio content.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Username or Email"
              icon={IoPersonOutline}
              required
              placeholder="admin@ajstudio.com"
              error={errors.username?.message}
              {...register('username', { required: 'Username is required' })}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                icon={IoLockClosedOutline}
                required
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password', { required: 'Password is required' })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-8 right-3 text-neutral-400 hover:text-white"
              >
                {showPassword ? <IoEyeOffOutline className="w-4 h-4" /> : <IoEyeOutline className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
            >
              Sign In To Dashboard
            </Button>
          </form>

          {/* Quick Helper */}
          <div className="pt-4 border-t border-neutral-800 text-center space-y-2">
            <p className="text-[11px] text-neutral-500">
              Need default test credentials? Click below to autofill:
            </p>
            <button
              type="button"
              onClick={autofillSeedAdmin}
              className="text-xs font-semibold uppercase tracking-wider text-amber-400 hover:underline cursor-pointer"
            >
              Autofill Seed Credentials (admin@ajstudio.com)
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
