const {Builder, By, until, Key} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

let o = new chrome.Options();
o.addArguments('start-fullscreen');
o.addArguments('disable-infobars')
//  o.addArguments('headless');
o.setUserPreferences({ credential_enable_service: false} )

var Page = function() {
    
    this.driver = new Builder()
        .setChromeOptions(0)
        .forBrowser('chrome')
        .build()
    
    this.visit = async theUrl => await this.driver.get(theUrl)

    this.quit = async () => await this.driver.quit()

    this.findById = async id => {
        await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for Element')
        return await this.driver.findElement(By.id(id))
    }

    this.findByName = async name => {
        await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element')
        return await this.driver.findElement(By.name(name))
    }

    this.write = async (el, txt) => await el.sendKeys(txt)

    this.enter = async el => await el.sendKeys(Key.ENTER)
}

module.exports = Page