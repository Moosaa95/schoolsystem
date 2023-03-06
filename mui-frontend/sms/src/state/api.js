import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8000", 
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        console.log("HEADER", getState(), 'popop');
        const token = getState().auth.token 
        // if (token) {
        //     console.log('trueer');
        //     headers.set("authorisation", `Bearer ${token}`)
        // }
        // return headers
    }
})

// a werapper incase basequery fails
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    // console.log("🚀 ~ file: api.js:21 ~ baseQueryWithReauth ~ result", result, 'end result')
    // console.log(result?.data["token"], 'RESSSSSULT');

    if (result?.error?.originalStatus === 403){
        console.log("sendign freah token")
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult, 'result')
        if (refreshResult?.data){
            const user = api.getState().auth.user 
            // store the new token
            api.dispatch(setCredentials({...refreshResult.data, user}))
            // retry the origin query with new access token

            result = await baseQuery(args, api, extraOptions)

        }else{
            api.dispatch(logOut())
        }
    }
    return result
}

export const api = createApi({
    baseQuery: baseQueryWithReauth, 
    endpoints: builder => ({})
})





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

// export const {
//     useGetTeachersQuery,
//     useTotalTeacherQuery,
//     useGetParentsQuery,
//     useGetStudentsQuery,
//     useGetClassesQuery,

//     useAddUserMutation,
//     useUpdateTeacherMutation,
//     useAddClassMutation,
    
// } = api 