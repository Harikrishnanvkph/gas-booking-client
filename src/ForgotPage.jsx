import "./css/login.css"
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import img1 from "./assets/img/login-image/img_1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { generatePin, resetPassword, userPinValidation, userRegisterValidation } from "./Logics";

function ForgotPage(){
    const [state,setState] = useState(false);
    const [pin, setPin] = useState("");
    const [password, setPassWord] = useState("");
    const [mail, setMail] = useState("");
    const navigate = useNavigate();
    const [code,setCode] = useState("204");

    const handlePasswordVisibility = ()=>{
        const dd = document.getElementsByClassName("password")[0];
        if(!state){
            dd.setAttribute("type","text");
        }else{
            dd.setAttribute("type","password");
        }
        setState(!state);
    }

    const gPin = async()=>{
        if(mail == ""){
            setCode("404");
            return;
        }
        const getPin = await generatePin(mail);
        console.log(getPin);
        const [pinCode,_] = getPin.split("/");
        console.log(pinCode)
        if(pinCode == "200"){
            setCode("204");
            alert("Pin sent to registered Mail ID")
        }else if(pinCode == "418"){
            setCode("418");
        }else{
            setCode("405");
        }
    }

    const handleForgot = async()=>{
        if(pin == "" || pin.length < 4 || password == ""){
            setCode("404");
            return;
        }
        const pinValidate = await userPinValidation(mail,pin)
        const [returnCode,_] = pinValidate.split("/");
        if(returnCode == "200"){
            const setPass = await resetPassword(mail,password);
            const [passCode,_] = setPass.split("/");
            if(passCode == "200"){
                setCode("204");
                navigate("/");
            }else if(passCode == "418"){
                setCode("418");
            }else{
                setCode("405");
            }
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
                            Reset!
                            <div className="welcome-text-innote">Forgot Password No Worries, Reset With Pin!</div>
                        </div>
                        <div>
                            <div className="enter-usermail">
                                <input className="mail" placeholder="Enter Your GMAIL ID @gmail.com" value={mail}
                                onChange={(event)=>{
                                    setMail(event.target.value);
                                }}/>
                            </div>
                            <div className="genPin" onClick={gPin}><p>Generate Pin</p></div>
                            <div className="enter-username">
                                <input className="username" placeholder="Enter Your PIN" value={pin} type="number"
                                onChange={(event)=>{
                                    if(event.target.value.length < 5){
                                        setPin(event.target.value);
                                    }
                                }}/>
                            </div>
                            <div className="enter-password d-flex align-items-center">
                                <input type="password" className="password" placeholder="Enter New Password" value={password}
                                onChange={(event)=>{
                                    setPassWord(event.target.value);
                                }}/>
                                <span className="password-icon" onClick={handlePasswordVisibility}>
                                    {state ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>
                            <button className="login-button btn btn-primary mt-2" onClick={handleForgot}>Reset</button>
                            <div className="mt-4">
                                {
                                    code == "405" ? <p style={{color : "red"}} className="m-2"><b>Invalid Mail ID, Please Retry Login!!!</b></p> : 
                                    code == "404" ? <p style={{color : "red"}} className="m-2"><b>Pin or Password Cannot be Empty or Less than 4 Digit!!!</b></p> : 
                                    code == "418" ? <p className="mt-2" style={{fontSize : "15px"}}>Invalid Pin Number</p>:
                                    code == "204" ? <p className="mt-2" style={{fontSize : "15px"}}>Sent Mail to Registered Mail Address</p> : 
                                    <p className="mt-2" style={{fontSize : "15px"}}>Generate Pin and Reset your password</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>

}

export default ForgotPage;