import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import './App.css';
import AddCustomer from './components/AddCustomer';
import { toast } from 'react-toastify';
import { useState } from 'react';
//import { getUsers } from './api';
import { deleteUser  } from './api/userApi';





const getUsers = async () => {
  let res = await fetch('http://localhost:3200/user_list');
  res = await res.json();
  return (res.result);
}
function App() {

   const [userId,setUserId]=useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: getUsers,
  })
  //console.log(data);

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    mutationKey: ['deleteUser'],
    onSuccess: (data) => {
      toast.success('User Deleted Succesfully!');
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      toast.error('User Not Deleted!')
    }
  })

  const handleDeleteUser = (id) => {
    deleteMutation.mutate(id);
  }

  const handleEditUser = (id) =>{
        setUserId(id);
  }
  
  
  if (isLoading) return <h2>Loding....</h2>
  if (error) return <h2>Error</h2>

  return (
    <div>
      <h2>Using tank Query in React </h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.map((item, index) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.number}</td>
                <td>{item.gender == '1' ? 'Male' : 'Female'}</td>
                <td>
                  <button onClick={() =>handleEditUser(item._id) }>edit</button>    
                  <button onClick={() => handleDeleteUser(item._id)}>delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <hr />
      <AddCustomer id={userId} />
    </div>

  );
}

export default App
