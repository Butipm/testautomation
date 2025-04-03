@MDD-352
Feature: Create Subscription using API

	Background:
		* url testsApi
		* configure ssl = true
	  	* configure retry = { count: 10, interval: 30000 }
		* def requestload = read('classpath:subscription_DD1G.json')
    * eval
      """
      karate.appendTo(requestload.dataTargets.username,PostGresUser);
      karate.appendTo(requestload.dataTargets.password,PostGresPass);
      """

	@test-22924 @testTests @api
	Scenario:Test Validate the creation of the Subscription via API with dynamic mapping
		Given path '/subscriptions'
			And header Authorization = 'Bearer ' + accessToken
		And request requestload
		When method POST
		* print response
		Then status 201
	# All specifications are created
		And assert response.status == 'PENDING_APPROVAL'
		And assert for(var i=0;i<response.subscriptionItems.length;i++) response.subscriptionItems[i].channelSpecification.deployments.length == 0
		And assert for(var i=0;i<response.subscriptionItems.length;i++) response.subscriptionItems[i].channelSpecification.targetEmitterSpecifications[0].deployments.length == 0
		And assert for(var i=0;i<response.subscriptionItems.length;i++) response.subscriptionItems[i].dataTransportSpecification.deployments.length == 0
		* def subId = response._id

