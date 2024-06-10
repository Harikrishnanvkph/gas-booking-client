import { useEffect, useState } from "react";
import "../css/book.css"
import { useDispatch, useSelector } from "react-redux"
import { generateBookingNo, getUser, historyAdd } from "../Logics";
import { useLocation } from "react-router-dom";
import { setCustomer } from "../Store/Slicer";

export function BookDetails(){
    const droplist = useSelector((state)=>state.gasStore.droplist);
    const category = useSelector((state)=>state.gasStore.categorySelected);
    const provider = useSelector((state)=>state.gasStore.providerSelected);
    const currentCustomer = useSelector((state)=>state.gasStore.customer);
    const location = useLocation();
    const {slot} = location.state || {};
    const [price,setPrice] = useState(`₹ 0.00`);
    const [quantity,setQuantity] = useState("0 kg");
    const [code,setCode] =  useState("204");
    const dispatch = useDispatch();

    const handleBook = async()=>{
        if(price == `₹ 0.00`){
            setCode("418");
        }else{
            const bookingNo = generateBookingNo(currentCustomer.gas_id);
            const bookObject = {
                booking_no : bookingNo,
                gas_id : currentCustomer.gas_id,
                mail : currentCustomer.mail,
                gas_category : category,
                gas_provider : provider,
                slot : slot,
                quantity : quantity,
                status : "Ordered",
                amount : price,
                payment_status : "Paid"
            }
            const booked = await historyAdd(currentCustomer.gas_id,bookObject);
            if(booked){
                if(booked.split("/")[0] == "200"){
                    setCode("204");
                    const getU = await getUser(currentCustomer.mail);
                    dispatch(setCustomer(getU));
                    alert(`Payment Successfull, Booking No is ${bookingNo}. Check History For More Information`);
                }else{
                    setCode("418");
                }
            }else{
                setCode("405")
            }
        }
    }

    
    return <>
        <div className="container-fluid book-details">
            <div className="row book-user-details">
                <div className="col-12 title">User Details:</div>
                <div className="col-12 tile d-flex justify-content-center align-items-center">
                    <h6 className="m-0 label ">Registered GAS No </h6>
                    <p className="book-inter">:</p>
                    <input type="text" className="book-input" disabled placeholder="" value={currentCustomer.gas_id}/>
                </div>
                <div className="col-12 tile d-flex justify-content-center align-items-center">
                    <h6 className="m-0 label">User Mail</h6>
                    <p className="book-inter">:</p>
                    <input type="text" className="book-input" disabled placeholder="" value={currentCustomer.mail}/>
                </div>
            </div>
            <div className="row book-booking-details">
                <div className="col-12 title">Booking Details</div>
                <div className="col-12 tile d-flex justify-content-center align-items-center">
                    <h6 className="m-0 label">Gas Category</h6>
                    <p className="book-inter">:</p>
                    <input type="text" className="book-input" disabled placeholder="" value={category}/>
                </div>
                <div className="col-12 tile d-flex justify-content-center align-items-center">
                    <h6 className="m-0 label">Gas Provider</h6>
                    <p className="book-inter">:</p>
                    <input type="text" className="book-input" disabled placeholder="" value={provider}/>
                </div>
                <div className="col-12 tile d-flex justify-content-center align-items-center">
                    <h6 className="m-0 label">Slot</h6>
                    <p className="book-inter">:</p>
                    <input type="text" className="book-input slot" disabled placeholder="" value={slot} />
                </div>
            </div>
            <div className="row rate-cards">
                <p className="col-sm-12 col-md-3 rate-p">{`Select a Quantity to Book `}
                <span className="rate-after">{`====>`}</span></p>
                {
                    droplist[category].map((key)=>(
                        key["company"] == provider ? 
                        key["quantities"].map((it,index)=>(
                        <div className="col-sm-4 col-md-3 card card-show " key={index} onClick={()=>{
                            setPrice(`₹${it["cost"]}.00`);
                            setQuantity(`${it["quantity"]}`)
                        }}>
                            <p className="quantity">{it["quantity"]}</p>
                            <p className="rate">{`₹${it["cost"]}`}</p>
                        </div>
                    )) : null
                    ))
                }
            </div>
            <div className="row book-user-details">
                <div className="col-12 tile d-flex justify-content-center align-items-center">
                    <h6 className="m-0 label">Amount Payable </h6>
                    <p className="book-inter">:</p>
                    <input className="book-input" type="text" disabled placeholder="" value={price}/>
                </div>
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <button className="button btn btn-primary" onClick={handleBook}>Order</button>
                </div>
                {code == "418" ? <p className="m-0 w-100" style={{color : "red"}}>Select a Quantity to Book</p> : <></>}
            </div>
        </div>
    </>
}