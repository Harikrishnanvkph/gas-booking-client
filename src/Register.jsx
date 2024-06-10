import "./css/login.css"
import BatteryStdIcon from '@mui/icons-material/BatteryStd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import img1 from "./assets/img/login-image/img_1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { userRegisterValidation } from "./Logics";

function Register(){
    const [state,setState] = useState(false);
    const [username, setUserName] = useState("");
    const [password, setPassWord] = useState("");
    const [mail, setMail] = useState("");
    const navigate = useNavigate();
    const [loginFailed,setLoginFailed] = useState(false);

    const handlePasswordVisibility = ()=>{
        const dd = document.getElementsByClassName("password")[0];
        if(!state){
            dd.setAttribute("type","text");
        }else{
            dd.setAttribute("type","password");
        }
        setState(!state);
    }

    const handleRegistration = async()=>{
        if(username == "" || password == "" || mail== "" || !mail.endsWith("@gmail.com")){
            setLoginFailed(true);
            return;
        }
        const registerValidate = await userRegisterValidation(mail,username,password);
        console.log(registerValidate)
        if(registerValidate){
            setLoginFailed(false);
            alert("Account Created Successfully, click OK to redirect to login page...")
            setTimeout(()=>{
                navigate("/");
            },1000)
        }else{
            setLoginFailed(true);
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
                            Register!
                            <div className="welcome-text-innote">SIMPLE AND FAST REGISTRATION!</div>
                        </div>
                        <div>
                            <div className="enter-usermail">
                                <input className="mail" placeholder="Enter Your GMAIL ID @gmail.com" value={mail}
                                onChange={(event)=>{
                                    setMail(event.target.value);
                                    setLoginFailed(false);
                                }}/>
                            </div>
                            <div className="enter-username">
                                <input className="username " placeholder="Enter Your User Name" value={username}
                                onChange={(event)=>{
                                    setUserName(event.target.value);
                                    setLoginFailed(false);
                                }}/>
                            </div>
                            <div className="enter-password d-flex align-items-center">
                                <input type="password" className="password" placeholder="Enter Your Password" value={password}
                                onChange={(event)=>{
                                    setPassWord(event.target.value);
                                    setLoginFailed(false);
                                }}/>
                                <span className="password-icon" onClick={handlePasswordVisibility}>
                                    {state ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </div>
                            <button className="login-button btn btn-primary mt-2" onClick={handleRegistration}>Register</button>
                            <p className="ptag mb-1">Upon Registration you will receive a <b>Gas ID</b>. <b>Gas ID</b> will be Visible into your Service Page Profile Section</p>
                            <div className="link-tc">
                                <div><Link to="http://localhost:3000/tc" target="_blank"><u>Terms And Conditions</u></Link></div>
                                {
                                    loginFailed && (mail!= "" ||username!="" || password!="")  && mail.endsWith("@gmail.com") ? <p style={{color : "red"}} className="m-0"><b>User Already Exist, Try Logging In!!!</b></p> : 
                                    loginFailed && (mail== "" || username=="" || password=="") ? <p style={{color : "red"}} className="m-0"><b>One or More Input Field is Empty!!!</b></p> : 
                                    loginFailed && (mail!= "" ||username!="" || password!="") && !mail.endsWith("@gmail.com") ? <p style={{color : "red"}} className="m-0"><b>Enter Valid GMAIL Signature *@gmail* !!!</b></p> : <></>
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

export default Register;