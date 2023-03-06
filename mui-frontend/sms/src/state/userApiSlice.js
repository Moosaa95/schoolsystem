// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { api } from "./api";

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => "/account/list_teachers",
      providesTags: ["User"],
    }),
    getStudents: builder.query({
      query: () => "/account/list_students",
      providesTags: ["User"],
    }),
    getParents: builder.query({
      query: () => "/account/list_parents",
      providesTags: ["User"],
    }),
    getClasses: builder.query({
      query: () => "/account/list_classes",
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (user) => `/account/get_user?username=${user}`,
        // method: "POST",
    }),
    // Parents Getter
    totalTeacher: builder.query({
      query: () => "/account/total_teacher",
      providesTags: ["Parents"],
    }),
    addUser: builder.mutation({
      query: (payload) => ({
        url: "/account/register_user",
        method: "POST",
        body: payload,
        headers: {
            'Content-type' : 'application/json; charset=UTF-8'
        },
      }),
      invalidatesTags: ["User"],
    }),
    addClass: builder.mutation({
      query: (payload) => ({
        url: "/account/add_class",
        method: "POST",
        body: payload,
        // headers: {
        //     'Content-type' : 'application/json; charset=UTF-8'
        // },
      }),
      invalidatesTags: ["User"],
    }),
    updateTeacher: builder.mutation({
      query: ({ username, ...payload }) => ({
        url: `/users/teacher/update/${username}/`,
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    // getUser: builder.mutation({
    //   query: (payload) => ({
    //     url: `/account/get_user/`,
    //     method: "POST",
    //     body: payload,
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //   }),
    // }),
  }),
});

// export const api = createApi({
//     baseQuery : fetchBaseQuery({baseUrl:"http://localhost:8000",
//     credentials: 'include',
//     // prepareHeaders: (headers, {getState})
// }),
//     reducerPath: "SMSApi",
//     tagTypes : ["User"],
//     endpoints : (build) => ({
//         getTeachers:build.query({
//             query: () => "/account/list_teachers",
//             providesTags: ["User"]
//         }),
//         getStudents:build.query({
//             query: () => "/account/list_students",
//             providesTags: ["User"]
//         }),
//         getParents:build.query({
//             query: () => "/account/list_parents",
//             providesTags: ["User"]
//         }),
//         getClasses:build.query({
//             query: () => "/account/list_classes",
//             providesTags: ["User"]
//         }),
//         // Parents Getter
//         totalTeacher:build.query({
//             query : () => "/account/total_teacher",
//             providesTags: ["Parents"]
//         }),
//         addUser : build.mutation({
//             query : (payload) => ({
//                 url : '/account/register_user',
//                 method : 'POST',
//                 body : payload,
//                 // headers: {
//                 //     'Content-type' : 'application/json; charset=UTF-8'
//                 // },
//             }),
//             invalidatesTags: ["User"]
//         }),
//         addClass : build.mutation({
//             query : (payload) => ({
//                 url : '/account/add_class',
//                 method : 'POST',
//                 body : payload,
//                 // headers: {
//                 //     'Content-type' : 'application/json; charset=UTF-8'
//                 // },
//             }),
//             invalidatesTags: ["User"]
//         }),
//         updateTeacher: build.mutation({
//             query : ({username, ...payload}) => ({
//                 url : `/users/teacher/update/${username}/`,
//                 method : 'POST',
//                 body : payload,
//                 headers: {
//                     'Content-type' : 'application/json; charset=UTF-8'
//                 },
//             })
//         })
//     })
// })

export const {
  useGetTeachersQuery,
  useTotalTeacherQuery,
  useGetParentsQuery,
  useGetStudentsQuery,
  useGetClassesQuery,
  useGetUserQuery,

  useAddUserMutation,
  useUpdateTeacherMutation,
  useAddClassMutation,
  // useGetUserMutation,
} = userApiSlice;
