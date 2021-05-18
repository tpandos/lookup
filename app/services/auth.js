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
                "Content-Type": "application/x-www-form-urlencoded",
            }
            
        };

        let skills = [];
        let rank = [];
 
        skills.push(data.skills_1); 
        rank.push(data.rank_1); 
        skills.push(data.skills_2); 
        rank.push(data.rank_2); 
        skills.push(data.skills_3); 
        rank.push(data.rank_3); 

        const form_data = new FormData();

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
            match = /\.(\w+)$/.exec(filename);
            data.type = match ? `image/${match[1]}` : `image`;

            form_data.append("profileImage", {
            uri: data.profileImage,
            name: data.filename, 
            type: data.type
        })
        }
        
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

}

export async function search(userId, data) {
    try {
        let res = await axios.post(`${c.UPDATE_PROFILE}/${userId}/search`, data )
        return res.data;
    
    }
    catch (e) {
        throw handler(e);
    }
}



export async function SearchedProfileUSER(user_Id, data) {

    try {
    
        let res = await axios.post(`${c.SEARCHED_PROFILE}/${user_Id}/profile`, {userId : data}); 
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

export async function deleteFriend(userId, data){
console.log("userID ", userId); 

    try{
 
    let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}/deleteFriend`, {other_userId: data});//<--- deleted friend ID
    return res.data; 

    }catch(e){
        throw handler(e); 
    }
}

export async function response(userId, messId, reqType, reqRes){

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