import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../src/css/history.css";
import { CancelOrder, getUser } from "./Logics";
import { setCustomer } from "./Store/Slicer";
import { useNavigate } from "react-router-dom";

export function History() {
  const dispatch = useDispatch();
  const hist = useSelector((state) => state.gasStore.customer);
  const [cancel, setCancel] = useState(false);
  const [mail, mailToCancel] = useState(null);
  const [booking_no, booking_noToCancel] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();


  const getDate = (slot) => slot.split("/");

  const CancelOrd = async (mail, booking_no) => {
    const cancellation = await CancelOrder(mail, booking_no);
    mailToCancel(null);
    booking_noToCancel(null);
    if (cancellation) {
      const cancelPop = cancellation.split("/")[0];
      if(cancelPop === "200"){
        const getU = await getUser(mail);
        dispatch(setCustomer(getU));
        alert(`Booking No : ${booking_no} is Cancelled`);
      }else if(cancelPop == "418"){
        alert("Invalid Token or Session, Please Login Again");
        navigate("/");
      }else{
        alert("Something Seems Broken! Failed to Cancel.")
      }     
    } else {
      console.log("Error Occured");
    }
  };

  return (
    <>
      {
        hist.history.length == 0 ? 
            <div className="book-history">
                <h4>No Booked History to Display</h4>
            </div>
        : 
        !cancel ? (
            <div className="history container">
              {hist.history.map((it, index) => (
                <div
                  key={index}
                  className="row history-card m-2"
                  onMouseOver={() => setHoveredIndex(index)}
                  onMouseOut={() => setHoveredIndex(null)}
                >
                  <div className="book-1 d-flex justify-content-between col-12">
                    <p>
                      Booking id: <b>{it.booking_no}</b>
                    </p>
                    {it.status === "Ordered" ? (
                      <p style={{ color: "green" }}>
                        Status : <b>{it.status}</b>
                      </p>
                    ) : it.status === "Cancelled" ? (
                      <p style={{ color: "red" }}>
                        Status : <b>{it.status}</b>
                      </p>
                    ) : (
                      <p>Status : {it.status}</p>
                    )}
                  </div>
                  <p className="col-12">Gas Category : {it.gas_category}</p>
                  <p className="col-12">Gas Provider : {it.gas_provider}</p>
                  <div className="book-1 d-flex justify-content-between col-12">
                    <p>{getDate(it.slot)[0]}</p>
                    <p>{getDate(it.slot)[1]}</p>
                  </div>
                  <div className="book-1 d-flex justify-content-between col-12">
                    <p>Amount : {it.amount}</p>
                    <p>Payment Status : {it.payment_status}</p>
                  </div>
                  {hoveredIndex === index ? (
                    <div className="d-flex justify-content-center col-12">
                      {it.status === "Cancelled" ? (
                        <button className="m-2 btn btn-danger" disabled>
                          Cancelled
                        </button>
                      ) : (
                        <button
                          className="m-2 btn btn-warning"
                          onClick={() => {
                            setCancel(true);
                            mailToCancel(it.mail);
                            booking_noToCancel(it.booking_no);
                          }}
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="canceloption">
              <p>Are you Sure you want to Cancel the Order?</p>
              <div>
                <button
                  className="mr-3 btn btn-primary"
                  onClick={() => {
                    setCancel(false);
                    CancelOrd(mail, booking_no);
                  }}
                >
                  Yes
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setCancel(false);
                    mailToCancel(null);
                    booking_noToCancel(null);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          )
      }
    </>
  );
}
