import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import NotFoundPage from '../pages/404-page/NotFoundPage';
import LoginPage from '../pages/login-page/LoginPage';
import ProductCatalogPage from '../pages/product-catalog-page/ProductCatalogPage';
import RegistrationPage from '../pages/registration-page/RegistrationPage';
import ShoppingCartPage from '../pages/shopping-cart-page/ShoppingCartPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
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
    path: '/catalog',
    element: <ProductCatalogPage />,
  },
  {
    path: '/cart',
    element: <ShoppingCartPage />,
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
