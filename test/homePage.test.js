const { describe, it, after, before } = require('mocha')
const Page = require('../lib/homePage')
const chai = require ('chai')
const expect = chai.expect
const should = chai.should()
const assert = chai.assert

process.on('unhandledRejection', () => {});

(async function example() {
    try {
        describe ('Google search automated testing', async function () {
            this.timeout(50000)
            let driver, page

            // Hooks

            beforeEach (async () => {
                page = new Page()
                driver = page.driver
                await page.visit('https://www.google.com/')
            })

            afterEach(async () => {
                await page.quit()
            })

            // Tests

            it ('find the input box and google search button', async () => {
                const result = await page.findInputAndButton()
                expect(result.inputEnabled).to.equal(true)
                result.buttonText.should.include('Google')
            })

            it ('put keyword in search box and click search button', async () => {
                const result = await page.submitKeywordAndGetResult();
                assert.isAbove(result.length, 10)
            })
        })
    } catch (ex) {
        console.log(new Error(ex.message))
    } finally {

    }
})()