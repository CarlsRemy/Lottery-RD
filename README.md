# Lottery-RD

lottery-rd es una librería diseñada para obtener y manejar resultados de las principales loterías de la República Dominicana. Con esta herramienta, los desarrolladores pueden integrar fácilmente en sus aplicaciones la capacidad de consultar los sorteos más recientes de diversas loterías dominicanas, incluyendo opciones como "La Primera", "Lotería Real", "Leidsa", "LotoDom", "Gana Más", entre otras. La librería ofrece funciones para recuperar números ganadores, premios acumulados, y otras variantes como el "Más" y "Super Más". Es ideal para aquellos que buscan simplificar la interacción con datos de loterías dentro del ecosistema de la RD.


Los resultados son Obtenidos de [loteriasdominicanas](https://loteriasdominicanas.com/)

## Nota:
La plataforma Puede no responer en algunas ocaciones ya que esta **no es un api**, es un web scrapping. por lo tanto los resultados no son en tiempo real.


## Ejemplos de Uso
Las funciones solo requieren una fecha en formato **dd-mm-yyyy** o un object **Date**.

Estas retornaran un array de objetos para la fecha indicada o la fecha mas cercana a estas de no haber resultados disponibles.

### getLotomasLeidsa
```js
	const { getLotomasLeidsa } = require("../src/lottery-rd")
	const response = await getLotomasLeidsa(`08-20-2024`)
	/* reponse
	[{
			name: 'Loto - Super Loto Más',
			date: '17-08-2024',
			numbers: ['07', '14', '15', '19', '27', '35'],
			plus: '07',
			superplus: '10'
	}]
	*/
```

## Funciones 
Esta liberia cuenta con funciones de consulta de diferentes sorteos de loterías en la República Dominicana y otras loterías relevantes.

- **getAllLotteries:** Recupera los resultados de todos los sorteos disponibles en la plataforma.
- **getGanaMas:** Obtiene los resultados del sorteo "Gana Más".
- **getNacional:** Recupera los resultados de la "Lotería Nacional".
- **getPegaMas:** Obtiene los resultados del sorteo "Pega Más".
- **getLotomasLeidsa:** Recupera los resultados del "LotoMás" de Leidsa.
- **getLotoPoolLeidsa:** Recupera los resultados del "LotoPool" de Leidsa.
- **getQuinielaPale:** Obtiene los resultados del sorteo "Quiniela y Palé".
- **getSuperKinoTVLeidsa:** Recupera los resultados del "Super Kino TV" de Leidsa.
- **getSuperPaleLeidsa:** Recupera los resultados del "Super Palé" de Leidsa.
- **getPega3MasLeidsa:** Obtiene los resultados del sorteo "Pega 3 Más" de Leidsa.
- **getReal:** Recupera los resultados de la "Lotería Real".
- **getLotoReal:** Recupera los resultados del "Loto Real".
- **getNYReal:** Recupera los resultados del "New York Real".
- **getLotoPoolReal:** Obtiene los resultados del "LotoPool" de la Lotería Real.
- **getPega4Real:** Recupera los resultados del sorteo "Pega 4 Real".
- **getSuperPaleReal:** Obtiene los resultados del "Super Palé" de la Lotería Real.
- **getFloridaDia:** Recupera los resultados de la "Lotería Florida Día".
- **getFloridaNoche:** Recupera los resultados de la "Lotería Florida Noche".
- **getNewYorkDia:** Obtiene los resultados de la "Lotería New York Día".
- **getNewYorkNoche:** Recupera los resultados de la "Lotería New York Noche".
- **getQuinielaLoteka:** Obtiene los resultados del sorteo "Quiniela Loteka".
- **getMegaChanceLoteka:** Recupera los resultados del "MegaChance Loteka".
- **getToca3Loteka:** Obtiene los resultados del sorteo "Toca 3 Loteka".
- **getMCRepatideraLoteka:** Recupera los resultados del "MC Repatidera Loteka".
- **getMegaLotoLoteka:** Obtiene los resultados del "MegaLoto Loteka".
- **getPrimeraDia:** Recupera los resultados del sorteo "La Primera Día".
- **getPrimeraNoche:** Recupera los resultados del sorteo "La Primera Noche".
- **getQuinielonDia:** Obtiene los resultados del sorteo "Quinielón Día".
- **getQuinielonNoche:** Recupera los resultados del sorteo "Quinielón Noche".
- **getLoto5:** Recupera los resultados del sorteo "Loto 5".
- **getSuerteDia:** Obtiene los resultados del sorteo "La Suerte Día".
- **getSuerteNoche:** Recupera los resultados del sorteo "La Suerte Noche".
- **getLoteDom:** Recupera los resultados de la "Lotería LoteDom".
- **getQuemaito:** Obtiene los resultados del sorteo "Quemaito".
- **getSuperPaleLotedom:** Recupera los resultados del "Super Palé" de LoteDom.
- **getAgarra4Lotedom:** Obtiene los resultados del sorteo "Agarra 4 LoteDom".
- **getAnguilaDia:** Recupera los resultados del sorteo "Anguila Día".
- **getAnguila12AM:** Recupera los resultados del sorteo "Anguila 12 AM".
- **getAnguilaTarde:** Obtiene los resultados del sorteo "Anguila Tarde".
- **getAnguilaNoche:** Recupera los resultados del sorteo "Anguila Noche".
