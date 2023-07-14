import axios from "axios";

// const REST_API_URL_REGISTER = 'https://chow.onrender.com/API/v1/register';

class UserService{
    createUsers(user){
        // return axios.post(REST_API_URL_REGISTER, user);
    }

    getAllVendors(){
        return axios.get('https://chow.onrender.com/api/v1/getAllVendorsAccount');
    }
}

export default new UserService();