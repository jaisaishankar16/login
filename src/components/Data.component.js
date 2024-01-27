// import React, { useState, useEffect } from 'react';
// import './Data.css'

// // User Profile Component
// const UserProfile = ({ user, onEdit }) => (
//   <div className='profile'>
//     <h2>Username: {user.username}</h2>
//     <p>Email: {user.email}</p>
//     <button onClick={() => onEdit(user)}>Edit</button>
//   </div>
// );

// // Edit Profile Component
// const EditProfile = ({ user, onUpdate }) => {
//   const [username, setUsername] = useState(user.username);
//   const [email, setEmail] = useState(user.email);

//   const handleSubmit = () => {
//     onUpdate({ ...user, username, email });
//   };

//   return (
//     <div>
//       <input value={username} onChange={(e) => setUsername(e.target.value)} />
//       <input value={email} onChange={(e) => setEmail(e.target.value)} />
//       <button onClick={handleSubmit}>Update</button>
//     </div>
//   );
// };

// // User Dashboard Component
// const UserDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/users') // Update the URL accordingly
//       .then((response) => response.json())
//       .then((data) => setUsers(data))
//       .catch((error) => console.error('Error fetching users:', error));
//   }, []);

//   const handleEdit = (user) => {
//     setSelectedUser(user);
//   };

//   const handleUpdate = (updatedUser) => {
//     // Update user logic here
//     setSelectedUser(null);
//   };

//   return (
//     <div>
//       {selectedUser ? (
//         <EditProfile user={selectedUser} onUpdate={handleUpdate} />
//       ) : (
//         users.map((user) => (
//           <UserProfile key={user.id} user={user} onEdit={handleEdit} />
//         ))
//       )}
//     </div>
//   );
// };

// // Usage
// const Data = () => <div className='margin'> <UserDashboard /> </div>;

// export default Data;

// Frontend (React)

import React, { useState, useEffect } from 'react';
import './Data.css';

const UserProfile = ({ user, onEdit }) => (
  <div className='profile'>
    <h2>Username: {user.username}</h2>
    <p>Email: {user.email}</p>
    <button onClick={() => onEdit(user)}>Edit</button>
  </div>
);

const EditProfile = ({ user, onUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = async () => {
    // Call the backend to update user data in MySQL
    const response = await fetch('http://localhost:5000/api/updateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        username,
        email,
      }),
    });

    const data = await response.json();
    console.log(data.message);

    // Trigger the local update
    onUpdate({ ...user, username, email });
  };

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleUpdate = (updatedUser) => {
    // Update user logic here
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  return (
    <div>
      {selectedUser ? (
        <EditProfile user={selectedUser} onUpdate={handleUpdate} />
      ) : (
        users.map((user) => (
          <UserProfile key={user.id} user={user} onEdit={handleEdit} />
        ))
      )}
    </div>
  );
};

const Data = () => <div className='margin'> <UserDashboard /> </div>;

export default Data;
