/*eslint-disable*/

import axiosServices from "utils/axios";

export const fetchStats = async () => {
   try{ const response: any = await axiosServices.post('http://127.0.0.1:8000/get_statistics', { link: 'https://github.com/jhy/jsoup' });

    // const sourceList = await _deserailize(response.data);
    console.log('source', response);
    return response;}
    catch(error){
        console.log(error)
    }
};
