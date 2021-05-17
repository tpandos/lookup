import axios from 'axios';

import * as c from '../constants';

export async function register(data){
    try{
        let res = await axios.post(c.REGISTER, data);

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function login(data){
    try{
        let res = await axios.post(c.LOGIN, data);

        return res.data;
    }catch (e) {
        throw handler(e);
    }
}
                                                                               
export async function forgotPassword(data) {
    try {
        let res = await axios.post(c.FORGOT_PASSWORD, data);

        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function updateProfile(userId, data){
    try{
        const options = {
            headers: {
                Accept: "application/json",
                // "Content-Type": "multipart/form-data",
                "Content-Type": "application/x-www-form-urlencoded",
            }
            
        };
        //console.log('data==========================', data)

        
        
        let skills = [];
        let rank = [];
        // let i = 1;

         // gotta fixx the loop, this is temporary   
        skills.push(data.skills_1); 
        rank.push(data.rank_1); 
        skills.push(data.skills_2); 
        rank.push(data.rank_2); 
        skills.push(data.skills_3); 
        rank.push(data.rank_3); 

        const form_data = new FormData();
        //console.log('type of form_data', form_data)
        //console.log('data==================')
        //console.log(data)

        // skills = ['python','java'];
        // rank = [34, 67];

        form_data.append("institute", data['institute']);
        form_data.append("major", data['major']);
        form_data.append("role", data['role']);
        form_data.append("username", data['username']);
        form_data.append("grade", data['grade']);
        // object to string before the put
        form_data.append("skills", JSON.stringify(skills));
        form_data.append("rank", JSON.stringify(rank));

        if(data.profileImage[0] !== "h"){

            let filename; 
            let match;
            data.filename = data.profileImage.split('/').pop();
            //console.log("from auuuuuthhhh&***************&&^^^%%^%%%%%%%%%%%%%%%%%%", data.profileImage); 
            match = /\.(\w+)$/.exec(filename);
            data.type = match ? `image/${match[1]}` : `image`;

            form_data.append("profileImage", {
            uri: data.profileImage,
            name: data.filename, 
            type: data.type
        })
        }
        

        
      //  console.log('###  FORMDATA SENT TO DATABASE')
      //  console.log(form_data.username)
        //console.log(userId); 


        let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);

        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export function updateLocation(userId, data) {
    
    axios.put(`${c.UPDATE_PROFILE}/${userId}/updateGeoPoint`, {geoPoint: data})
        .then(response => { /*console.log(response); */})
        .catch(error => { console.log(error.response); });

        //console.log("jammeseeeeey");
        //console.log(data);

}

export async function search(userId, data) {
// const cancelToken = axios.CancelToken;
// const source = cancelToken.source();
    
    // console.log('data=========')
    // console.log(data);


    
    try {
    //    const options = {
    //     headers: {
    //         Accept: "application/json",
    //         //"Content-Type": "multipart/form-data",
    //         "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     body: JSON.stringify({data})
        
    //};  
    
        let res = await axios.post(`${c.UPDATE_PROFILE}/${userId}/search`, data )
        //let res = await axios.post(`${c.UPDATE_PROFILE}/${userId}/search`, data , {cancelToken: source.token})
        return res.data;
    
    }
    catch (e) {
        throw handler(e);
    }
}



export async function SearchedProfileUSER(user_Id, data) {
    
   // console.log('Now you are at the routes searchedProfile function')
  //  console.log('data=========')
 //   console.log(data);
    
 //   const DDD = JSON.stringify(data)
 //   console.log("DDDDDDDD");
 //   console.log(DDD);

    
    try {
    
        let res = await axios.post(`${c.SEARCHED_PROFILE}/${user_Id}/profile`, {userId : data}); 
        // in {userId : data}, "userId" is the name of the param in the req.body.userId in the backend
        // user_Id is the id of the user who makes the search (the state.user)
      //  console.log("res is =============")
     //   console.log(res.data)
        return res.data;
    }
    catch (e) {
        throw handler(e);
    }
}


export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}

 //DELETE FRIEND
// router.put('/:id/deleteFriend', User.deleteFriend);
export async function deleteFriend(userId, data){
console.log("userID ", userId); 
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!! delete friend auth with data", data); 
    try{
        
        console.log("in the try block********************"); 
    let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}/deleteFriend`, {other_userId: data});//<--- deleted friend ID
    return res.data; 

    }catch(e){
        throw handler(e); 
    }
}


// @route POST api/user/{id}/response
// @desc response message from other users
// @access Public
// const userId = req.params.id;
// const request = req.body.request;
// const response = req.body.response;
// const message_id = req.body.message_id;
// only messageid, request type and response
export async function response(userId, messId, reqType, reqRes){

    console.log("data from the response===========AUTH"); 
    console.log("message id", messId); 
    console.log("request type ", reqType);
    console.log("Accept or Ignore  ", reqRes); 
    try{//message, 
        let res = await axios.post(`${c.UPDATE_PROFILE}/${userId}/response`, {request:reqType, response:reqRes, message_id: messId,}); 
        return res.data; 

    }catch(e){
        throw handler(e); 
    }

}

export async function sendRequest(userId, reciever_id, req){

    try{
        let res = await axios.post(`${c.UPDATE_PROFILE}/${userId}/sendRequest`, {to_userId: reciever_id , request:req}); 
        return res.data; 

    }catch(e){
        throw handler(e); 
    }

}