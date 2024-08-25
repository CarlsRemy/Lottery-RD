const axios = require('axios');
const cheerio = require('cheerio');

function validateDate(date) {
	if (!(date instanceof Date) && isNaN(date) && date > new Date()) {
		throw new Error('Invalid date');
	}

	if (typeof param === 'string') {
		const parsedDate = new Date(param);
		if (!isNaN(parsedDate)) {
			throw new Error('Invalid date');
		}
	}
}

function clearText(text = "") {
	return text.replace(/\s+/g, ' ').trim();
}

const axiosInstance = axios.create({
	baseURL: 'https://loteriasdominicanas.com',
	timeout: 15000,
	headers: {
		'Content-Type': 'text/html; charset=utf-8',
		'Accept': 'text/html',
	}
});

const _getLottery = (html = "", year, recursive = false) => {
	const Lottery = [];
	let results = {}
	const $ = cheerio.load(html);
	if ($) {

		if (recursive) {
			let Elements = $(".game-block", "section>.row")

			Elements.each((i, elem) => {
				results = {}
				let $elem = $(elem);
				let date = clearText($elem.find(".session-date").first().text());

				results.name = clearText($elem.find(".game-title>span").first().text());
				results.date = `${date}-${year}`
				results.numbers = []

				let numbers = $elem.find(".game-scores>span")

				numbers.each((i, num) => {
					num = clearText($(num).text())
					results.numbers.push(num);
				});

				Lottery.push(results);
			});
		} else {
			let Elements = $(".game-block", "section>.row").first()
			results = {}
			let $elem = $(Elements);
			let date = clearText($elem.find(".session-date").first().text());

			results.name = clearText($elem.find(".game-title>span").first().text());
			results.date = `${date}-${year}`
			results.numbers = []

			let numbers = $elem.find(".game-scores>span")

			numbers.each((i, num) => {
				num = clearText($(num).text())
				results.numbers.push(num);
			});

			Lottery.push(results);
		}
	}
	return Lottery
}

const _getLoto = (html = "", year) => {
	const Lottery = [];
	let results = {}
	const $ = cheerio.load(html);
	if ($) {
		let Elements = $(".game-block", "section>.row").first()
		results = {}
		let $elem = $(Elements);
		let date = clearText($elem.find(".session-date").first().text());

		results.name = clearText($elem.find(".game-title>span").first().text());
		results.date = `${date}-${year}`
		results.numbers = []

		let numbers = $elem.find(".game-scores>span")

		for (let i = 0; i < 6; i++) {
			num = clearText($(numbers[i]).text())
			results.numbers.push(clearText($(numbers[i]).text()));
		}
		results.plus = clearText($elem.find(".game-scores>.special2").last().text())

		const Super = clearText($elem.find(".game-scores>.special1").last().text())
		if (Super !== "") {
			results.superplus = Super
		}

		Lottery.push(results);
	}

	return Lottery
}

function getAllLotteries(date = new Date()) {
	validateDate(date);
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year, true)
		}).catch(error => { throw error; });
}

