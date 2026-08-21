export const addUser = async(data) =>{
    //console.log('api Data',data)
    let response= await fetch('http://localhost:3200/add_customer',{
        method:'post',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    });
    response = await response.json();
    console.log(response);
    if(response.success){
        return(response.result);
    }else{
        throw new Error('Faild to add User');
    }
}

export const updateUser= async({data,id})=>{

    let response = await fetch(`http://localhost:3200/update_customer/${id}`,{
       method:'put',
       body:JSON.stringify(data),
       headers:{
        'Content-Type':'application/json'
       }
    })
    response =await response.json();     
    if(response.success){
        return(response.result);   
    }else{
        throw new Error('Faild to update user');
    }
}

export const deleteUser= async(id)=>{
    // alert
    let response = await fetch(`http://localhost:3200/user_delete/${id}`,{
       method:'delete',
    })
    response =await response.json();
    if(response.success){
        return(response.result);    
    }else{
        throw new Error('Faild to update user');
    }
}

export const userDetails= async(id)=>{
    // alert
    let response = await fetch(`http://localhost:3200/user_details/${id}`)
    response =await response.json();
    if(response.success){
        return(response.result);        
    }else{
        throw new Error('Faild to Edit user');
    }
}

