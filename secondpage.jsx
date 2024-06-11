import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./secondpage.css";



const CalendarPopup = () => {

  return (
    <div className='maindivofdate'>
      <div className='inputsearchdiv'>
      < input type='search' placeholder='               Search Your Location' className='searchbox'></input>
      <div className='divholdsearchbutton'><button className='buttontodosearch'>SEARCH</button></div>
      </div>
      <div className='divforprofile'>
        <div className='divforprofileimage'></div>
        <div></div>
      </div>
    </div>
  );
};

export default CalendarPopup;
