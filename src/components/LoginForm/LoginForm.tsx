import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from 'src/api/Login.api';
import Logo from 'src/assets/bk-logo.png';
import useAuth from 'src/hooks/useAuth';
import { showNotification } from '../Notification/Notification';

type FormDataType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { setIsAuthenticated, setToken, setUser, setRole } = useAuth();
  const form = useForm<FormDataType>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

  const loginMutation = useMutation({
    mutationFn: login,
    onMutate: () => {
      setLoading(true);
    }
  });

  const onSubmit = (data: FormDataType) => {
    const result = loginMutation.mutateAsync(data);

    result
      .then((res) => {
        if (res.data) {
          setIsAuthenticated(true);
          setToken(res.data.token);
          window.localStorage.setItem('token', res.data.token);
          setUser(res.data.user);
          res.data.user.role === 'admin' ? setRole('admin') : setRole('user');
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        showNotification(error.response.data.message, 'error');
        setLoading(false);
      });
  };

  return (
    <div className='lg:w-2/6 md:w-1/2 bg-gray-50 rounded-lg p-8 flex flex-col md:ml-10 w-full mt-10 md:mt-0'>
      <div className='mb-10'>
        <Link to='/' className='flex justify-center'>
          <img alt='' className='w-20' src={Logo} />
        </Link>
        <h2 className='mt-6 text-center text-3xl font-bold text-gray-900'>Đăng Nhập</h2>
        <p className='text-center text-sm text-gray-600 mt-5'>
          Bạn không có tài khoản? Hãy{' '}
          <Link to='https://forms.gle/rr6XwNQEbHzo96PXA' className='font-medium text-soft hover:opacity-80'>
            làm bài test
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className='relative mb-4'>
        <div className='mb-4'>
          <label htmlFor='email' className='input input-bordered mb-2 flex items-center gap-2'>
            Email
            <input
              type='text'
              id='email'
              {...register('email', {
                required: 'Email không được để trống',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@hcmut.edu.vn$/i,
                  message: 'Email phải là email của trường HCMUT'
                }
              })}
              className='grow'
              placeholder='example@hcmut.edu.vn'
              defaultValue='demo@hcmut.edu.vn'
            />
          </label>
          {errors.email && <p className='text-red-500 text-sm mb-4'>{errors.email.message}</p>}
        </div>

        <div className='mb-4'>
          <label className='input input-bordered mb-1 flex items-center gap-2'>
            Password
            <input
              id='password'
              {...register('password', {
                required: 'Password không được để trống',
                minLength: {
                  value: 6,
                  message: 'Password phải có ít nhất 6 ký tự'
                }
              })}
              type='password'
              className='grow'
              placeholder='******'
              defaultValue='Password123'
            />
          </label>
          {errors.password && <p className='text-red-500 text-sm mb-4'>{errors.password.message}</p>}
        </div>

        {loading ? (
          <button
            type='submit'
            className='text-white bg-soft border-0 py-2 px-8 w-full flex items-center justify-center focus:outline-none hover:opacity-80 rounded text-lg'
          >
            <div className='border-gray-300 h-6 w-6 animate-spin rounded-full border-2 border-t-blue-600' />
          </button>
        ) : (
          <button
            type='submit'
            className='text-white bg-soft border-0 py-2 px-8 w-full focus:outline-none hover:opacity-80 rounded text-lg'
          >
            Đăng Nhập
          </button>
        )}
      </form>
    </div>
  );
}
