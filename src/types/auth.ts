export interface AuthFormProps {
  type: 'login' | 'register';
}

export interface FormData {
  username?: string;
  email: string;
  password: string;
}
