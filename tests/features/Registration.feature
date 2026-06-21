Feature: User Registration

  @smoke
  Scenario: Successful registration with valid credentials
    Given I am on the DemoBlaze home page
    When I click on "Sign up" link
    And I enter registration username 
    And I enter registration password 
    And I click the "Sign up" button
    Then I should see an alert with message "Sign up successful."
