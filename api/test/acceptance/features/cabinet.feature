Feature: Cabinet
  Background:
    Given the following users exists
      | id | name  | password  |
      | 1  | Alice | secret123 |
    And the following recipes exists
      | id | name              | garnish            | preparation    | ingredients                      |
      | 0  | Gin & Tonic       | whole pepper corns | Serve with ice | (1, Gin), (2, Tonic)             |
      | 1  | Hallands & Tonic  |                    | Serve with ice | (3, Hallands Fläder), (2, Tonic) |

  Scenario: Registering a user creates an empty cabinet
    Given I register using the data
      | name  | password |
      | Bob   | hunter2  |
    Given I login with the following credentials
      | name  | password |
      | Bob   | hunter2  |
    When I GET "/cabinet"
    Then I get an empty cabinet

  Scenario: GET cabinet of not authenticated
    When I GET "/cabinet"
    Then I get an authentication error

  Scenario: Success GET empty cabinet
     Given I login with the following credentials
      | name  | password  |
      | Alice | secret123 |
    When I GET "/cabinet"
    Then I get the following cabinet
      | ownerId | favourites | ingredients |
      | 1       |            |             |

  Scenario: Fail PUT Cabinet, missing data
    Given I login with the following credentials
      | name  | password  |
      | Alice | secret123 |
    When I update my cabinet with missing data 
    Then I get a validation error
  
  Scenario: Fail PUT Cabinet, bad data
    Given I login with the following credentials
      | name  | password  |
      | Alice | secret123 |
    When I update my cabinet with invalid data 
    Then I get a validation error

  Scenario: Success PUT cabinet 
    Given I login with the following credentials
      | name  | password  |
      | Alice | secret123 |
    When I update my cabinet with the following 
      | favourites | ingredients   |
      | 0          | 1, 3          | 
    And I GET "/cabinet" 
    Then I get the following cabinet
      | ownerId | favourites      | ingredients                  |
      | 1       | (0:Gin & Tonic) | (1:Gin), (3:Hallands Fläder) |
