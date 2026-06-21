Feature: Checkout Process

Background:
    Given User is on login page
    When User enters valid username and password
    And User clicks Login button
    Then Login result should be displayed
  
  Scenario: Successful Checkout
    Given User has products in cart
    When User completes payment
    Then Order should be placed successfully

