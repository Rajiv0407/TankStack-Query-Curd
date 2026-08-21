import { useMutation, useQueryClient,useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { addUser, updateUser , userDetails } from '../api/userApi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';



function AddCustomer({ id }) {

  const queryClient = useQueryClient();
  const isEditMode = Boolean(id);

  const [userdata, setUserData] = useState({ name: '', email: '', number: '', gender: '' });
   
    const addUserData = useMutation({
      mutationKey: ['addUser'],
      mutationFn: addUser,
      onSuccess: (data) => {
        toast.success('User Added Successfully!')
        setUserData({
          name: "",
          email: "",
          number: "",
          gender: "",
        })
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  

   const {
            data: user,
            isLoading,
            isError,
            error,
        } = useQuery({
            queryKey: ["user", id],
            queryFn: () => userDetails(id),
            // Important:
            // Don't call API when adding
            enabled: isEditMode,

          });
          useEffect(() => {

            if (user) {
             //console.log(user);
              setUserData({
                name: user.name || "",
                email: user.email || "",
                number: user.number || "",
                gender: user.gender || "",
              });

            }

          }, [user]);


  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      toast.success(
        "User updated successfully!"
      );
      setUserData({
          name: "",
          email: "",
          number: "",
          gender: "",
        })
      // Refresh user list
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      // Refresh current user
      queryClient.invalidateQueries({
        queryKey: ["user", id],
      });

    },
    onError: (error) => {
      toast.error(
        error.message || "Failed to update user"
      );

    },

  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if(isEditMode){
      updateMutation.mutate({
        id:id,
        data:userdata,
      })

    }else{
      addUserData.mutate(userdata);
    }
       
  }
   const isSaving= addUserData.isPending || updateMutation.isPending;

  return (
    <div>
      <h1>{isEditMode ? 'Update Customer' :'Add Customer'}</h1>
      <form onSubmit={handleAddUser}>
        <input type='text' value={userdata.name} onChange={(e) => setUserData({ ...userdata, name: e.target.value })} name='name' placeholder='Enter Name' /><br /><br />
        <input type='text' value={userdata.email} onChange={(e) => setUserData({ ...userdata, email: e.target.value })} name='email' placeholder='Enter Email' /><br /><br />
        <input type='text' value={userdata.number} onChange={(e) => setUserData({ ...userdata, number: e.target.value })} name='number' placeholder='Enter Number' /><br /><br />
        <select value={userdata.gender} onChange={(e) => setUserData({ ...userdata, gender: e.target.value })}>
          <option value={""}>Select Gender</option>
          <option value={"1"}>Male</option>
          <option value={"2"}>Female</option>
        </select><br /><br />
        <button type='submit' disabled={isSaving}>{addUserData.isPending ? 'Saving...' : 'Submit'}</button>
      </form>
    </div>
  )
}

export default AddCustomer
