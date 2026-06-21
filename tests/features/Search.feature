Feature: Search Functionality

Background:
  Given User is on login page
  When User logs in with valid credentials
  Then User should be logged in successfully

  Scenario: Search Valid Product
    Given User is on home page
    When User searches for "Laptop"
    Then Matching products should be displayed

  Scenario: Search Invalid Product
    Given User is on home page
    When User searches for "XYZ123"
    Then No results message should be displayed