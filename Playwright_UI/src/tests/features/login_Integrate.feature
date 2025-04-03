@STEVE-1
Feature: Feature| Project & ENVs | Backend - Send Deployment Requests to Github
	
	Background:
		Given I am integrate portal "<url>"
		And I click login button

	@jira-13358 @uiTests
	Scenario: Test Login to Integrate
		    And I enter my username "<username>"
		    And I enter my password "<password>"
		    When Click log in button
		    Then I failed to log in