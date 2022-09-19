import animate from '../../utilities/animate';

export default function cookiePopup() {

    const popup = document.querySelector('.popup');
    const btnOk = document.querySelector('.popup__close');

    btnOk.addEventListener('click', handlerCloseClick)

    showPopup();

    function handlerCloseClick(e) {
        hidePopup();
    }

    function showPopup() {
        animate({
            duration: 500,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: (progress) => {
                let y = 100 * (1 - progress);
                popup.style.transform = `translateY(${y}%)`;
            },
            animationEnd: () => {
            }
        });
    }

    function hidePopup() {
        animate({
            duration: 400,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: (progress) => {
                let y = 100 * progress;
                popup.style.transform = `translateY(${y}%)`;
            },
            animationEnd: () => {
                popup.style.display = 'none';
            }
        });
    }
}
