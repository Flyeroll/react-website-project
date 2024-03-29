import React, { useEffect, useRef, useState } from 'react';
import './nav.scoped.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocation, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Outlet, Link } from 'react-router-dom';
import {
  MapContainer, TileLayer, Popup, Marker,
} from 'react-leaflet';
import Reservation from '../main/reservation/reservation';

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const menuBtnRef = useRef();
  const menuPopUpRef = useRef();
  const [backGroundImg, setBackGroundImg] = useState(1);

  // use ref for background image to count it
  const imgCount = useRef(1);

  // data of selected by user dishes from child component (first.jsx)
  const [selectedDishes, setSelectedDishes] = useState('');

  function showOrHideMap() {
    const mapNav = document.querySelectorAll('#xMarkNav');
    const mapEl = document.getElementsByClassName('mapImg');
    let reserveBtn = document.querySelector('.inputFieldReserveBtn');

    if (mapNav[0].classList.contains('falseShow') && mapNav[0] !== undefined) {
      mapNav[0].classList.remove('falseShow');
      mapNav[0].classList.add('trueShow');
      if (reserveBtn !== null) {
        reserveBtn.classList.add('hideReserve');
      }
    } else if (mapNav[0] !== undefined) {
      mapNav[0].classList.add('falseShow');
      mapNav[0].classList.remove('trueShow');
      if(reserveBtn !== null) {
        reserveBtn.classList.remove('hideReserve');
      }
    }
  }

  function printMenu() {
    return (
      <div className="menuBar showMenuTrue" id="menuBtn" ref={menuPopUpRef}>
        <div className="navMenuBtn"><Link to="/dishes" className="linkToHide">Dishes</Link></div>
        <div className="navMenuBtn"><Link to="/about" className="linkToHide">About Us</Link></div>
      </div>
    );
  }

  function openMenu() {
    setShowMenu(() => true);
  }

  useEffect(() => {
    const closeDropDown = (e) => {
      if (
        e.target !== menuBtnRef.current
        && e.target !== menuPopUpRef.current
      ) {
        setShowMenu(() => false);
      }
    };

    document.addEventListener('click', closeDropDown);
    return () => document.removeEventListener('click', closeDropDown);
  }, []);

  function showMap() {
    const mapEl = document.getElementsByClassName('mapImg');
    if (!mapEl[0].classList.contains('mapShowed')) {
      mapEl[0].classList.add('mapShowed');
    }
  }

  function printBackgroundImg() {
    return (
      <div className='mainPageBackgroundContainer'>
        <div className='textForBackGroundContainer'>
          <h2 className='welcomeTag'>Welcome to Our Website!</h2>
          <p className='hereTag'>Here you can take a look at ours delicious dishes !</p>
        </div>
        <img src={`/images/Wallpapers/main${backGroundImg}.jpg`} alt="" className="imgBackGround" />
      </div>
    );
  }
  function printReserveBtn() {
    return (
      <div className="inputFieldReserveBtn">Reserve!</div>
    );
  }
  useEffect(() => {
    let welcomeTag = document.querySelector('.welcomeTag');
    let hereTag = document.querySelector('.hereTag');
    if (welcomeTag !== null || hereTag !== null) {
      welcomeTag.style.right = '0%';
      hereTag.style.left = '20%';
    }
    setInterval(() => {
      let imgBackground = document.querySelector('.imgBackGround');
      setTimeout(() => {
        if (imgBackground !== null) {
          imgBackground.style.opacity = 1; // видимо
        };
      }, 0);
      if (imgCount.current < 5) {
        imgCount.current += 1;
      } else if (imgCount.current === 5) {
        imgCount.current = 1;
      }
      setBackGroundImg(() => imgCount.current);
      setTimeout(() => {
        if (imgBackground !== null) {
        imgBackground.style.opacity = 0; // невидимо
        }
      }, 2500);
    }, 3000);
  }, [0]);

  return (
    <div>
      <div className="nav">
        <img src="/images/logo.png" alt="" className="navLogo" />
        <div className="buttons">
          <button ref={menuBtnRef} className="menuBtn navBtn" onClick={() => openMenu()}>
            Menu
            {showMenu ? printMenu() : null }
            </button>
        </div>
        <FontAwesomeIcon icon={faMapLocation} className="navIcon" onClick={() => showOrHideMap()} />
        <div className="navMap falseShow" id="xMarkNav">
          <div className="contentNav">
            <h1>Coffee House</h1>
            <h3>You can find us:</h3>
            <p className="forStyling">3, Kirochnaya street</p>
            <p>Saint-Petersburg</p>
            <div>
              <MapContainer id="map" center={[59.94390977732626, 30.350782805398286]} zoom={16} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[59.94390977732626, 30.350782805398286]}>
                  <Popup>
                    You can find our Restaurant here
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <p className="navEmail">coffeehouse@gmail.com</p>
            <p className="forStyling">Working hours</p>
            <p>Mon - Sun from 13:00 to 23:30</p>
          </div>
          <FontAwesomeIcon icon={faXmark} onClick={() => showOrHideMap()} className="xMarkNav" />
        </div>
      </div>
      {window.location.href === "http://localhost:3000/" ? printBackgroundImg() : null}

      <Outlet />
      <footer>© 2022 Coffee Hause</footer>
    </div>
  );
}
