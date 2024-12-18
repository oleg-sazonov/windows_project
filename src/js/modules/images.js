'use strict';

import { calcScroll } from "./modals";

const images = () => {
	const imgPopup = document.createElement('div'),
		  worksSection = document.querySelector('.works'),
		  bigImage = document.createElement('img'),
		  scroll = calcScroll();

	imgPopup.classList.add('popup');
	worksSection.append(imgPopup);

	imgPopup.style.justifyContent = 'center';
	imgPopup.style.alignItems = 'center';
	imgPopup.style.display = 'none';
	imgPopup.style.objectFit = 'cover';

	imgPopup.append(bigImage);

	worksSection.addEventListener('click', e => {
		e.preventDefault();

		let target = e.target;

		if (target && target.classList.contains('preview')) {
			imgPopup.style.display = 'flex';
			document.body.style.overflow = 'hidden';
			document.body.style.marginRight = `${scroll}px`;
			const path = target.parentNode.getAttribute('href');
			bigImage.setAttribute('src', path);
		}

		if (target && target.matches('div.popup')) {
			imgPopup.style.display = 'none';
			document.body.style.overflow = '';
			document.body.style.marginRight = `0px`;
		}
	});
};

export default images;

