export const getUsers=async()=>{
    const data=await fetch('http://localhost:3200/user_list');
    return await data.json();   
}

