import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./Login.css"
import fetcher from '../../helpers/fetcher';
import { AuthContext } from '../../helpers/AuthProvider';



const Login: React.FC = () => {
  const initialUser = {
    username: "",
    password: "",
  }
  const [user, setUser] = useState<UserLoginData>(initialUser);
  const { setAuthData, isLoggedIn } = useContext(AuthContext);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value } as UserLoginData);
  };

  
  const handleLogout=async ()=>{
    setAuthData("",false)
    setUser(initialUser)
    }
    
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = await fetcher('auth/login','POST',user)
      if(data.token && data.token.length>0){
        setAuthData(data.token,true)
        setUser(initialUser)
    }
  };

  return (
    <>
    
    {!isLoggedIn?<form className='UserForm' onSubmit={handleSubmit}>
      <div className='Container'>
      <h3>Personal info</h3>
      <div className='Gridder'>
      <label>
        Username:
        <input type="text" name="username" value={user.username} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={user.password} onChange={handleChange} required />
      </label>
    
          </div>
          </div>
    
    
      <button type="submit">Login</button>
      
    </form>:<button onClick={handleLogout}>LogOut</button>}
    </>
  );
};

export default Login;