function getPegaMas(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loteria-nacional/juega-mas-pega-mas?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getGanaMas(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loteria-nacional/gana-mas?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getNacional(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loteria-nacional/quiniela?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}


function getQuinielaPale(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/leidsa/quiniela-pale?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getLotoPoolLeidsa(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/leidsa/loto-pool?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getPega3MasLeidsa(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/leidsa/pega-3-mas?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getSuperPaleLeidsa(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/leidsa/super-pale?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getSuperKinoTVLeidsa(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/leidsa/super-kino-tv?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getLotomasLeidsa(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/leidsa/loto-mas?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLoto(html, year)
		}).catch(error => { throw error; });

}

function getReal(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loto-real/quiniela?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getLotoReal(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loto-real/loto?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getNYReal(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loto-real/nueva-yol-real?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getLotoPoolReal(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loto-real/loto-pool?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getPega4Real(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loto-real/pega-4?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getSuperPaleReal(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loto-real/super-pale?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getQuinielaLoteka(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loteka/quiniela-mega-decenas?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getMegaChanceLoteka(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loteka/mega-chance?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getToca3Loteka(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loteka/toca-3?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });

}

function getMCRepatideraLoteka(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loteka/mega-chances-repartidera?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getMegaLotoLoteka(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/loteka/megalotto?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLoto(html, year)
		}).catch(error => { throw error; });
}

function getPrimeraDia(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/la-primera/quiniela-medio-dia?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getPrimeraNoche(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/la-primera/quiniela-noche?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getQuinielonDia(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/la-primera/el-quinielon-dia?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getQuinielonNoche(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/la-primera/el-quinielon-noche?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getLoto5(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/la-primera/loto-5?date=${date}`)
		.then(async response => {
			const html = await response.data
			const Lottery = [];
			let results = {}
			const $ = cheerio.load(html);
			if ($) {
				let Elements = $(".game-block", "section>.row").first()
				results = {}
				let $elem = $(Elements);
				let date = clearText($elem.find(".session-date").first().text());

				results.name = clearText($elem.find(".game-title>span").first().text());
				results.date = `${date}-${year}`
				results.numbers = []

				let numbers = $elem.find(".game-scores>span")

				for (let i = 0; i < 5; i++) {
					num = clearText($(numbers[i]).text())
					results.numbers.push(clearText($(numbers[i]).text()));
				}

				results.bonus = clearText($elem.find(".game-scores>.bonus").last().text())
				Lottery.push(results);
			}

			return Lottery
		}).catch(error => { throw error; });
}

function getSuerteDia(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/la-suerte-dominicana/quiniela?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getSuerteNoche(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/la-suerte-dominicana/quiniela-tarde?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getLoteDom(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/lotedom/quiniela?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getQuemaito(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/lotedom/el-quemaito-mayor?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getSuperPaleLotedom(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/lotedom/super-pale?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getAgarra4Lotedom(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/lotedom/agarra-4?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getAnguilaDia(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/anguila/anguila-manana?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getAnguila12AM(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/anguila/anguila-medio-dia?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });

}

function getAnguilaTarde(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/anguila/anguila-tarde?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getAnguilaNoche(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/anguila/anguila-noche?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getFloridaDia(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/americanas/florida-tarde?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getFloridaNoche(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/americanas/florida-noche?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}


function getNewYorkDia(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/americanas/new-york-medio-dia?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

function getNewYorkNoche(date = new Date()) {
	date = new Date(date);
	const year = date.getFullYear();
	date = `${date.getDate()}-${date.getMonth() + 1}-${year}`

	return axiosInstance.get(`/americanas/new-york-noche?date=${date}`)
		.then(async response => {
			const html = await response.data
			return _getLottery(html, year)
		}).catch(error => { throw error; });
}

module.exports = {
	getAllLotteries, getGanaMas, getNacional, getPegaMas,
	getLotomasLeidsa, getLotoPoolLeidsa, getQuinielaPale, getSuperKinoTVLeidsa, getSuperPaleLeidsa, getPega3MasLeidsa,
	getReal, getLotoReal, getNYReal, getLotoPoolReal, getPega4Real, getSuperPaleReal,
	getFloridaDia, getFloridaNoche, getNewYorkDia, getNewYorkNoche,
	getQuinielaLoteka, getMegaChanceLoteka, getToca3Loteka, getMCRepatideraLoteka, getMegaLotoLoteka,
	getPrimeraDia, getPrimeraNoche, getQuinielonDia, getQuinielonNoche, getLoto5,
	getSuerteDia, getSuerteNoche, getLoteDom, getQuemaito, getSuperPaleLotedom, getAgarra4Lotedom,
	getAnguilaDia, getAnguila12AM, getAnguilaTarde, getAnguilaNoche
}