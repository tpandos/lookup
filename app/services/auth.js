import axios from 'axios';
import { useEffect } from 'react';

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
        console.log('data==========================', data)

        
        
        let skills = [];
        let rank = [];
        // let i = 1;

   

        // for (let key in data) {
        //     console.log('key', key)
        //     if (i > 3) return;
        //     if (key == `skills_${i}`) {
        //         for (let key_2 in data) {
        //             if (key_2 == `rank_${i}`) {
        //                 // console.log('find it ===============')
        //                // console.log('value', data[key])
        //                 skills.push(data[key])
        //                 rank.push(data[key_2])   
        //             }
        //            // console.log('key_2', key_2)
        //         }
        //         delete data.skills_1
        //         delete data.rank_1
        //         i++;
        //     }
               
        // }

         // gotta fixx the loop, this is temporary   
        skills.push(data.skills_1); 
        rank.push(data.rank_1); 
        skills.push(data.skills_2); 
        rank.push(data.rank_2); 
        skills.push(data.skills_3); 
        rank.push(data.rank_3); 

        const form_data = new FormData();
        console.log('type of form_data', form_data)
        console.log('data==================')
        console.log(data)

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
        

        
        console.log('formdata=====================')
        console.log(form_data)
        console.log(userId); 


        let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);

        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export function updateLocation(userId, data) {
    
    axios.put(`${c.UPDATE_PROFILE}/${userId}/updateGeoPoint`, {geoPoint: data})
        .then(response => { console.log(response); })
        .catch(error => { console.log(error.response); });

        //console.log("jammeseeeeey");
        //console.log(data);

}

export async function search(userId, data) {
    console.log('data=========')
    console.log(data);

    
    try {
       const options = {
        headers: {
            Accept: "application/json",
            //"Content-Type": "multipart/form-data",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({data})
        
    };  
        let res = await axios.post(`${c.UPDATE_PROFILE}/${userId}/search`, data)
        return res.data;
    
    }
    catch (e) {
        throw handler(e);
    }
}

export async function loadConversation(userId){
    /*
        axios.post(`${c.CONVERSATION}/${userId}/loadConversation`, {to_userId: "60592ef6f8cd70001599df31"})
        .then(response => { console.log(response.data.exist_conversation[0].conversationHistory);})
        .catch(error => { console.log(error.response); });
        //console.log("------------------IT STARTS HERE--------------",response.data.exist_conversation[0].conversationHistory)
    */
        try {
        let res = await axios.post(`${c.CONVERSATION}/${userId}/loadConversation`, {to_userId: "60592ef6f8cd70001599df31"})
        //et res = fetch(`${c.CONVERSATION}/${userId}/loadConversation`, {method: 'POST'}, {to_userId: "60592ef6f8cd70001599df31"})
        //console.log("------------------IT STARTS HERE--------------",res.data.exist_conversation[0].conversationHistory)
        return res.data.exist_conversation[0].conversationHistory;
        }
        catch (e) {
            throw handler(e);
        }


    }

    export async function addMessage(userId, text){
        /*
            axios.post(`${c.CONVERSATION}/${userId}/loadConversation`, {to_userId: "60592ef6f8cd70001599df31"})
            .then(response => { console.log(response.data.exist_conversation[0].conversationHistory);})
            .catch(error => { console.log(error.response); });
            //console.log("------------------IT STARTS HERE--------------",response.data.exist_conversation[0].conversationHistory)
        */
            try {
            let res = await axios.post(`${c.SEND_MESSAGE}/${userId}/sendMessage`, {conversationId: "60841769e5b35838526fe770", text: text})
            //console.log("------------------IT STARTS HERE--------------",res.data.exist_conversation[0].conversationHistory)
            return res;
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

export function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }