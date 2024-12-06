import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import ProtectedRoute from '../components/protected-route/ProtectedRoute';
import { useAuthContext } from '../hooks/useAuthContext';
import NotFoundPage from '../pages/404-page/NotFoundPage';
import LoginPage from '../pages/login-page/LoginPage';
import ProductCatalogPage from '../pages/product-catalog-page/ProductCatalogPage';
import RegistrationPage from '../pages/registration-page/RegistrationPage';
import ShoppingCartPage from '../pages/shopping-cart-page/ShoppingCartPage';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ProductCatalogPage />
        </ProtectedRoute>
      ),
      errorElement: <NotFoundPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/sign-up',
      element: <RegistrationPage />,
    },
    {
      path: '/cart',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ShoppingCartPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
