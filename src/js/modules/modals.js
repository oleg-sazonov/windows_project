'use strict';

export function calcScroll() {
	let div = document.createElement('div');

	div.style.width = '50px';
	div.style.height = '50px';
	div.style.overflowY = 'scroll';
	div.style.visibility = 'hidden';

	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;
	div.remove();

	return scrollWidth;
}

const modals = (state) => {
	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
		const trigger = document.querySelectorAll(triggerSelector),
			  modal = document.querySelector(modalSelector),
		  	  close = document.querySelector(closeSelector),
			  windows = document.querySelectorAll('[data-modal]'),
			  requiredInputsMessage = document.querySelectorAll('.required-inputs__message'),
			  scroll = calcScroll();

		const statusMessage = document.createElement('div');
		statusMessage.classList.add('status');
		statusMessage.textContent = 'Необходимо заполнить все поля!';

		function handlePopupInputs (popupSelector, i) {
			document.querySelector(popupSelector).style.display = 'block';
			document.body.style.overflow = 'hidden';
			if (!requiredInputsMessage[i].querySelector('.status')) {
				requiredInputsMessage[i].append(statusMessage);
			}
		}

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				windows.forEach(item => {
					item.style.display = 'none';
				});

				if (item.classList.contains('popup_calc_button') && Object.keys(state).length < 3) {
					handlePopupInputs('.popup_calc', 0);
				} else if (item.classList.contains('popup_calc_profile_button') && Object.keys(state).length < 5) {
					handlePopupInputs('.popup_calc_profile', 1);
				} else {
					modal.style.display = 'block';
					document.body.style.overflow = 'hidden';
					document.body.style.marginRight = `${scroll}px`;
					statusMessage.remove();
				}
			});
		})

		close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
			});

			modal.style.display = 'none';
			document.body.style.overflow = '';
			document.body.style.marginRight = `0px`;
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay) {
				windows.forEach(item => {
					item.style.display = 'none';
				});

				modal.style.display = 'none';
				document.body.style.overflow = '';
				document.body.style.marginRight = `0px`;
			}
		});
	}

	function showModalByTime(selector, time) {
		setTimeout(() => {
			document.querySelector(selector).style.display = 'block';
			document.body.style.overflow = 'hidden';
		}, time);
	}

	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
	showModalByTime('.popup', 60000);
};

export default modals;