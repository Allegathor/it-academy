require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({20:[function(require,module,exports) {
var e=document.querySelector(".js-data-btn"),n=function(e){var n={},r=parseInt(e.age,10);n.main="ФИО: "+e.name+" "+e.surname+" "+e.patr,n.ageYears="Возраст, лет: "+e.age,n.ageDays="Возраст, дней: "+365*r,!0===e.gender?n.gender="Пол: мужской":!1===e.gender&&(n.gender="Пол: женский"),e.gender&&r>=61?n.retirement="Пенсионный возраст: да":!e.gender&&r>=56?n.retirement="Пенсионный возраст: да":n.retirement="Пенсионный возраст: нет",alert(n.main+"\n"+n.ageYears+"\n"+n.ageDays+"\n"+n.gender+"\n"+n.retirement)},r=function(){var e={};e.name=prompt("Введите имя",""),null!==e.name&&(e.surname=prompt("Введите фамилию",""),null!==e.surname&&(e.patr=prompt("Введите отчество",""),null!==e.patr&&(e.age=prompt("Введите возраст",""),null!==e.age&&(e.gender=confirm("Вы мужчина?"),null!==e.gender&&e&&n(e)))))};r(),e.addEventListener("click",function(e){r()});
},{}]},{},[20])