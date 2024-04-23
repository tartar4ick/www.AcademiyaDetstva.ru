"use strict"


const header = document.querySelector('.header')
const menu = document.querySelector('.header__menu')
const menuBtn = document.querySelector('.header__burger')
const menuLink = document.querySelectorAll(".menu__item")
const logoLink = document.querySelectorAll(".logo__link")
const popupX = document.querySelector('.popup__x')
const btnForm = document.querySelectorAll(".btn__form")
const popupBody = document.querySelector('.popup__body')
const popup = document.querySelector('.popup')
const body = document.body;

// Открытие и закрытие меню-бургер==============

if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active')
        menuBtn.classList.toggle('active')
        body.classList.toggle('lock')
    })
    menuLink.forEach(link => link.addEventListener('click', () => {
        menu.classList.remove('active')
        menuBtn.classList.remove('active')
        body.classList.remove('lock')
    }))
    logoLink.forEach(link => link.addEventListener('click', () => {
        menu.classList.remove('active')
        menuBtn.classList.remove('active')
        body.classList.remove('lock')
    }))
    popupX.addEventListener('click', () => {
        popup.classList.remove('open')
        body.classList.remove('lock')
        header.classList.remove('close');
    })
    btnForm.forEach(link => link.addEventListener('click', () => {
        popup.classList.add('open')
        body.classList.add('lock')
        header.classList.add('close')
        backgroundClosePopup();
    }))

    function backgroundClosePopup() {
        const popupActive = document.querySelector('.popup.open');
        popupActive.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
                popupActive.classList.remove('open');
                header.classList.remove('close');
            }
        })
    }

}

// Попап с формой обратной связи================

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('popup__form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);


        if (error === 0) {
            popupBody.classList.add('_sending');
            let responce = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (responce.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                popupBody.classList.remove('_sending');
            } else {
                alert("Ошибка");
                popupBody.classList.remove('_sending');
            }
        } else {
            alert('Заполните обязательные поля');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.getAttribute('type') === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            }
            else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }


    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
});

// Слайдер с карточками направлений==============

const initSlider = () => {
    const slideBody = document.querySelector('.slider__body');
    const slideButtons = document.querySelectorAll('.slider__arrow');
    const sliderScrollbar = document.querySelector('.slider__scrollbar');
    const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar__thumb');
    const maxScrollLeft = (slideBody.scrollWidth - 1) - slideBody.clientWidth;

    scrollbarThumb.addEventListener('mousedown', (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            scrollbarThumb.style.left = `${boundedPosition}px`;
            slideBody.scrollLeft = scrollPosition;
        }

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "left__arrow" ? -1 : 1;
            const scrollAmount = slideBody.clientWidth * direction;
            slideBody.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
    const handleSlideButtons = () => {
        slideButtons[0].style.opacity = slideBody.scrollLeft <= 0 ? '50%' : '100%';
        slideButtons[1].style.opacity = slideBody.scrollLeft >= maxScrollLeft ? '50%' : '100%';

        if (slideButtons[0].style.opacity == 1) {
            slideButtons[0].classList.add('-active');


        } else {
            slideButtons[0].classList.remove('-active');
        }

        if (slideButtons[1].style.opacity == 1) {
            slideButtons[1].classList.add('-active');

        } else {
            slideButtons[1].classList.remove('-active');
        }

    }



    const updateScrollThumbPosition = () => {
        const scrollPosition = slideBody.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    slideBody.addEventListener('scroll', () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });

}


window.addEventListener("load", initSlider);


// Виджет Яндекс-карты======================================================

let center = [60.010866, 30.480450];
function init() {
    var map = new ymaps.Map("map", {
        center: center,
        zoom: 17
    });
    let placemark = new ymaps.Placemark(center, {}, {
        iconLayout: 'default#image',
        iconImageHref: '../Images/icon/Map pointer.png',
        iconImageSize: [50, 50],
        iconImageOffset: [-5, -50]
    })
    map.geoObjects.add(placemark);
    // map.controls.remove('geolocationControl');
    // map.controls.remove('searchControl');
    // map.controls.remove('trafficControl');
    // map.controls.remove('geolocationControl');
    // map.controls.remove('geolocationControl');
}
ymaps.ready(init);




