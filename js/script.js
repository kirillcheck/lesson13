window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');

        }
    }

    hideTabContent(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = '2019-03-25';

    let getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector(' .hours '),
            minutes = timer.querySelector(' .minutes '),
            seconds = timer.querySelector(' .seconds '),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            if (t.hours < 10) {
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;

            }
            if (t.minutes < 10) {
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }

            if (t.seconds < 10) {
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }


            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);


    //modal 

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });




    let Info = document.querySelector('.info');

    Info.addEventListener('click', function (event) {
        let target = event.target;
        if (target.classList.contains('description-btn')) {
            // если цель по которой мы кликнули содержит класс description-btn 
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });


    //form

    // let message = {
    //     loading: ' Загрузка... ',
    //     success: ' Спасибо! Скоро мы с вами свяжемся! ',
    //     failure: ' Что-то пошло не так... '
    // };

    // let form = document.querySelector(' .main-form'),
    //     inputForm = form.getElementsByTagName('input')[0],
    //     input = document.getElementsByName('input'),
    //     statusMessage = document.createElement('div'),
    //     inputsPhone = document.querySelectorAll('input[name="phone"]'),
    //     formFooter = document.getElementById('form');
    // statusMessage.classList.add('status');

    // console.log(inputsPhone);

    // let ajaxRequest = (arg) => {
    //     arg.addEventListener('submit', function (event) {
    //         event.preventDefault();

    //         arg.appendChild(statusMessage);


    //         let request = new XMLHttpRequest();
    //         request.open('POST', 'server.php');
    //         request.setRequestHeader('Content-type', ' application/x-www-form-urlencoded ');

    //         let formData = new FormData(arg);

    //         let obj = {};
    //         formData.forEach(function (value, key) {
    //             obj[key] = value;
    //         });

    //         let json = JSON.stringify(obj);

    //         console.log(json);

    //         request.send(json);

    //         request.addEventListener('readystatechange', function () {
    //             console.log('test');
    //             if (request.readyState < 4) {
    //                 statusMessage.textContent = message.loading;
    //             } else if (request.readyState === 4 && request.status == 200) {
    //                 statusMessage.textContent = message.success;
    //             } else {
    //                 statusMessage.textContent = message.failure;
    //             }
    //         });

    //         inputForm.value = '';
    //     });

    // };

    // ajaxRequest(form);
    // ajaxRequest(formFooter);

    // for (let i = 0; i < inputsPhone.length; i++) {
    //     inputsPhone[i].addEventListener('input', (e) => {
    //         if (/\D/.test(e.target.value)) {
    //             e.target.value = '';
    //         }
    //     });
    // }


    // через promise
    let message = {
        loading: ' Загрузка... ',
        success: ' Спасибо! Скоро мы с вами свяжемся! ',
        failure: ' Что-то пошло не так... '
    };

    let form = document.querySelector(' .main-form'),
        inputForm = form.getElementsByTagName('input')[0],
        input = document.getElementsByName('input'),
        statusMessage = document.createElement('div'),
        inputsPhone = document.querySelectorAll('input[name="phone"]'),
        formFooter = document.getElementById('form');
    statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);

            function postData(data) {
                return new Promise(function (resolve, reject) {
                    let request = new XMLHttpRequest();

                    request.open('POST', 'server.php');

                    request.setRequestHeader('Content-type', ' application/x-www-form-urlencoded ');

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve()
                        } else if (request.readyState === 4) {
                            if (request.status == 200 && request.status < 3) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    };
                    request.send(data);
                });
            }
            //end postdata

            function clearInput() {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }

            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => {
                    statusMessage.innerHTML = '';
                })
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(clearInput)

        });

    }
    sendForm(form);
    sendForm(formFooter);



    // конец promise


    //slider
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');

    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function () {
        plusSlides(-1);
    });

    next.addEventListener('click', function () {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function (event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });


    //slider


    //calculate

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;


    totalValue.innerHTML = 0;


    // проверка на правильный ввод  

    persons.addEventListener('input', function (e) {
        if (/\d/.test(e.target.value)) {
            console.log(' число прошло проверку! ');

        } else {
            alert(' можно только число! знаки [+ , e] запрещены  ');
            e.target.value = '';
        }

    });

    restDays.addEventListener('input', function (e) {
        if (/\d/.test(e.target.value)) {
            console.log(' число прошло проверку! ');

        } else {
            alert(' можно только число! знаки [+ , e] запрещены  ');
            e.target.value = '';
        }

    });

    // конец проверки на правильный ввод


    // persons.addEventListener('input', function () {
    //     let pattern = /[0-9]/g,
    //         numberPersons = +this.value;
    //     if (pattern.test(numberPersons)) {
    //         console.log(' нельзя вводить дробные числа , + , e ');

    //     }

    //     console.log(pattern.test(numberPersons));
    //     console.log(numberPersons);

    // });


    persons.addEventListener('change', function () {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;


        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {


            totalValue.innerHTML = total;
        }


    });


    restDays.addEventListener('change', function () {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });


    place.addEventListener('change', function () {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });


    //calculate



});