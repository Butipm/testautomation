	@Test
	Feature: Motus
	for help, see: https://github.com/intuit/karate/wiki/IDE-Support
	'http://localhost:4200/home'

	Background:
		#* configure driver = { headless: true }

	@ignore
	Scenario: generateBTokenui
		Given driver "https://dev-motus.bmwgroup.net/"
		* delay(5000)
		* def actualUrl = driver.url
		* eval if (actualUrl === '') (driver.url = "https://dev-motus.bmwgroup.net/")
		* delay(1000)
		* refresh()
		* delay(3000)
		* def actualUrl = waitForUrl('https://auth.bmwgroup.net/')
		* def myLowerCaseactualUrl = actualUrl.toLowerCase()
		* eval
  """
  if (myLowerCaseactualUrl.includes('auth') && myLowerCaseactualUrl.includes('bmwgroup.net')) {
    waitFor(webLoc.iwa_logonButton)
    input(webLoc.iwa_userName, iwaUserName)
    input(webLoc.iwa_password, iwaPassWord)
    click(webLoc.iwa_logonButton)

    // Wait for the redirection
     waitFor(webLoc.open);

  }
  """
    * def temp = "localStorage.getItem('access_token')"
    * def accessToken = script(temp)
    * karate.set('accessToken', accessToken);
    * karate.log('Access Token:', accessToken);  // Print the access token

		* driver.quit()

