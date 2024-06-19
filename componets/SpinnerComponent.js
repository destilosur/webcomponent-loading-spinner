class SpinnerComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.num = 20;
	}

	static get style() {
		return /*css*/ `
        :host {
            
            
            width: 100%;
            height: 100%;
                  
            background-color:#29212e;
            
        }

        .container{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;      
        }
            
            
            .circle{
            opacity: 0.7;
            animacion: animacion3 6s infinite linear    0s;
            fill: none;
            stroke-linecap: square;
            transform-origin: 50% 50%;
       }

        .circle1,  .circle5,  .circle9, .circle12, .circle14, .circle18 .circle20{
            animation: animacion 6s infinite linear reverse   0s;
            
        }          
         .circle3,  .circle7,  .circle11 , .circle13 , .circle15 .circle19 {
             animation: animacion2 7s infinite linear ;
            
        }          
            
        

        .circle2, .circle4, .circle6, .circle8, .circle10, .circle16, .circle17{
            
                 animation: animacion 3s infinite linear .2s;


        }
       

        .linea {
            stroke-linecap: butt;
            opacity: 1;
            transform-origin: 50% 50%;  
            // animation: animacion 120s infinite linear reverse  0s;        
        }

        .transparent{
            opacity: 0.0;
        }

        @keyframes animacion {

           
            to {
               rotate: 360deg;
            }
        }
                
       

        @keyframes animacion2 {
            50% {
                opacity: 0.3;
                stroke-dasharray: 100;
                 stroke-dashoffset: 100;
            }
        }
        @keyframes animacion3 {
            to {
                opacity: 1;
            }
        }



        `;
	}

	randomRange = (min, max) => {
		return Math.random() * (max - min) + min;
	};

	reloj = () => {
		let cont = this.num;
		setInterval(() => {
			cont--;

			if (cont < 0) {
				cont = 20;
			}
			const lineas = this.shadowRoot.querySelectorAll(`#svgSpinner .linea`);
			lineas.forEach((linea) => {
				linea.classList.remove('transparent');
			});

			const linea = this.shadowRoot.querySelector(`#svgSpinner .linea${cont}`);

			linea?.classList.toggle('transparent');
		}, 125);
	};

	createSpinner() {
		const num = this.num;
		const svg = this.shadowRoot.querySelector('#svgSpinner');
		const width = svg.getAttribute('width');
		const height = svg.getAttribute('height');
		const cx = width / 2;
		const cy = height / 2;
		const radius = width / 2 - 10;
		let x, y;

		for (let i = 0; i < num; i++) {
			// Linea----------
			const CBig = 1.15;
			const xbig = Math.sin(((i + 0.1) / num) * 2 * Math.PI) * radius * CBig + cx;
			const ybig = Math.cos(((i + 0.1) / num) * 2 * Math.PI) * radius * CBig + cy;

			const CSmall = 0.9;
			const xsmall = Math.sin(((i + 0.1) / num) * 2 * Math.PI) * radius * CSmall + cx;
			const ysmall = Math.cos(((i + 0.1) / num) * 2 * Math.PI) * radius * CSmall + cy;

			// Circulo----------
			const C = radius * Math.PI * 2; //circunferencia

			const slice = (C / num) * i;

			const aleatorio = Math.round(this.randomRange(0, 2));

			const size = Number(this.randomRange(0.1, 1.0).toFixed(2));

			// circulo----------
			svg.innerHTML += `
            <circle cx="${cx}" cy="${cy}" r="${radius}" stroke-width= "${
				radius / 10
			}" class="circle circle${i + 1}" stroke="url(#degradado${Math.round(
				this.randomRange(1, 2),
			)})"  
            style="transform : scale(${size}) rotate(${360 / (i * aleatorio + 1)}deg)  "
            stroke-dasharray = "${C - slice * 0.1}" stroke-dashoffset= "${
				C - slice
			}"   />;

            // linea----------
            <line x1="${xbig}" y1="${ybig}" x2="${xsmall}" y2="${ysmall}" stroke-width= "${
				radius / 25
			}"; class=" linea linea${i}" stroke="url(#degradado3)" />           
            `;
		}
	}
	connectedCallback() {
		const size = this.getAttribute('data-size');
		this.render(size);
		this.createSpinner();

		this.reloj();
	}

	render(size) {
		this.shadowRoot.innerHTML = /*html*/ `
        <style>${SpinnerComponent.style}</style>
        <div class="container">		
            <svg width="${size}" height="${size}"  id="svgSpinner">
                <defs>
                    <linearGradient id="degradado1">
                        <stop offset="10%" stop-color="#C7EE95" />
                        <stop offset="70%" stop-color="#A3D798" />
                        <stop offset="180%" stop-color="#70C08D" />
                    </linearGradient>
                    <linearGradient id="degradado2">
                        <stop offset="10%" stop-color="#36857B" />
                        <stop offset="80%" stop-color="#70C08D" />
                        <stop offset="180%" stop-color="#054863" />
                    </linearGradient>
                    <radialGradient id="degradado3">
                    <stop offset="30%" stop-color="#A68A91" />
                    <stop offset="180%" stop-color="#3B2F40" />
                    </radialGradient>
                </defs>
            </svg>
        </div>

       `;
	}
}

window.addEventListener('load', () => {
	customElements.define('spinner-component', SpinnerComponent);
});
