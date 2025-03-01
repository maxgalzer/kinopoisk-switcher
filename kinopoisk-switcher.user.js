// ==UserScript==
// @name         Kinopoisk Domain Switcher
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Добавляет ярлыки для смены домена на skinopoisk и kinopoisk.run
// @author       kannos
// @match        https://www.kinopoisk.ru/*
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kinopoisk.ru
// @updateURL    https://raw.githubusercontent.com/maxgalzer/kinopoisk-switcher/main/kinopoisk-switcher.user.js
// @downloadURL  https://raw.githubusercontent.com/maxgalzer/kinopoisk-switcher/main/kinopoisk-switcher.user.js
// ==/UserScript==
(function() {
    'use strict';

    // Проверка пути URL
    const path = window.location.pathname;
    if (!/^\/(series|film)\//.test(path)) return;

    // Создание контейнера для ярлычков
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.right = '0';
    container.style.top = '50%';
    container.style.transform = 'translateY(-50%)';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    // Функция для создания ярлычка
    function createButton(label, modifyUrl) {
        const button = document.createElement('div');
        button.textContent = label;
        button.style.width = '60px';
        button.style.height = '60px';
        button.style.background = 'white';
        button.style.color = 'black';
        button.style.border = '2px solid black';
        button.style.fontSize = '20px';
        button.style.fontWeight = 'bold';
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.justifyContent = 'center';
        button.style.cursor = 'pointer';
        button.style.borderRadius = '5px 0 0 5px';
        button.style.transition = 'transform 0.3s ease';
        button.style.position = 'relative';
        button.style.right = '0';

        // Эффект выдвижения при наведении
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateX(-10px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateX(0)';
        });

        // Открытие в новой вкладке при клике
        button.addEventListener('click', () => {
            const newUrl = modifyUrl(window.location.href);
            window.open(newUrl, '_blank');
        });
        return button;
    }

    // Функция изменения домена
    function modifyToS(url) {
        return url.replace(/(https?:\/\/)(www\.)?kinopoisk\.ru/, '$1www.wkinopoisk.ru');
    }
    function modifyToN(url) {
        return url.replace(/(https?:\/\/)(www\.)?kinopoisk\.ru/, '$1www.kinopoisk.run');
    }

    // Создание кнопок
    const buttonS = createButton('W', modifyToS);
    const buttonN = createButton('N', modifyToN);

    // Добавление кнопок в контейнер
    container.appendChild(buttonS);
    container.appendChild(buttonN);
})();
