import axios from "axios";

// axios.defaults.withCredentials = true;

async function userLoginValidation(userGasName,password){
    const response = await axios.post('https://gas-booking-server.onrender.com/login', {
        login_name: userGasName,
        password: password
    },{withCredentials : true});
    return response.data;
}

async function userRegisterValidation(mail,userGasName,password){
    const register = await axios.post('https://gas-booking-server.onrender.com/register', {
        mail : mail,
        user_name: userGasName,
        password: password
    });
    return register.data;
}

async function getUserMail(name){
    const getMailId = await axios.post('https://gas-booking-server.onrender.com/getmail', {
        name : name
    });
    return getMailId.data;
}

async function getUser(name){
    const getMailId = await axios.post('https://gas-booking-server.onrender.com/getuser', {
        name : name
    });
    if(getMailId){
        return getMailId.data;
    }else{
        return null;
    }
}

async function userPinValidation(mail,pin){
    const register = await axios.post('https://gas-booking-server.onrender.com/validate', {
        mail : mail,
        pin :  pin
    });
    return register.data;
}

async function generatePin(mail){
    const register = await axios.post('https://gas-booking-server.onrender.com/forgot', {
        mail : mail
    },{withCredentials : true});
    return register.data;
}

async function getProviders(){
    const providers = await axios.post('https://gas-booking-server.onrender.com/providers');
    if(providers){
        const prov = providers.data.status;
        if(prov.split("/")[0] == "404"){
            return null;
        }
        return providers.data.providers;
    }else{
        return null;
    } 
}
    
async function resetPassword(mail,password){
    const register = await axios.post('https://gas-booking-server.onrender.com/passwordReset', {
        mail : mail,
        password :  password
    });
    return register.data;
}   


function generateBookingNo(currentCustomer){
    const BookingNo = Math.ceil(Math.random(10000)*9000+1000);
    return `${currentCustomer}#${BookingNo}`
}


async function historyAdd(currentCustomer,book){
    const booked = await axios.post('https://gas-booking-server.onrender.com/book',{
        gas_id : currentCustomer,
        book : book
    });
    if(booked){
        const prov = booked.data;
        if(prov.split("/")[0] == "404"){
            return null;
        }
        return booked.data;
    }else{
        return null;
    } 
}

async function CancelOrder(userMail,bookingNo){
    const bookCancel = await axios.post('https://gas-booking-server.onrender.com/cancel',{
        mail : userMail,
        bookingNo : bookingNo
    },{withCredentials : true});
    if(bookCancel){
        if(bookCancel.data.split("/")[0] == "404"){
            return "404";
        }else{
            return bookCancel.data;
        }
    }else{
        return null;
    } 
}

export {CancelOrder,historyAdd,generateBookingNo,userLoginValidation,userRegisterValidation,getUserMail,userPinValidation
    ,getProviders,generatePin,resetPassword,getUser
}