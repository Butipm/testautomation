@STEVE-1
Feature: Feature | Steve App | Project & ENVs | Backend - Send Deployment Requests to Github
	
	Background:
		Given I am integrate portal "<url>"
		And I click login button

	@STEVE-14458 @uiTests @ISSUES-527
	Scenario: Test Login to Integrate
		    And I enter my username "<username>"
		    And I enter my password "<password>"
		    When Click log in button
		    Then I failed to log in