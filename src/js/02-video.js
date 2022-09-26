'use strict';

import Player from '@vimeo/player';
import throttle from 'lodash.throttle'
// const throttle = require('lodash.throttle')
// console.log(throttle)

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// player.on('timeupdate', onTimeUpdate);
player.on('timeupdate', throttle(onTimeUpdate, 1000));
function onTimeUpdate (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds)
    // console.log(localStorage)
}

const timeUpd = Number(localStorage.getItem('videoplayer-current-time'))

player.setCurrentTime(timeUpd).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

// 1. +Ознакомься с документацией библиотеки Vimeo плеера. https://github.com/vimeo/player.js/#vimeo-player-api
// 2. +Добавь библиотеку как зависимость проекта через npm.
// 3. +Инициализируй плеер в файле скрипта как это описано 
//    в секции pre-existing player, но учти что у тебя плеер 
//    добавлен как npm пакет, а не через CDN.
// 4. +Разбери документацию метода on() и начни отслеживать 
//    событие timeupdate - обновление времени воспроизведения.
        // player.on('play'
        // // 'play' - Triggered when video playback is initiated.
        // // 'playing' - Triggered when the video starts playing.
        // // 'pause' - Triggered when the video pauses.
        // // 'ended' - Triggered any time the video playback reaches the end. Note: when loop is turned on, the ended event will not fire.
        // // 'timeupdate' - Triggered as the currentTime of the video updates. It generally fires every 250ms, but it may vary depending on the browser.
        // // 'progress' - Triggered as the video is loaded. Reports back the amount of the video that has been buffered
        // // 'seeking' - Triggered when the player starts seeking to a specific time. A timeupdate event will also be fired at the same time.
        // // 'seeked' - Triggered when the player seeks to a specific time. A timeupdate event will also be fired at the same time.
        // // and some more...
        // , onPlay);
        // function onPlay (data) {
        //     console.log('video started to play!');
        //     console.log(data)
        // }
// 5. +Сохраняй время воспроизведения в локальное хранилище. 
//    Пусть ключом для хранилища будет строка "videoplayer-current-time".
// 6. +При перезагрузке страницы воспользуйся методом setCurrentTime() 
//    для того чтобы возобновить воспроизведение с сохраненной позиции.
// 7. +Добавь в проект бибилотеку lodash.throttle и сделай так, 
//    чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду.
