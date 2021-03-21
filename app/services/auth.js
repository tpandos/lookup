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
                "Content-Type": "multipart/form-data",
                
            }
            
        };
        console.log('data==========================', data)
        
        console.log("skills.name ------", data.name); 
        console.log("skills.rank ------", data.rank); 

      

        // let skills = [];
        // let rank = [];
        // let i = 1;

   

        // for (let key in data) {
        //     console.log('key', key)
        //     if (i > 3) return;
        //     if (key == `skills_${i}`) {
        //         for (let key_2 in data) {
        //             if (key_2 == `rank_${i}`) {
        //                 console.log('find it ===============')
        //                 console.log('value', data[key])
        //                 skills.push(data[key])
        //                 rank.push(data[key_2])   
        //             }
        //             console.log('key_2', key_2)
        //         }
        //         delete data.skills_1
        //         delete data.rank_1
        //         i++;
        //     }
               
        // }

        // console.log('skills ================', skills)
        // console.log('rank:===================', rank)

        const form_data = new FormData();
        console.log('type of form_data', form_data)
        console.log('data==================')
        console.log(data)
        // for ( let key in data ){
        //     form_data.append(key, data[key]);
        // }

       
        // create object using the data for skills 

        let name = data.name; 
        let rank = data.rank; 
      
        let skills = ["noooooooo","88"]; 
       
        // let skills2 = {"name": data.name2, "rank": data.rank2}
        // console.log("these are the skilzzzzzz")
        // console.log(skills); 

        // form_data.append("institute", data['institute']);
        // form_data.append("major", data['major']);
        // form_data.append("role", data['role']);
        // form_data.append("username", data['username']);
        // form_data.append("grade", data['grade']);
        form_data.append('skills', skills); 
  
    
        console.log('formdata=====================')
        console.log(form_data)

        console.log('object keys');
        // let somekeys = Object.keys(skills); 
        // let somekeys2 = Object.keys(skills2); 
        // console.log(somekeys);
        // console.log(somekeys2);


        let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);

        return res.data;
    }catch (e) {
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