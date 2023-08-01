Feature: Registration

  Scenario: Username already taken
    Given the following users exists
      | id | name  | password  |
      | 1  | Alice | secret123 |
    When I register using the data
      | name  | password          |
      | Alice | someotherpassword |
    Then I am informed that the user already exists
  
  Scenario: Try register with invalid data
    When I try to register using invalid data
    Then I get a validation error

  Scenario: Try register with missing data
    When I try to register with missing data
    Then I get a validation error

  Scenario: Succesfull registration and login
    When I register using the data
      | name  | password |
      | Bob   | hunter2  |
    And I login with the following credentials
      | name | password |
      | Bob  | hunter2  |
    When I GET "/profile"
    Then I am logged in as "Bob"

