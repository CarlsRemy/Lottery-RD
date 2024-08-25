// test.ts
const { expect, assert } = require("chai");
const { describe, it } = require("mocha");
const { getAllLotteries, getQuinielaPale, getLotomasLeidsa, getNacional } = require("../src/lottery-rd")


describe('Loto Leidsa', () => {
	it("Resultado del 08-20-2024", async () => {
		const response = await getLotomasLeidsa(`08-20-2024`)

		const data = [{
			name: 'Loto - Super Loto Más',
			date: '17-08-2024',
			numbers: ['07', '14', '15', '19', '27', '35'],
			plus: '07',
			superplus: '10'
		}]

		expect(response).to.deep.equal(data);
	})

	it("Resultado del 08-10-2024", async () => {
		const response = await getLotomasLeidsa(`08-10-2024`)

		const data = [{
			name: 'Loto - Super Loto Más',
			date: '10-08-2024',
			numbers: ['07', '10', '18', '19', '20', '28'],
			plus: '11',
			superplus: '12'
		}]

		expect(response).to.deep.equal(data);
	})
})

describe('Loteria Nacional', () => {
	it("Resultado del 08-20-2024", async () => {
		const response = await getNacional(`08-20-2024`)

		const data = [{
			name: 'Lotería Nacional',
			date: '20-08-2024',
			numbers: ['23', '58', '59']
		}]

		expect(response).to.deep.equal(data);
	})
})