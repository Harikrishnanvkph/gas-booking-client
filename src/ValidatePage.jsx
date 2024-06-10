import "./css/login.css"
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect, useState } from "react";
import img1 from "./assets/img/login-image/img_1.jpg";
import { useNavigate } from "react-router-dom";
import { getUserMail, userPinValidation } from "./Logics";
import { useLocation } from "react-router-dom";

function ValidatePage(){
    const location = useLocation();
    const {name} = location.state || {};
    const [mail,setMail] = useState("");
    const [pin, setPin] = useState("");
    const [code,setCode] = useState("204");
    const navigate = useNavigate();

    const mailExtract = async ()=>{
        if(name == undefined){
            navigate("/");
        }
        const mail = await getUserMail(name);
        console.log(mail)
        setMail(mail.split("/")[1]);
    }

    useEffect(()=>{
        mailExtract();
    },[])

    const handleValidation = async()=>{
        if(pin == "" || pin.length < 4){
            setCode("404");
            return;
        }
        const pinValidate = await userPinValidation(mail,pin)
        const [returnCode,_] = pinValidate.split("/");
        if(returnCode == "200"){
            setCode("204");
            navigate("/");
        }else if(returnCode == "418"){
            setCode("418");
        }else{
            setCode("405");
        }
    }

    return <>
        <div className="login-full">
            <div className="container-xl login-page">
                <div className="row login-row">
                    <div className="col login-area">
                        <div className="icon d-flex align-items-center">
                            <BatteryStdIcon />
                            <span><b>Hari GAS Booking</b></span>
                        </div>
                        <div className="welcome-text">
                            Validate☑️
                            <div className="welcome-text-innote">Please enter the pin sent your registration mail address ✉</div>
                        </div>
                        <div className="form-login">
                            <div className="enter-username mt-2">
                                <input className="username" name="fl-name" placeholder="Enter Your Gas ID or User Name"
                                value={mail} disabled/>
                            </div>
                            <div className="enter-password mt-2 d-flex align-items-center">
                                <input type="number" name="fl-pass" className="password" placeholder="Enter Your PIN"
                                value={pin} onChange={(event)=>{
                                    if(event.target.value.length < 5 && typeof(parseInt(event.target.value)) == "number"){
                                        setPin(event.target.value)
                                    }
                                }} />
                                <span className="password-icon">
                                    <LockIcon />
                                </span>
                            </div>
                            <button className="login-button btn btn-primary mt-2" onClick={handleValidation}>Validate</button>
                            <div className="mt-4">
                                {
                                    code == "405" ? <p style={{color : "red"}} className="m-2"><b>Invalid Mail ID, Please Retry Login!!!</b></p> : 
                                    code == "404" ? <p style={{color : "red"}} className="m-2"><b>Pin Cannot be Empty or Less than 4 Digit!!!</b></p> : 
                                    code == "418" ? <p className="mt-2" style={{fontSize : "15px"}}>Invalid PIN Number</p>:
                                    code == "204" ? <p className="mt-2" style={{fontSize : "15px"}}>Enter Pin to Validate your Account</p> : <></>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col login-companyshow">
                        <img src={img1} alt="" />
                    </div>
                </div>
            </div>

        </div>
    </>

}

export default ValidatePage;