import React, { useEffect, useState } from "react";
import "./style.css"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'


export default function DateWindow(){
    
    //DATE MONTH YEAR
    const d = new Date();
    
    let dayToday = d.getDate(); // ДАТА СЕГОДНЯ "22"
    
    let monthToday = d.getMonth(); //возвращает месяц  '0-11'
    
    let yearToday = d.getFullYear(); // ГОД СЕГОДНЯ "2022"
    

// TEST PART TO IMPLEMENT

const [weeksDayArray, setWeeksDayArray] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])

const [yearsArrayForPrint, setYearsArrayForPrint] = useState()

const [yearsArray, setYearsArray] = useState([
    {name:2022,
    monthInfo: [
        {monthName:"January", firstDay:weeksDayArray[5], lastDay:'', amountOfDays:31},
        {monthName:"February", firstDay:"", lastDay:'', amountOfDays:28},
        {monthName:"March", firstDay:"", lastDay:'', amountOfDays:31},
        {monthName:"April", firstDay:"", lastDay:'', amountOfDays:30},
        {monthName:"May", firstDay:"", lastDay:'', amountOfDays:31},
        {monthName:"June", firstDay:"", lastDay:'', amountOfDays:30},
        {monthName:"July", firstDay:"", lastDay:'', amountOfDays:31},
        {monthName:"August", firstDay:"", lastDay:'', amountOfDays:31},
        {monthName:"September", firstDay:"", lastDay:'', amountOfDays:30},
        {monthName:"October", firstDay:"", lastDay:'', amountOfDays:31},
        {monthName:"November", firstDay:"", lastDay:'', amountOfDays:30},
        {monthName:"December", firstDay:"", lastDay:'', amountOfDays:31},
    ]},
    {name:2023,
        monthInfo: [
            {monthName:"January", firstDay:weeksDayArray[6], lastDay:'', amountOfDays:31},
            {monthName:"February", firstDay:"", lastDay:'', amountOfDays:28},
            {monthName:"March", firstDay:"", lastDay:'', amountOfDays:31},
            {monthName:"April", firstDay:"", lastDay:'', amountOfDays:30},
            {monthName:"May", firstDay:"", lastDay:'', amountOfDays:31},
            {monthName:"June", firstDay:"", lastDay:'', amountOfDays:30},
            {monthName:"July", firstDay:"", lastDay:'', amountOfDays:31},
            {monthName:"August", firstDay:"", lastDay:'', amountOfDays:31},
            {monthName:"September", firstDay:"", lastDay:'', amountOfDays:30},
            {monthName:"October", firstDay:"", lastDay:'', amountOfDays:31},
            {monthName:"November", firstDay:"", lastDay:'', amountOfDays:30},
            {monthName:"December", firstDay:"", lastDay:'', amountOfDays:31},
        ]},
        {name:2024,
            monthInfo: [
                {monthName:"January", firstDay:weeksDayArray[0], lastDay:'', amountOfDays:31},
                {monthName:"February", firstDay:"", lastDay:'', amountOfDays:29},
                {monthName:"March", firstDay:"", lastDay:'', amountOfDays:31},
                {monthName:"April", firstDay:"", lastDay:'', amountOfDays:30},
                {monthName:"May", firstDay:"", lastDay:'', amountOfDays:31},
                {monthName:"June", firstDay:"", lastDay:'', amountOfDays:30},
                {monthName:"July", firstDay:"", lastDay:'', amountOfDays:31},
                {monthName:"August", firstDay:"", lastDay:'', amountOfDays:31},
                {monthName:"September", firstDay:"", lastDay:'', amountOfDays:30},
                {monthName:"October", firstDay:"", lastDay:'', amountOfDays:31},
                {monthName:"November", firstDay:"", lastDay:'', amountOfDays:30},
                {monthName:"December", firstDay:"", lastDay:'', amountOfDays:31},
            ]},
])




