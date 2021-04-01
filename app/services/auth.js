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
        console.log('datalength', data.skills_1)

        let skills = [];
        let rank = [];
        let i = 1;
        for (let key in data) {
            console.log('key', key)
            if (i > 3) return;
            if (key == `skills_${i}`) {
                for (let key_2 in data) {
                    if (key_2 == `rank_${i}`) {
                        console.log('find it ===============')
                        console.log('value', data[key])
                        skills.push(data[key])
                        rank.push(data[key_2])   
                    }
                }
                delete data.skills_1
                delete data.rank_1
                i++;
            }
               
        }
        console.log('skills ================', skills)
        console.log('rank:===================', rank)

        const form_data = new FormData();
        console.log('type of form_data', form_data)
        console.log('data==================')
        console.log(data)
        for ( let key in data )
            form_data.append(key, data[key]);

        console.log('formdata=====================')
        console.log(form_data)
        let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);

        return res.data;
    }catch (e) {
        throw handler(e);
    }
}


export async function search(userId, data1, data2) {
    console.log(data1);
    console.log(data2);
    /*onst params = new FormData({
        keyword : 'data1',
        method : 'data2'
    }
    );
    params.append('keyword', data1)
    params.append('method', data2)*/

        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data1,data2})
        };

        try {
        let res = await axios.post(`${c.SEARCH}/${userId}/search`, {
            keyword: {keyword : data1},
            method :{method : data2}
        }, options);
        /*let res = await fetch('c.SEARCH}/${userId}/search', options);*/
        console.log(res.data1);
        console.log(res.data2);
        return res.data1, res.data2;
        
    }catch (e) {
        throw handler(e);
    }
}
//let res = await axios.post(`${c.SEARCH}/${userId}/search`, {params : {[keyword] : data1} & {[method] : data2}} , options);

/*export async function searchFilter(userId, data1, data2) {
    console.log(data);
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data1, data2})
        };
        try {
        let res = await axios.post(`${c.SEARCH}/${userId}/search`, data, options);
        //let res = await fetch(c.SEARCH, options);
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}*/




export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}