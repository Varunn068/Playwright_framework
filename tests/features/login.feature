Feature: Login Functionality

  Scenario: Successful Login
    Given User is on login page
    When User enters valid username and password
    And User clicks Login button
    Then Login result should be displayed

  Scenario Outline: Login Validation
    Given User is on login page
    When User enters "<username>" and "<password>"
    And User clicks Login button
    Then Login result should be displayed

    Examples:
      | username   | password  |
      | PIA_user01 | 12345@qa  |
      | PIA_user02 | 12345@qa  |
      | PIA_user03 | 12345@qa  |
      | PIA_user04 | 12345@qa  |

  Scenario Outline: Negative Validations
    Given User is on login page
    When User enters "<username>" and "<password>"
    And User clicks Login button
    Then Error message should be displayed

    Examples:
      | username   | password  |
      | PIA_user01 | wrongpass |