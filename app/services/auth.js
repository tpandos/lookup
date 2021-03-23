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
                "Content-Type": "multipart/form-data"
            }
        };
        console.log('data==========================', data)

        // let skills = [];
        // let rank = [];
        // let i = 1;
        // for (let key in data) {
        //     if (i > 3) return;
        //     if (key == `skills_${i}`) {
        //         for (let key_2 in data) {
        //             if (key_2 == `rank_${i}`) {
        //                 console.log('find it ===============')
        //                 console.log('value', data[key])
        //                 skills.push(data[key])       
        //                 rank.push(data[key_2])   
        //                 delete data[key]
        //                 delete data[key_2]
        //             }
        //         }
        //         i++;
        //     } 
        // }
        
        console.log('skills ================', skills)
        console.log('rank:===================', rank)
        console.log('data before ==================')
        console.log(data)

        data['skills'] = skills;
        data['rank'] = rank
       
        console.log('data after==================')
        console.log(data)

        const form_data = new FormData();
        
        for ( let key in data )
            form_data.append(key, data[key]);
        // for (let key in data) {
        //     Array.isArray(data[key])
        //         ? data[key].forEach(value => form_data.append(key + '[]', value))
        //         : form_data.append(key, data[key]) ;
        // }
        console.log('formdata=====================')
        console.log(form_data)
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