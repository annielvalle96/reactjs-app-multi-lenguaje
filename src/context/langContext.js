import { createContext, useState } from 'react';
// Importar los archivos con todos los mensajes de la app en su idioma correspondiente.
import MensajesIngles from './../lang/en-US.json';
import MensajesEspañol from './../lang/es-MX.json';
import { IntlProvider } from 'react-intl';

// Definir el contexto. Variable que me permite tener un estado 
// global de los idiomas.
const langContext = createContext();

// Definiendo el contenedor que proveerá los idiomas.
// Hay que pasarle la propiedad: children la cual contiene todos los elementos hijos que contendrá el componente: LangProvider.
// El nombre de la función proveedora del contexto tiene que ser tipo: PascalCase.
const LangProvider = ({ children }) => {
	let localePorDefecto;
	let mensajesPorDefecto;
	const lang = localStorage.getItem('lang');

	if (lang) {
		localePorDefecto = lang

		if (lang === 'es-MX') {
			mensajesPorDefecto = MensajesEspañol;
		} else if (lang === 'en-US') {
			mensajesPorDefecto = MensajesIngles
		} else {
			localePorDefecto = 'en-US'
			mensajesPorDefecto = MensajesIngles
		}
	}

	// Variable de estado que contendrá los mensajes de toda la app en el 
	// idioma correspondientes.
	const [mensajes, establecerMensajes] = useState(mensajesPorDefecto);
	// Variable de estado que contendrá el idioma configurado.
	const [locale, establecerLocale] = useState(localePorDefecto);

	const establecerLenguaje = (lenguaje) => {
		switch (lenguaje) {
			case 'es-MX':
				establecerMensajes(MensajesEspañol);
				establecerLocale('es-MX');
				localStorage.setItem('lang', 'es-MX');
				break;
			case 'en-US':
				establecerMensajes(MensajesIngles);
				establecerLocale('en-US');
				localStorage.setItem('lang', 'en-US');
				break;
			default:
				establecerMensajes(MensajesIngles);
				establecerLocale('en-US');
				localStorage.setItem('lang', 'en-US');
		}
	}

	return (
		// Acceder al contexto.
		// La propiedad: establecerLenguaje es el valor del lenguaje que queremos pasar a toda la app.
		// OJO: las variables locale y messages, van con este mismo nombres.
		<langContext.Provider value={{ establecerLenguaje: establecerLenguaje }}>
			<IntlProvider locale={locale} messages={mensajes}>
				{children}
			</IntlProvider>
		</langContext.Provider>
	);
}

export { LangProvider, langContext };
