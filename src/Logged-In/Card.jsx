import * as React from 'react';
import '../css/SP.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategory, setProvider } from '../Store/Slicer';


export default function Card({obj,category,imageurl}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setProvider(obj["company"]));
    dispatch(setCategory(category));
    navigate("/Info/booking/slot");
  };

  return (
    <div className="card provider-card" onClick={handleClick}>
        <img src={`/${imageurl}`} alt={obj["company"]}  />
        <div className="card-body">
            <h4 className="card-title"><b>{`${obj["company"]}`}<span>{` (${category})`}</span></b></h4>
            <p className="card-text">{obj["description"]}</p>
        </div>
    </div>
  );
}