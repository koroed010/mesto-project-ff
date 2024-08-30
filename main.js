(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var o={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-21",headers:{authorization:"c63a6862-2b22-43ae-9822-2abd2ea69ca7","Content-Type":"application/json"}},r=document.querySelector("#card-template").content,c=document.querySelector(".popup_type_confirm"),a="",u="";function i(e,t,n,o,c){var a=r.querySelector(".places__item").cloneNode(!0),u=a.querySelector(".card__image"),i=a.querySelector(".card__delete-button");return u.src=e.link,u.alt="фотография места - "+e.name,a.querySelector(".card__title").textContent=e.name,a.querySelector(".card__likes_amount").textContent=e.likes.length,a.querySelector(".card__id").textContent=e._id,e.owner._id===c?i.addEventListener("click",t):i.setAttribute("disabled",!0),a.querySelector(".card__like-button").addEventListener("click",n),u.addEventListener("click",(function(){o(e.link,e.name)})),a}function l(t){return a=t.target.closest(".places__item"),u=a.querySelector(".card__id"),e(c),u.textContent}function s(e){var t=e.target.closest(".places__item"),n=t.querySelector(".card__id").textContent,r=t.querySelector(".card__likes_amount"),c="PUT";e.target.classList.contains("card__like-button_is-active")&&(c="DELETE"),function(e,t){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:t,headers:o.headers}).then((function(e){return e.json()})).catch((function(e){console.log(e)}))}(n,c).then((function(e){r.textContent=e.likes.length})),e.target.classList.toggle("card__like-button_is-active")}function d(e,t){var n=t.inputSelector,o=t.inputErrorClass,r=t.errorClass;Array.from(e.querySelectorAll(n)).forEach((function(t){if(t.classList.contains(o)){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(o),n.classList.remove(r),n.textContent=""}}))}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var f=document.querySelector(".places__list"),m=document.querySelectorAll(".popup"),_=document.querySelector(".profile__edit-button"),y=document.querySelector(".popup_type_edit"),v=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),b=document.querySelector(".profile__image"),S=y.querySelector(".popup__button"),q=document.forms.editProfile,C=q.name,g=q.description,E="",L=document.querySelector(".popup_type_profile_image-edit"),k=L.querySelector(".popup__button"),x=document.forms.profileImageEdit,A=x.link,j=document.querySelector(".profile__add-button"),P=document.querySelector(".popup_type_new-card"),w=P.querySelector(".popup__button"),T=document.forms.newPlace,U=T.placeName,O=T.link,D=document.querySelector(".popup_type_image"),N=document.querySelector(".popup_type_confirm"),B=document.forms.confirm,I=new Promise((function(e){e(fetch("".concat(o.baseUrl,"/users/me"),{method:"GET",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})))})),M=new Promise((function(e){e(fetch("".concat(o.baseUrl,"/cards"),{method:"GET",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)})))}));Promise.all([I,M]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];v.textContent=r.name,h.textContent=r.about,b.style="background-image: url(".concat(r.avatar,")"),E=r._id,c.forEach((function(e){f.append(i(e,l,s,Q,E))}))}));var J,G,H,V,z,$,F,K={inputSelector:".popup__input",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function Q(t,n){document.querySelector(".popup__image").src=t,document.querySelector(".popup__caption").textContent=n,e(D)}_.addEventListener("click",(function(){C.value=v.textContent,g.value=h.textContent,S.textContent="Сохранить",d(q,K),e(y)})),j.addEventListener("click",(function(){U.value="",O.value="",w.textContent="Сохранить";var t=T.querySelector(".popup__button");t.disabled=!0,t.classList.add("popup__button_disabled"),d(T,K),e(P)})),b.addEventListener("click",(function(){A.value="",k.textContent="Сохранить",d(x,K),e(L)})),q.addEventListener("submit",(function(e){e.preventDefault(),S.textContent="Сохранение...",function(e,t){return console.log(e.value),fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:e.value,about:t.value})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))}(C,g).then((function(){v.textContent=C.value,h.textContent=g.value})),t(y)})),T.addEventListener("submit",(function(e){e.preventDefault(),w.textContent="Сохранение...",function(e,t){return fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:e.value,link:t.value})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).catch((function(e){console.log(e)}))}(U,O).then((function(e){document.querySelector(".places__list").prepend(i(e,l,s,Q,E))})),t(P)})),x.addEventListener("submit",(function(e){e.preventDefault(),k.textContent="Сохранение...",function(e){return fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:e.value})}).then((function(e){return e.json()})).catch((function(e){console.log(e)}))}(A).then((function(e){b.style="background-image: url(".concat(e.avatar,")")})),t(L)})),m.forEach((function(e){e.addEventListener("click",(function(n){var o=n.target.classList.value;(o.includes("popup_is-opened")||"popup__close"===o)&&t(e)}))})),G=(J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}).formSelector,H=J.inputSelector,V=J.submitButtonSelector,z=J.inactiveButtonClass,$=J.inputErrorClass,F=J.errorClass,Array.from(document.querySelectorAll(G)).forEach((function(e){var t=Array.from(e.querySelectorAll(H)),n=e.querySelector(V);t.forEach((function(o){o.addEventListener("input",(function(){if(o.validity.patternMismatch?o.setCustomValidity(o.dataset.errorMessage):o.setCustomValidity(""),o.validity.valid){var r=e.querySelector(".".concat(o.id,"-error"));o.classList.remove($),r.classList.remove(F),r.textContent=""}else{var c=e.querySelector(".".concat(o.id,"-error"));o.classList.add($),c.textContent=o.validationMessage,c.classList.add(F)}t.some((function(e){return!e.validity.valid}))?(n.disabled=!0,n.classList.add(z)):(n.disabled=!1,n.classList.remove(z))}))}))})),B.addEventListener("submit",(function(e){e.preventDefault(),function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e.textContent),{method:"DELETE",headers:o.headers}).catch((function(e){console.log(e)}))}(u).then((function(){a.remove(),B.removeEventListener("submit",e)})),t(N)}))})();