useEffect(() => {
    setYearsArray((prev) => {
        prev.map((year) => {

            //Функция переходных значений для дней недели (аргументы: текущий индекс + необходимая величина изменения)
            function refreshWeeksDay(index, increment) {
                let newWeekdDay = index
                if(index === 0 & increment < 0) {
                    console.log("1 path");
                    newWeekdDay = 6
                } else if (index === 6 & increment === 1) {
                    console.log("2 path");
                    newWeekdDay = 0
                } else if (index === 6 & increment === 2) {
                    console.log("3 path");
                    newWeekdDay = 1
                } else {
                    console.log("3 path");
                    newWeekdDay += increment
                    if(newWeekdDay === 7){
                        newWeekdDay = 0
                    } else if (newWeekdDay === 8) {
                        newWeekdDay = 1
                    }
                }
                return newWeekdDay
            }
            
            let newYear = year
        
            for(let i = 0; i < 12; i++) {

        
                if(i === 0) {
                    if(year.monthInfo[i].amountOfDays === 28){
                        newYear.monthInfo[i].lastDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i].firstDay), -1)]
                    } else if(year.monthInfo[i].amountOfDays === 29){
                        newYear.monthInfo[i].lastDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i].firstDay), 0)]
                    } else if(year.monthInfo[i].amountOfDays === 30) {
                        newYear.monthInfo[i].lastDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i].firstDay), 1)]
                    } else if(year.monthInfo[i].amountOfDays === 31) {
                        newYear.monthInfo[i].lastDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i].firstDay), 2)]
                    }
                } else {
                    //calc first day for current month
                    if(year.monthInfo[i].amountOfDays === 28){
                        newYear.monthInfo[i].firstDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i - 1].lastDay), 1)]
                        newYear.monthInfo[i].lastDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i].firstDay), -1)]
                    } else if(year.monthInfo[i].amountOfDays === 29){
                        newYear.monthInfo[i].firstDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i - 1].lastDay), 1)]
                        newYear.monthInfo[i].lastDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i].firstDay), 0)]
                    } else if(year.monthInfo[i].amountOfDays === 30) {
                        newYear.monthInfo[i].firstDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i - 1].lastDay), 1)]
                        newYear.monthInfo[i].lastDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i].firstDay), 1)]
                    } else if(year.monthInfo[i].amountOfDays === 31) {
                        newYear.monthInfo[i].firstDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i - 1].lastDay), 1)]
                        newYear.monthInfo[i].lastDay = weeksDayArray[refreshWeeksDay(weeksDayArray.indexOf(year.monthInfo[i].firstDay), 2)]
                    }
        
                    //calc last day for current month
        
                }
            }
            
        
            return newYear
        })
    })

    setYearsArrayForPrint((prev) => yearsArray)


},[1])

const [finalCurrent, setFinalCurrent] = useState()

