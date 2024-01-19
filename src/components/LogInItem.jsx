import React, { useState } from "react";
import styles from "./LoginItem.module.css";



function LogInItem({ addUser }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username.trim() !== "") {
      addUser(user);
      setUser({
        username: "",
        password: "",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <nav>
      <div className={styles['login-container']}>
        <h2>Log in</h2>
          <form onSubmit={handleSubmit} className={styles['login-form']}>

            <div className={styles['login-input']}>
              <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  data-testid="username"
                  placeholder="Enter your username"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                />
            </div>

            <div className={styles['login-input']}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                data-testid="password" 
                placeholder="Enter your password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
            </div>  
            <div>
              <button type="submit">
                Submit
              </button>
            </div>            
          </form>
      </div>
    </nav>

  );
}

export default LogInItem;
// import React, { useState } from 'react';

// const LoginForm = () => {
//   const [user, setUser] = useState({
//     username: '',
//     password: '',
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (user.username.trim() !== "") {
//       addUser(user);
//       setUser({
//         username: "",
//         password: "",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-black to-gray-800 text-black py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-md mx-auto">
//             <div>
//               <h1 className="text-2xl font-semibold">Login</h1>
//             </div>
//             <div className="divide-y divide-gray-200">
//               <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                 <div className="relative">
//                   <input
//                     autoComplete="off"
//                     id="username"
//                     name="username"
//                     type="text"
//                     className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary"
//                     placeholder="username"
//                     value={user.username}
//                     onChange={handleInputChange}
//                   />
//                   <label
//                     htmlFor="username"
//                     className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Username
//                   </label>
//                 </div>
//                 <div className="relative">
//                   <input
//                     autoComplete="off"
//                     id="password"
//                     name="password"
//                     type="password"
//                     className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary"
//                     placeholder="Password"
//                     value={user.password}
//                     onChange={handleInputChange}
//                   />
//                   <label
//                     htmlFor="password"
//                     className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
//                   >
//                     Password
//                   </label>
//                 </div>
//                 <div className="relative">
//                   <button
//                     className="text-white hover:text-gray-300 px-4 py-2 mx-2 rounded-md transition duration-300 bg-green-700 hover:bg-green-800"
//                     onClick={handleSubmit}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
