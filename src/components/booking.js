import { useLocation } from 'react-router-dom';
import "../styles/bookFlight.css";
import UserNavBar from "./userHeader";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/fontawesome-free-solid';
import { faPlaneDeparture } from '@fortawesome/fontawesome-free-solid';
import { timeConversion, calculateDuration } from "../util";

import { Link } from 'react-router-dom';
import { serverBaseUrl } from "../environment/environment";
import axios from 'axios';
import { useEffect, useState } from "react";


const BookFlight = (props) =>{

    const location = useLocation()
    const { flight } = location.state
    const [rewards, setRewards] = useState(0);

    useEffect(()=>{
        const url =serverBaseUrl+"/user";
        const token = localStorage.getItem('token');
    
        axios.get(url, {headers: {"Authorization" : `Bearer ${token}`}})
        .then((response)=>{
            console.log(response.data.mileage_points)
            setRewards(response.data.mileage_points);
        })
        .catch((error)=>{
            console.log(error.response.data.message)
        });
    },[])

    const bookFlight = () => {

    }

    return (
        <div>
            <UserNavBar/>

            <div className='row main'>
                <div className='col-md-1'></div>
                <div className='col-md-8'>
                    <div className='bookingContainer'>

                        <div>
                            <div className="booking-plane-icon" >
                                <span>{flight.departure_airport.city} &nbsp; 
                                <FontAwesomeIcon icon={faPlane} size="xl"/>  &nbsp;
                                {flight.arrival_airport.city}</span>  
                            </div>
                        </div>

                        <div className='flight-details'>

                            <div className='first-row'>
                                <div>
                                    <FontAwesomeIcon icon="fas fa-calendar-alt" size="lg"/> &nbsp;
                                    <span>{flight.departure_date.split(' ').slice(0,4).join(' ')}</span>
                                </div> 

                                <div>
                                    <FontAwesomeIcon icon="fas fa-clock" size="lg"/> &nbsp;
                                    <span>{calculateDuration(flight.departure_date, flight.departure_time, flight.arrival_date, flight.arrival_time)}</span>
                                </div>

                                <div>
                                    <FontAwesomeIcon icon="fas fa-plane" size="lg" transform={{ rotate: 270 }}/> &nbsp;
                                    <span>{flight.aircraft.name} -</span> &nbsp; 
                                    <span>{flight.flight_num}</span>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-8'>
                                
                                    <div className='second-row'>
                                        <div className='airport-name'>{flight.departure_airport.code}</div>
                                        <div className='airport-name'><FontAwesomeIcon icon="fa-solid fa-arrow-right" size="xs"/></div>
                                        <div className='airport-name'>{flight.arrival_airport.code}</div>
                                    </div>

                                    <div className='third-row'>
                                        <div>{timeConversion(flight.departure_time)}</div>
                                        <div>{timeConversion(flight.arrival_time)}</div>
                                    </div>
                                </div>

                                <div className='col-md-4 price-outer'>
                                    <div className='price-holder'>
                                        <span className='price-text'>$ {flight.price}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='traveller-details'>
                                <h4>Enter Traveller Details </h4>
                                <form style={{marginTop:"20px"}}>
                                    <div className="form-group">
                                    <label for="fname">First Name</label>
                                    <input className="form-input" type="text" name="fname"></input>
                                    </div>

                                    <div class="form-group">       
                                    <label for="lname">Last Name</label>
                                    <input className="form-input" type="text" name="lname"></input>
                                    </div>

                                    <div class="form-group">       
                                        <label for="email">Email</label>
                                        <input className="form-input" type="email" name="email"></input>
                                    </div>

                                </form>
                            </div>

                            <div className='payment-details'>
                                <h4>Payment</h4>
                                <form style={{marginTop:"20px"}}>
                                    <div className="form-group payment-line-1">
                                        <div>
                                            <label for="amount">Amount</label>
                                            <input className="form-input" type="number" name="amount"></input>
                                        </div>
                                        <div className='rewards-holder'>
                                            <input type="checkbox" id="rewards" name="rewards" value="rewards"/>
                                            <span id="use-rewards">Use Rewards</span>
                                        </div>
                                    </div>


                                    <div class="form-group">   
                                        <label for="amount">Card Details</label>    
                                        <input className="form-input cardNum" type="number" placeholder='Card Number' name="cardNum"></input>
                                    </div>

                                    <div class="form-group month-year-div"> 
                                        <label for="amount"></label>  
                                        <input className="form-input month" type="number" placeholder='Month' name="month"></input> &nbsp;
                                        <input className="form-input year" type="number" placeholder='Year' name="year"></input> &nbsp;
                                        <input className="form-input cvv" type="number" placeholder='CVV' name="year"></input>
                                    </div>
                                </form>
                            </div>

                            <div className='btn-container'>
                                <Link to="/myBookings" state={{ flight: props.flight }}>
                                    <input onClick={(e)=>bookFlight(e)} className='btn-book' type="submit" value="Book Flight"></input>
                                </Link>
                            </div>

                        </div>

                        </div>
                </div>

                <div className='col-md-3'>
                    <div className="rewards-container">
                        <div className="rewards-header">
                            <span>Rewards</span>  
                        </div>

                        <div className='reward-details'>
                            <span>Current Rewards: $ {rewards}</span> <br/> <br/>
                            <span>Pending Rewards: $ 0.00</span>
                        </div>
                
                    </div>
                </div>

            </div>
        </div>
        
    );
}

export default BookFlight;