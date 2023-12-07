import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router/Router';
// Importar el provedor de los idiomas.
import { LangProvider } from './context/langContext'

ReactDOM.render(
	<LangProvider>
		<Router />
	</LangProvider>
	, document.getElementById('root'));