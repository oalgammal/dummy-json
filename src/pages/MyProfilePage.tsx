import React, { useContext } from 'react'
import MyProfile from '../components/MyProfile'
import { AuthContext } from '../helpers/AuthProvider'



function MyProfilePage() {
    const {isLoggedIn}= useContext(AuthContext)

    return (
        <>
       {isLoggedIn?
        <MyProfile/>:<h1>Please login first</h1>
       }
        </>
    )
}

export default MyProfilePage
