Feature: Header component functionality

  Scenario: Logo is visible
    Given I open the header storybook page
    Then I should see the logo

  Scenario: Search input accepts text and shows clear button
    Given I open the header storybook page
    When I type "Playwright" into the search input
    Then I should see the clear button
