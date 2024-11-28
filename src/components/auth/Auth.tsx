import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import styles from './style/Auth.module.scss';

interface AuthFormProps {
  type: 'login' | 'register';
}

interface FormData {
  username?: string;
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const validationSchema = Yup.object().shape({
    username:
      type === 'register'
        ? Yup.string().required('Enter your username')
        : Yup.string(),
    email: Yup.string()
      .email('Enter correct email')
      .required('Enter your email'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Enter your password'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(`${type === 'login' ? 'Login' : 'Sign up'} data:`, data);
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
              {...register('username')}
              className={errors.username ? styles.inputError : ''}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
          </div>
        )}
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={errors.email ? styles.inputError : ''}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={errors.password ? styles.inputError : ''}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          {type === 'login' ? 'Sign in' : 'Sign up'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
