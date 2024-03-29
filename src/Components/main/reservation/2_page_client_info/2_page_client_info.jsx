import React, { useEffect, useRef, useState } from 'react';

import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import DatePicker from '../date_component/date';

export default function secondPageReserv(props) {
  const [reservedTables, setReservedTables] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
  });
  // clear Tables data to display user
  const [clearReservedTables, setClearReservedTables] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [numberParts, setNumberParts] = useState({
    1: '', 2: '', 3: '', 4: '',
  });
  const [number, setNumber] = useState('');
  const [pageTwoValidator, setPageTwoValidator] = useState({
    phone: false, name: false, table: false, visitorsNumb: true, dateAndTime: false,
  });
  const [pageTwoValidatorFinal, setPageTwoValidatorFinal] = useState(false);
  const [datePickerStatus, setDatePickerStatus] = useState(false);

  // for displaying month's name
  const [monthArray, setMonthArray] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
  // data from Date picker component to operate with
  const [pickerData, setPickerData] = useState('');

  // date to display in date input field
  const [dateForInputToShow, setDateForInputToShow] = useState('');

  // guestsNumber to display
  const [guestsTodisplay, setGuestsToDisplay] = useState('1');

  // Refs
  const phoneInputRef = useRef();
  const inputDateRef = useRef();

  function changeTableStatus(table) {
    const content = table.target.innerHTML;

    if (table.target.classList.contains('tableFree')) {
      const classes = table.target.classList;
      classes.add('tableSelected');
      classes.remove('tableFree');
      setReservedTables((prev) => ({ ...prev, [content]: true }));
    } else if (table.target.classList.contains('tableSelected')) {
      const classes = table.target.classList;
      classes.add('tableFree');
      classes.remove('tableSelected');
      setReservedTables((prev) => ({ ...prev, [content]: false }));
    } else {
      // "Table is occupied!"
    }
  }

  function phoneFilter(elem) {
    const char = elem.target.value;
    const numbArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const newChar = [];

    const phone = document.getElementsByClassName('inputPhoneNumber')[0].value;

    for (let i = 0; i < phone.length; i++) {
      if (numbArr.includes(Number(char[i]))) {
        newChar.push(Number(char[i]));
      }
    }

    elem.target.value = newChar;

    setPhoneNumber(() => newChar);
  }

  useEffect(() => {
    const newRawObjTables = reservedTables;
    const newRawArrayTables = Object.values(newRawObjTables);
    const newClearArrayTables = [];
    for (let i = 0; i < newRawArrayTables.length; i++) {
      if (newRawArrayTables[i] === true) {
        newClearArrayTables.push(i + 1);
      }
    }

    setClearReservedTables(() => newClearArrayTables);
  }, [reservedTables]);

  function format(element) {
    setNumber(() => element.target.value);
  }

  function showInputPhone(elem) {
    const ballToOpen = document.getElementsByClassName('numberBall')[0];
    const phoneIcon = document.getElementsByClassName('phoneIcon')[0];

    ballToOpen.classList.add('opened');
    phoneIcon.classList.add('opened');
    elem.target.classList.add('opened');
  }

  useEffect(() => {
    if (clearReservedTables.length > 0) {
      setPageTwoValidator((prev) => ({ ...prev, table: true }));
    } else {
      setPageTwoValidator((prev) => ({ ...prev, table: false }));
    }
  }, [clearReservedTables]);

  useEffect(() => {
    let firstThreeText;
    let secondThreeText;
    let firstTwoText;
    let secondTwoText;
    let finalNumber;

    if (phoneNumber.length < 4) {
      const firstThreeArr = phoneNumber.slice(0, 3);
      let newArrText = '';
      for (let i = 0; i < firstThreeArr.length; i++) {
        if (firstThreeArr[i] !== undefined) {
          newArrText += firstThreeArr[i];
        } else if (firstThreeArr[i] === undefined) {
          newArrText += '_';
        }
      }

      if (phoneNumber.length > 0) {
        firstThreeText = `(${newArrText})`;
      } else if (phoneNumber.length === 0) {
        firstThreeText = '';
      }

      setNumberParts((prev) => ({ ...prev, 1: firstThreeText }));
    }

    if (phoneNumber.length < 7) {
      const secondThreeArr = phoneNumber.slice(3, 6);
      let newArrText = '';
      for (let i = 0; i < secondThreeArr.length; i++) {
        if (secondThreeArr[i] !== undefined) {
          newArrText += secondThreeArr[i];
        } else if (secondThreeArr[i] === undefined) {
          newArrText += '_';
        }
      }

      secondThreeText = ` ${newArrText}`;

      setNumberParts((prev) => ({ ...prev, 2: secondThreeText }));
    }

    if (phoneNumber.length < 9) {
      const firstTwoArr = phoneNumber.slice(6, 8);
      let newArrText = '';
      for (let i = 0; i < firstTwoArr.length; i++) {
        if (firstTwoArr[i] !== undefined) {
          newArrText += firstTwoArr[i];
        } else if (firstTwoArr[i] === undefined) {
          newArrText += '_';
        }
      }

      firstTwoText = ` ${newArrText}`;

      setNumberParts((prev) => ({ ...prev, 3: firstTwoText }));
    }

    if (phoneNumber.length < 11) {
      const secondTwoArr = phoneNumber.slice(8, 10);
      let newArrText = '';
      for (let i = 0; i < secondTwoArr.length; i++) {
        if (secondTwoArr[i] !== undefined) {
          newArrText += secondTwoArr[i];
        } else if (secondTwoArr[i] === undefined) {
          newArrText += '_';
        }
      }
      secondTwoText = ` ${newArrText}`;

      setNumberParts((prev) => ({ ...prev, 4: secondTwoText }));
    }

    finalNumber = `${firstThreeText} + ${secondThreeText} + ${firstTwoText} + ${secondTwoText}`;
  }, [phoneNumber]);

  useEffect(() => {
    setNumber(() => {
      const finalResult = `${numberParts['1']} ${numberParts['2']} ${numberParts['3']} ${numberParts['4']}`;
      return finalResult;
    });
  }, [numberParts]);

  useEffect(() => {
    if (number.length === 18) {
      const input = phoneInputRef.current;
      input.classList.add('inputGreen');
      setPageTwoValidator((prev) => ({ ...prev, phone: true }));
    } else if (number.length !== 18) {
      const input = phoneInputRef.current;
      if (input.classList.contains('inputGreen')) {
        input.classList.remove('inputGreen');
      }
      setPageTwoValidator((prev) => ({ ...prev, phone: false }));
    }
  }, [number]);

  useEffect(() => {
    if (
      pageTwoValidator.dateAndTime === true
                    & pageTwoValidator.name === true
                    & pageTwoValidator.phone === true
                    & pageTwoValidator.table === true
                    & pageTwoValidator.visitorsNumb === true
    ) {
      setPageTwoValidatorFinal(() => true);
    } else {
      setPageTwoValidatorFinal(() => false);
    }
  }, [pageTwoValidator]);

  useEffect(() => {
    props.dataForParent(pageTwoValidatorFinal);
  }, [pageTwoValidatorFinal]);

  function guestsNumber(elem) {
    const numbArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const valueOfInput = elem.target.value;

    if (elem.target.value > 20) {
      elem.target.value = 20;
    }
    if (elem.target.value > 0) {
      setPageTwoValidator((prev) => ({ ...prev, visitorsNumb: true }));
    } else {
      setPageTwoValidator((prev) => ({ ...prev, visitorsNumb: false }));
    }
  }

  useEffect(() => {
    setDateForInputToShow(() => {
      let newTime;
      let newDay;
      let newMonth;
      let newYear;
      let newValue;
      if (
        pickerData.day !== undefined
                        & pickerData.month !== undefined
                        & pickerData.year !== undefined
      ) {
        if (pickerData.time.length > 0) {
          setPageTwoValidator((prev) => ({ ...prev, dateAndTime: true }));
          newDay = pickerData.day;
          newMonth = pickerData.month;
          newYear = pickerData.year;
          newValue = `${newDay}.${newMonth + 1}.${newYear}     ${pickerData.time} `;
        } else {
          setPageTwoValidator((prev) => ({ ...prev, dateAndTime: false }));
          newDay = '__';
          newMonth = '__';
          newYear = '____';
          newValue = 'Please, set date and time';
        }
      } else {
        newDay = '__';
        newMonth = '__';
        newYear = '____';
        newValue = 'Please, set date and time';
      }
      return newValue;
    });
    props.timeAndDate(pickerData);
  }, [pickerData]);

  useEffect(() => {

  }, [datePickerStatus]);

  function nameValidator(elem) {
    if (elem.target.value !== '') {
      setPageTwoValidator((prev) => ({ ...prev, name: true }));
    } else {
      setPageTwoValidator((prev) => ({ ...prev, name: false }));
    }
  }

  function showClicked(elem) {
    if (elem.target.classList.contains('btnCross')) {
      setDatePickerStatus(() => false);
    }
  }

  function changeStatusForParent(e) {
    e.preventDefault();
    setDatePickerStatus(() => false);
  }

  function recieveDataFromPicker(data) {
    setPickerData(() => data);
    setDatePickerStatus(() => false);
  }

  function openDatePicker() {
    if (!datePickerStatus) {
      setDatePickerStatus(() => true);
    }
  }

  function tableNumber(elem) {
    if (elem.target.value > 0) {
      setPageTwoValidator((prev) => ({ ...prev, table: true }));
      elem.target.classList.add('inputGreen');
    } else {
      setPageTwoValidator((prev) => ({ ...prev, table: false }));
      elem.target.classList.remove('inputGreen');
    }
  }

  return (
    <div className="allComponent" onClick={(elem) => showClicked(elem)}>
      <h2 className="allComponentTitle">Info</h2>
      <div className="columns">
        <div className="firstColumn">
          <div className="reservationClientDataBox">
            <div className="nameInputClear">
              <input type="text" className={`nameInput ${pageTwoValidator.name ? 'inputGreen' : null}`} placeholder="your name" onChange={(elem) => nameValidator(elem)} />
            </div>

            <div className="guestInputClear">
              <h4 className="titleQuestsNumber">How many guests are coming?</h4>
              <input type="number" className={`guestsNumberInput ${pageTwoValidator.visitorsNumb ? 'inputGreen' : null}`} max={20} min={1} onChange={(elem) => guestsNumber(elem)} defaultValue={1} />
            </div>
            <div className="tableNumberBox">
              <h4 className="tableSelectorTitle">Choose your table: </h4>
              <input type="number" className="tableNumberInput" max={10} min={0} onChange={(elem) => tableNumber(elem)} defaultValue={0} />
            </div>
            <div className="dateInputClear">
              <h4>Pick date and time bellow</h4>
              <input ref={inputDateRef} className={`dateInput ${pageTwoValidator.dateAndTime ? 'inputGreen' : null}`} readOnly onClick={() => openDatePicker()} value={dateForInputToShow} />
              <div className="datePickerComponento">
                {datePickerStatus ? <DatePicker className="datePickerComponent" statusForParent={changeStatusForParent} sendData={recieveDataFromPicker} /> : null}
              </div>
            </div>
            <div className="phoneInputClear">
              <h4>Please give your phone number</h4>
              <div className="phoneBox">
                <FontAwesomeIcon icon={faPhone} className="phoneIcon opened" />
                <input type="text" className="inputPhoneNumber opened" placeholder="your phone" maxLength={18} onChange={(elem) => phoneFilter(elem)} onClick={(elem) => showInputPhone(elem)} />
                <h2 ref={phoneInputRef} className="numberBall opened">
&nbsp;&nbsp;
                  {`${number}`}
                </h2>
              </div>
            </div>

          </div>
        </div>

        <div className="secondColumn">
          <h3>Please choose your table(s)</h3>
          <div className="myCanvas">
            <div className="firstRow row">
              <div className="tableFree table tableNumber" onClick={(table) => changeTableStatus(table)}>1</div>
              <div className="welcome">Welcome !</div>
              <div className="tableFree table tableNumber" onClick={(table) => changeTableStatus(table)}>2</div>
            </div>
            <div className="secondRow row">
              <div className="tableFree table tableNumber" onClick={(table) => changeTableStatus(table)}>3</div>
              <div className="tableFree table tableNumber" onClick={(table) => changeTableStatus(table)}>4</div>
              <div className="tableFree table tableNumber" onClick={(table) => changeTableStatus(table)}>5</div>
              <div className="tableFree table tableNumber" onClick={(table) => changeTableStatus(table)}>6</div>
            </div>
            <div className="thirdRow row">
              <div className="tableFree table tableNumber" onClick={(table) => changeTableStatus(table)}>7</div>
              <div className="tableFree table tableNumber" onClick={(table) => changeTableStatus(table)}>8</div>
              <div className="tableFree table tableNumber" onClick={(table) => changeTableStatus(table)}>9</div>
              <div className="tableFree table tableNumber" onClick={(table) => changeTableStatus(table)}>10</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
