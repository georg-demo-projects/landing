// import './styles/app.scss';

import getInTouch from './components/get-in-touch/get-in-touch';
import mission from './components/mission/mission';
import cookiePopup from './components/cookie-popup/cookie-popup';

window.onload = () => {
    mission();
    getInTouch();
    cookiePopup();
}
