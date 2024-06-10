import { MenuItem, Select } from "@mui/material"
import { currentDate, currentMonth,currentYear, importAllImages} from "./Calculation"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/book.css"

export function BookScreen(){
    const navigate = useNavigate();
    const [date,setDate] = useState(currentDate()+1);
    const category = useSelector((state)=>state.gasStore.categorySelected);
    const provider = useSelector((state)=>state.gasStore.providerSelected);
    const droplist = useSelector((state)=>state.gasStore.droplist);
    const icons = useSelector((state)=>state.gasStore.icons);
    // const images = importAllImages(require.context('../icons', false, /\.(png|jpe?g|svg)$/));

    useEffect(()=>{
        if(category == "All" || provider == "All"){
            navigate("/Services")
        }
    },[])

    const clause = ()=>{
        switch(date % 10){
            case 1 : return "st";
            case 2 : return "nd";
            case 3 : return "rd";
            default : return "th"
        }
    }

    const availableDates = ()=>{
        const arr = [];
        for(let a=currentDate()+1;a<=currentDate()+5;a++){
            arr.push(a);
        }
        return arr;
    }

    const handleDate = (event)=>{
        setDate(event.target.value);
    }


    return <>
        <div className="container-fluid bookScreen">
            <div className="row select-item-show">
                <div className="col-md-5 col-sm-12 book-gas-category">
                    <h6>Gas Category</h6>
                    <h4>{category}</h4>
                </div>
                <div className="col-md-5 col-sm-12 p-md-0 book-gas-provider">
                    <h6 className="m-0">Gas Provider</h6>
                    <div className="book-gas-provider-inner">
                        <div className="book-gas-provider-inner-icon">
                            <img src={`/${icons[provider]}`} />
                        </div>
                        <div className="book-gas-provider-inner-title">
                            <h5>{provider}</h5>
                            <h6>{droplist[category]?.map((it)=>(
                                it["company"] === provider ? it["description"] : null
                            ))}</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row book-date-show">
                <h6 className="book-h6">Booking Starting Date :</h6>
                <Select
                    className="select"
                    id="date-drop"
                    value={date}
                    alt="date-select-dropdown"
                    onChange={handleDate}
                    >
                        {
                            availableDates().map((it)=>(
                                <MenuItem value={it} key={it}>
                                    <b>{it}</b>
                                </MenuItem>
                            ))
                        }
                </Select>
                <p className="book-p">
                    <sup>{clause()}</sup>{` of ${currentMonth()} ${currentYear()}`}
                </p>
            </div>
            <div className="row time-slot">
                <div className="card col card-morning" onClick={()=>{
                    navigate("/Info/booking/details",{ state: { slot: `Date: ${date} ${currentMonth()}/ Time: 9:00 AM to 12:00PM ` } })
                }}>
                    <h6>9:00 AM to 12:00PM</h6>
                </div>
                <div className="card col card-evening" onClick={()=>{
                    navigate("/Info/booking/details",{ state: { slot: `Date:${date} ${currentMonth()}/ Time :2:00 PM to 5:00PM` } })
                }}>
                    <h6>2:00 PM to 5:00PM</h6>
                </div>
                <div className="card col card-night" onClick={()=>{
                    navigate("/Info/booking/details",{ state: { slot: `Date:${date} ${currentMonth()}/ Time :8:00 AM to 11:00PM` } })
                }}>
                    <h6>8:00 AM to 11:00PM</h6>
                </div>
            </div>
            <div className="row book-info">
                Filter&nbsp;<b>Date&nbsp;</b> and Select <b>&nbsp;Time Slot&nbsp;</b> to book the GAS!!!
            </div>
        </div>
    </>
}