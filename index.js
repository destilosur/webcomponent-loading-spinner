import './componets/SpinnerComponent.js';

// usendo spinner

const img = document.querySelector('article img');
const svgSpinner = document.querySelector('spinner-component');

window.addEventListener('load', () => {
	img?.classList.toggle('show');
	getImag();
});

img.addEventListener('click', (e) => {
	svgSpinner.classList.toggle('show');
	img?.classList.toggle('show');
	setTimeout(() => {
		getImag();
		img?.classList.toggle('show');

		svgSpinner.classList.toggle('show');
	}, 3000);
});

const getImag = () => {
	const url = 'https://picsum.photos/800/400';
	img.setAttribute('src', url);
};