useEffect(() => {
    console.log("Печатаем копию массива лет");
    console.log(yearsArrayForPrint);
}, [yearsArrayForPrint])













































































    const [timeArray, setTimeArray] = useState([
        {time:'10:00', selected:false},
        {time:'11:00', selected:false},
        {time:'12:00', selected:false},
        {time:'13:00', selected:false},
        {time:'14:00', selected:false},
        {time:'15:00', selected:false},
        {time:'16:00', selected:false},
        {time:'17:00', selected:false},
        {time:'18:00', selected:false},
        {time:'19:00', selected:false},
        {time:'20:00', selected:false},
    ])
    
    const [daysArray, setDaysArray] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35])
    const [monthArray, setMonthArray] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
    const [monthsArray, setMonthsArray] = useState([
        {name: "January", amountOfDays:31},
        {name: "February", amountOfDays:28},
        {name: "March", amountOfDays:31},
        {name: "April", amountOfDays:30},
        {name: "May", amountOfDays:31},
        {name: "June", amountOfDays:30},
        {name: "July", amountOfDays:31},
        {name: "August", amountOfDays:31},
        {name: "September", amountOfDays:30},
        {name: "October", amountOfDays:31},
        {name: "November", amountOfDays:30},
        {name: "December", amountOfDays:31}
    ])
    const [yearArray, setYearArray] = useState(2022, 2023, 2024)
    const [selectedDay, setSelectedDay] = useState({daySelected:false, day:dayToday, month:monthToday, year:yearToday, time:"", object:""})
    
    //Show or hide status for Lists
    const [listStatus, setListStatus] = useState({month:false, year:false})
    
    const [selectedMonth, setSelectedMonth] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
    const [selectedYear, setSelectedYear] = useState([2022, 2023, 2024])
    const [currentYearAndMonth, setCurrentYearAndMonth] = useState({year: selectedDay.year, month: selectedDay.month,currentMonthData: ""})
    
    const [monthIndex, setMonthIndex] = useState(0)
    const [yearIndex, setYearIndex] = useState(2022)

    const [currentMonthLength, setCurrentMonthLength] = useState(monthsArray[monthToday].amountOfDays)


    useEffect(() => {
        console.log(currentMonthLength);
    },[currentMonthLength])



    useEffect(() => {
        console.log(monthToday + monthIndex);       //current month
        setSelectedDay((prev) => {
            return {...prev, month:monthToday + monthIndex, year:selectedYear[yearToday - yearIndex]}
        })
    }, [monthIndex])

    useEffect(() => {
        console.log(selectedYear[yearToday - yearIndex]);       //current year
        setSelectedDay((prev) => {
            return {...prev, month:monthToday + monthIndex, year:selectedYear[yearToday - yearIndex]}
        })
    }, [yearIndex])

    useEffect(() => {
        console.log(timeArray);
        let newTimeArrayToSave = []
        for(let i = 0;i < timeArray.length;i++) {
            if(timeArray[i].selected){
                newTimeArrayToSave.push(timeArray[i].time)
            }
        }

        console.log(newTimeArrayToSave);

            setSelectedDay((prev) => {
                return {...prev, time:newTimeArrayToSave}
        })
    },[timeArray])
    
    
    
    useEffect(() => {
        setCurrentYearAndMonth((prev) => {

            return {...prev,year: selectedDay.year, month: selectedDay.month}
        })
        console.log(yearsArrayForPrint);

    },[selectedDay])
    
    
    
    useEffect(() => {
        console.log(currentYearAndMonth.year);
        
        console.log(currentYearAndMonth);
        
        let newMonth 
        if(yearsArrayForPrint !== undefined) {
            newMonth = yearsArrayForPrint.filter(elem => elem.name === currentYearAndMonth.year)[0].monthInfo[currentYearAndMonth.month]
        }
  
        console.log(newMonth);

        setFinalCurrent((prev) => {
            return {...currentYearAndMonth, currentMonthData:newMonth}
        })
    }, [currentYearAndMonth])



    useEffect((element) => {
        console.log(finalCurrent);
    },[finalCurrent])
    
    
    
    function selectDate(elem) {
        if(!selectedDay.daySelected) {
            elem.target.classList.add('dateDaySelected')
            setSelectedDay((prev) => {
                return {...prev, object:elem.target, daySelected:true, day:elem.target.innerHTML}
            })
        } else if(selectedDay.daySelected & elem.target.classList.contains('dateDaySelected')){
            selectedDay.object.classList.remove('dateDaySelected')
            setSelectedDay((prev) => {
                return {...prev, object:'', daySelected:false, day:''}
            })
        } else if(selectedDay.daySelected & !elem.target.classList.contains('dateDaySelected')){
            selectedDay.object.classList.remove('dateDaySelected')
            elem.target.classList.add('dateDaySelected')
            setSelectedDay((prev) => {
                return {...prev, object:elem.target, daySelected:true, day:elem.target.innerHTML}
            })
        }
        setSelectedDay((prev) => {
            return {...prev, month:monthToday + monthIndex, year:selectedYear[yearToday - yearIndex]}
        })
    }
    
    function changeTimeStatus(elem) {
        if(!elem.target.classList.contains('selectedSingleTime')) {
            elem.target.classList.add('selectedSingleTime')
        } else {
            elem.target.classList.remove('selectedSingleTime')
        }
        
        let newElem = elem
        
        
        
        setTimeArray((prevArr) => {
            let newArr = prevArr.map((hour) => {
                let newHour = hour
                if(newElem.target.innerHTML === hour.time){
                    newHour.selected = !newHour.selected
                }
                return newHour
            })
            return newArr
        })

        

    
        
        
    }
    
    function printTime() {
        return (
            timeArray.map((elem) => {
                return <div className="singleTime" onClick={(elem) => changeTimeStatus(elem)}>{elem.time}</div>
            })
            )
        }
        function changeScroll(elem) {
            let scrollWindow = document.querySelector('.dateTime')
            if(elem.target.classList.contains('dateArrowDown')) {
                scrollWindow.scrollTop += 30
            } else {
                scrollWindow.scrollTop -= 30
            }
            console.log(timeArray);
        }
        
        function showList(elem) {
            if(elem.target.classList.contains('dateLeftTopMonth')) {
                setListStatus((prev) => {
                    return {...prev, month:!prev.month}
                })
            }
            if(elem.target.classList.contains('dateLeftTopYear')) {
                setListStatus((prev) => {
                    return {...prev, year:!prev.year}
                })
            }
        }

        function printMonths() {
            
            return  (
        <div className="dateMonthList">
            <div>January</div>
            <div>February</div>
            <div>March</div>
            <div>April</div>
            <div>May</div>
            <div>June</div>
            <div>July</div>
            <div>August</div>
            <div>September</div>
            <div>October</div>
            <div>November</div>
            <div>December</div>
        </div>
        )
    }
    
    function printYears() {
        return (
            <div className="dateYearList">
            <div>2022</div>
            <div>2023</div>
            <div>2024</div>
        </div>
        )
    }


    function nextMonthBtn() {
        setMonthIndex((prev) => {
            let newIndex = prev
            if((monthToday + prev) < 11) {
                newIndex += 1
            } else {
                newIndex = -7
                setYearIndex((prev) => {
                    let newIndex = prev
                    if(prev > 2020) {
                        newIndex -= 1
                    } else {
                        newIndex = 2022
                    }
                    return newIndex
                })
            }
            return newIndex
        })
    }



    function prevMonthBtn() {
        setMonthIndex((prev) => {
            let newIndex = prev
            if(yearToday === selectedDay.year & monthToday === selectedDay.month) {
            } else if(yearToday < selectedDay.year & selectedDay.month === 0){
                newIndex = 4
                setYearIndex((prev) => {
                    return prev + 1
                })
            }else {
                newIndex -= 1
            }
            return newIndex
        })
    }



    
    function printDays(){
        let xDays = monthsArray[selectedDay.month].amountOfDays
        let dataArray = []

        if(finalCurrent !== undefined) {
            if(finalCurrent.currentMonthData !== undefined) {
                let firstDayIndex = weeksDayArray.indexOf(finalCurrent.currentMonthData.firstDay)
                console.log("finalCurrent bottom");
                console.log(finalCurrent.currentMonthData.firstDay);
                console.log(firstDayIndex);
                console.log("finalCurrent top");


        
                for(let i=0; i < 35 ; i++) {
                    let newElem
                    if(i < firstDayIndex) {
                        newElem = <div className="tag"></div>
                    } else if(i >= firstDayIndex) {
                        newElem = <div className="tag" onClick={(target) => selectDate(target)}>{i - firstDayIndex + 1}</div>
                    }
                    dataArray.push(newElem)
                }
                console.log(dataArray);
            }
        }
  


        return dataArray.map(elem => elem)
        // return dataArray.map((elem) => {
            
        //     return elem
        // })
    }
    





    
    return (
        <div className="dateMain">
            {listStatus.month ? printMonths() : null}
            {listStatus.year ? printYears() : null}
            <div className="dateYearList"></div>
            <div className="dateLeft">
                <div className="dateLeftTop">
                    <FontAwesomeIcon icon={faAngleLeft} className='dateLeftTopBtn dateLeftTopBtnLeft' onClick={() => prevMonthBtn()}/>
                    <div className="dateLeftTopMonth dateLeftTopBtn" onClick={(elem) => showList(elem)}>{selectedMonth[monthToday + monthIndex]}</div>
                    <div className="dateLeftTopYear dateLeftTopBtn" onClick={(elem) => showList(elem)}>{selectedYear[yearToday - yearIndex]}</div>
                    <FontAwesomeIcon icon={faAngleRight} className='dateLeftTopBtn dateLeftTopBtnRight' onClick={() => nextMonthBtn()}/>
                </div>
                <div className="dateLeftBottom">
                    <div className="dateLeftWeek">
                        <div className="tag weekDay">Mo</div>
                        <div className="tag weekDay">Di</div>
                        <div className="tag weekDay">Mi</div>
                        <div className="tag weekDay">Do</div>
                        <div className="tag weekDay">Fr</div>
                        <div className="tag weekDay">Sa</div>
                        <div className="tag weekDay">So</div>
                    </div>
                    <div className="dateDaysTable">
                        {printDays()}
                        {/* <div className="tag" onClick={(elem) => selectDate(elem)}>30</div>
                        <div className="tag unActiveDay" >31</div> */}

                    </div>
                </div>
            </div>
            <div className="dateRight">
                <FontAwesomeIcon icon={faAngleUp} className="dateArrow dateArrowUp" onClick={(elem) => changeScroll(elem)}/>
                <div className="dateTime">
                    {printTime()}
                </div>
                <FontAwesomeIcon icon={faAngleDown} className="dateArrow dateArrowDown" onClick={(elem) => changeScroll(elem)}/>
            </div>
        </div>
    )
}