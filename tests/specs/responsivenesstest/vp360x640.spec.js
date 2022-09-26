// @ts-check
const test= require("../../utils/basetest")
const { expect } = require("@playwright/test") 

test.describe('Responsiveness test for ViewPort Size:( 360 x 640 )',async()=>{
    test.use({ viewport: { width: 360, height: 640 } });
    test('For small screen the mail will be hide from the page', async ({ loginPage }) => {
      await loginPage.accessLoginPage("/client")
      expect(await loginPage.emailAddressLocator(),'Email Address is showing in the top header').not.toBeVisible()
    });
  
    test('Verify Register button is working properly for all screen size', async ({ loginPage,registerPage }) => {
      await loginPage.accessLoginPage("/client")
      await loginPage.clickRegisterButton()
      expect(await registerPage.getRegisterBtnLocator()).toHaveValue("Register")
      expect(await registerPage.getRegisterBtnLocator(),'Register button is not showing').toBeVisible()
    });
  
    test('Verify Forget Password is working properly for all screen size', async ({ loginPage,forgetPassPage }) => {
      await loginPage.accessLoginPage("/client")
      await loginPage.clickForgetPasswordButton()
      expect(await forgetPassPage.getNewPasswordCardTitleLocator()).toHaveText("Enter New Password")
      expect(await forgetPassPage.getNewPasswordCardTitleLocator(),'Enter New Password text is not showing').toBeVisible()
    });
  
    test('Verify user can’t login to the app using invalid credential for all screen size', async ({ loginPage }) => {
      await loginPage.accessLoginPage("/client")
      await loginPage.enterEmail("sdygsdhjydg@gmail.com")
      await loginPage.enterPassword("78687dshjdhjds")
      await loginPage.clickLoginButton()
      expect(await loginPage.getToastMsgLocator()).toHaveText("Incorrect email or password.")
  
    });
  
    test('Verify user can login to the app using valid credential for all screen size', async ({ loginPage }) => {
      await loginPage.accessLoginPage("/client")
      await loginPage.enterEmail("example1@gmail.com")
      await loginPage.enterPassword("Aa@18")
      await loginPage.clickLoginButton()
      await loginPage.page.waitForNavigation()
      expect(await loginPage.getToastMsgLocator()).toHaveText("Login Successfully")
      
    });
})

