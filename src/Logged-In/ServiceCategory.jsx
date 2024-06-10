import "../css/SP.css";
import BatteryStdIcon from "@mui/icons-material/BatteryStd";
import Services from "./Services.jsx";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { BookScreen } from "../Provider-Use/BookScreen.jsx";
import { BookDetails } from "../Provider-Use/BookDetails.jsx";
import { useEffect, useState, useRef } from "react";
import { getProviders } from "../Logics.js";
import { useDispatch } from "react-redux";
import { getDBProviders } from "../Store/Slicer.jsx";
import { History } from "../History.jsx";
import { Profile } from "../Profile.jsx";
import TableRowsIcon from "@mui/icons-material/TableRows";

function ServiceCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const providers = async () => {
    const prov = await getProviders();
    if (prov) {
      dispatch(getDBProviders(prov));
      navigate("/Info/Services");
    }
  };


  const handleStrike = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    providers();
  }, []);

  return (
    <>
      <div className="service-open">
        <div className="container-fluid loggedIn">
          <nav>
            <div className="icon d-flex align-items-center">
              <BatteryStdIcon />
              <span>
                <b>Hari GAS Booking</b>
              </span>
            </div>
            <ul>
              <li>
                <Link to="/Info/Services">Services</Link>
              </li>
              <li>
                <Link to="/Info/profile">Profile</Link>
              </li>
              <li>
                <Link to="/Info/history">History</Link>
              </li>
              <li onClick={()=>{
                const bool = window.confirm("Confirm if you want to Logout");
                if(bool){
                  navigate("/")
                }
              }}>LogOut</li>
            </ul>
            <div className="menu trim p-3" onClick={handleStrike}>
              <p className="m-0 pr-3 page">Pages</p>
              <TableRowsIcon className="trim" />
              <ul className={`drop ${dropdownOpen ? "d-block" : "d-none"}`}>
                <li>
                  <Link to="/Info/Services">Services</Link>
                </li>
                <li>
                  <Link to="/Info/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/Info/history">History</Link>
                </li>
                <li onClick={()=>{
                const bool = window.confirm("Confirm if you want to Logout");
                  if(bool){
                    navigate("/")
                  }
                }}>LogOut</li>
              </ul>
            </div>
          </nav>
        </div>
        <Routes>
          <Route path="Services" element={<Services />} />
          <Route path="booking/slot" element={<BookScreen />} />
          <Route path="booking/details" element={<BookDetails />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default ServiceCategory;
