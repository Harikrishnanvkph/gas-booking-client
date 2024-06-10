import "../src/css/history.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function Profile(){
    const hist= useSelector((state)=>state.gasStore.customer);
    const navigate = useNavigate();

    return <>
        <div className="cover d-flex justify-content-center align-items-center">
            <div className="profile d-flex flex-column">
                <p>Gas Id : <b>{hist.gas_id}</b></p>
                <p>Mail Address : <b>{hist.mail}</b></p>
                <p>User Name : <b>{hist.user_name}</b></p>
                <p className="nth" onClick={()=>{navigate("/Info/history")}}><b><u>Booking History</u></b></p>
            </div>
        </div>
    </>
}