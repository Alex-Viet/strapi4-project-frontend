import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/',
  }),
  tagTypes: ['Products', 'Cart'],
  endpoints: (builder) => ({
    // sign up
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/local/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // auth
    login: builder.mutation({
      query: (credentials: { identifier: string; password: string }) => ({
        url: 'auth/local',
        method: 'POST',
        body: credentials,
      }),
    }),

    // get all products
    // getProducts: builder.query({
    //   query: () => 'products',
    //   providesTags: ['Products'],
    // }),

    // get product by ID
    // getProductById: builder.query({
    //   query: (id: string) => `products/${id}`,
    //   providesTags: (result, error, id) => [{ type: 'Products', id }],
    // }),

    // get cart
    // getCart: builder.query({
    //   query: (userId: string) => `users/${userId}/cart`,
    //   providesTags: ['Cart'],
    // }),

    // update cart
    // updateCart: builder.mutation({
    //   query: ({ userId, cartData }: { userId: string; cartData: unknown }) => ({
    //     url: `users/${userId}/cart`,
    //     method: 'PUT',
    //     body: cartData,
    //   }),
    //   invalidatesTags: ['Cart'],
    // }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  // useGetProductsQuery,
  // useGetProductByIdQuery,
  // useGetCartQuery,
  // useUpdateCartMutation,
} = apiSlice;
