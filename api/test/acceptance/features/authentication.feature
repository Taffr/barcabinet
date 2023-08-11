@authentication
Feature: Authentication
  Background:
    Given the following users exists
      | id | name  | password |
      | 1  | Alice | secret   |
      | 2  | Bob   | pwd123   |

  Scenario: Fail to login with bad credentials
    When I login with the following credentials
      | name  | password |
      | Alice | wrong    |
    Then I get denied

  Scenario: Fail to login to non-existing user
    When I login with the following credentials 
      | name    | password |
      | Charlie | password |
    Then I get denied

  Scenario: Failure with no token
    Given I have no authentication token 
    When I GET "/profile"
    Then I get denied

  Scenario: Failure with bad token
    Given I have a random token
    When I GET "/profile"
    Then I get denied

  Scenario: Success with login
    When I login with the following credentials 
      | name  | password |
      | Alice | secret   |
    When I GET "/profile"
    Then I am logged in as "Alice"

