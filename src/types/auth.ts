export interface AuthFormProps {
  type: 'login' | 'register';
}

export interface FormData {
  username?: string;
  email?: string;
  password: string;
  credentials?: string;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}
