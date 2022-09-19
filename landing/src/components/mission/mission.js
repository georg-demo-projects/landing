import animate from '../../utilities/animate';

const screenWidthMax = 1440; // px
const animateScreenWidthMin = 767; // px

export default function mission() {

    const observable = document.querySelector('.mission');

    const options = {
        // необходимая площадь пересечения container с viewport
        threshold: .5
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                startAnimation();
                observer.unobserve(observable)
            }
        })
    }, options)

    observer.observe(observable)
}

function startAnimation() {
    if (!canAnimate()) {
        return;
    }

    const iphone = document.querySelector('.mission-iphone');
    const card = document.querySelector('.mission-card');

    const renderIphone = getIphoneRenderer(iphone);
    const renderCard = getCardRenderer(card);

    animate({
        duration: 1500,
        timing: function (timeFraction) {
            return timeFraction;
        },
        draw: (progress) => {
            renderIphone(progress);
            renderCard(progress);
        },
        animationEnd: () => {
            onIphoneAnimationEnd(iphone);
            onCardAnimationEnd(card);
        }
    });
}

function onIphoneAnimationEnd(iphone) {
    iphone.classList.add('mission-iphone--animated');
    iphone.style.transform = '';
}

function onCardAnimationEnd(card) {
    card.classList.add('mission-card--animated');
    card.style.transform = '';
    card.style.opacity = '';
}

function getCardRenderer(card) {
    const cardTranslateXResult = Math.min(_100vw(), screenWidthMax) / 2;

    return (progress) => {
        const translateX = cardTranslateXResult * progress;
        card.style.transform = `translateX(${translateX}px)`;
        card.style.opacity = 1 - progress;
    }
}

function getIphoneRenderer(iphone) {

    const iphoneRotate = 90;
    const iphoneTranslateXResult = Math.min(_100vw(), screenWidthMax) / 2;
    const iphoneScaleResult = 0.75;

    return (progress) => {

        const rotate = iphoneRotate * (1 - progress);
        const scale = 1 - (1 - iphoneScaleResult) * progress;
        const translateXBeforeScale = -(1 - scale) / 2 * 100; // = left: 0
        const translateXAfterScale = iphoneTranslateXResult * progress;

        iphone.style.transform =
            `translate(${translateXBeforeScale}%, ${0}%)
            scale(${scale}, ${scale})
            rotate(${rotate}deg)
            translateX(${translateXAfterScale}px)`;

        // finish state :
        // translate(-12.5%, 0) scale(0.75, 0.75) rotate(0) translateX(calc(min(100vw, screenWidthMax) / 2));
    }
}

function canAnimate() {
    return _100vw() >= animateScreenWidthMin;
}

function _100vw() {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

function _100vh() {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

// позиция относительно левого верхнего угла страницы
function offsetFromPage(element) {
    const rect = element.getBoundingClientRect();
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
    }
}
