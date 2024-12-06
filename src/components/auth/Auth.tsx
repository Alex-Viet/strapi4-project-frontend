import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../features/api/apiSlice';
import { useAuth } from '../../hooks/useAuth';
import { AuthFormProps, FormData } from '../../types/auth';
import styles from './style/Auth.module.scss';

interface ApiErrorResponse {
  error?: { message?: string; status?: number };
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [register, { isLoading, error, isError, data }] = useRegisterMutation();
  const [
    login,
    {
      isLoading: isLoginLoading,
      error: loginError,
      isError: isLoginError,
      data: loginData,
    },
  ] = useLoginMutation();

  const navigate = useNavigate();
  const { setToken } = useAuth();

  // Check jwt and navigate to main page
  useEffect(() => {
    const jwt = data?.jwt || loginData?.jwt;
    if (jwt) {
      navigate('/');
      setToken(jwt);
    }
  }, [data, loginData, navigate, setToken]);

  //handle api errors
  const errorData =
    ((error as FetchBaseQueryError)?.data as ApiErrorResponse) ||
    ((loginError as FetchBaseQueryError)?.data as ApiErrorResponse);
  const errorMessage = errorData?.error?.message;

  // form validation
  const validationSchema = Yup.object().shape({
    credentials: Yup.string(),
    username:
      type === 'register'
        ? Yup.string()
            .required('Enter your username')
            .min(3, 'Username must be at least 3 characters')
        : Yup.string(),
    email:
      type === 'register'
        ? Yup.string().email('Enter correct email').required('Enter your email')
        : Yup.string(),
    password: Yup.string()
      .required('Enter your password')
      .min(6, 'Password must be at least 6 characters'),
  });

  const {
    register: reg,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  // submit form handler
  const onSubmit: SubmitHandler<FormData> = (userData) => {
    if (type === 'login') {
      const { credentials, password } = userData;
      login({ identifier: credentials!, password });
    } else {
      register(userData);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {type === 'login' ? 'Sign in' : 'Sign up'}
      </h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {type === 'register' && (
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              {...reg('username')}
              className={errors.username ? styles.inputError : ''}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
          </div>
        )}
        <div className={styles.inputGroup}>
          <label htmlFor={type === 'register' ? 'email' : 'credentials'}>
            Email{type === 'login' && ' / Username'}
          </label>
          {type === 'register' ? (
            <input
              id="email"
              type="email"
              {...reg('email')}
              className={errors.email && styles.inputError}
            />
          ) : (
            <input id="credentials" type="text" {...reg('credentials')} />
          )}
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...reg('password')}
            className={errors.password ? styles.inputError : ''}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        {(isError || isLoginError) && (
          <p className={styles.error}>{errorMessage}</p>
        )}
        <button
          type="submit"
          className={`${styles.submitButton} ${isLoading || isLoginLoading ? styles.notActive : ''}`}
          disabled={isLoading || isLoginLoading}
        >
          {type === 'login' ? 'Sign in' : 'Sign up'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
