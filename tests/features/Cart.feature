Feature: Shopping Cart

  Background:
    Given User is on login page
    When User enters valid username and password
    And User clicks Login button
    Then Login result should be displayed

  Scenario: Add Product To Cart
    Given User is viewing a product
    When User clicks Add To Cart
    Then Product should be added to cart

  Scenario: Remove Product From Cart
    Given Product exists in cart
    When User removes the product
    Then Cart should be empty