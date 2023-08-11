@cabinet
Feature: Cabinet
  Background:
    Given the following users exists
      | id | name  | password  |
      | 1  | Alice | secret123 |
    And the following recipes exists
      | id | name              | garnish            | preparation    | ingredients                      |
      | 0  | Gin & Tonic       | whole pepper corns | Serve with ice | (1, Gin), (2, Tonic)             |
      | 1  | Hallands & Tonic  |                    | Serve with ice | (3, Hallands Fläder), (2, Tonic) |
    And I login with the following credentials
      | name  | password  |
      | Alice | secret123 |

  @cabinet/registeringCreatesNew
  Scenario: Registering a user creates an empty cabinet
    Given I register using the data
      | name  | password |
      | Bob   | hunter2  |
    Given I login with the following credentials
      | name  | password |
      | Bob   | hunter2  |
    When I GET "/cabinet"
    Then I get an empty cabinet

  @cabinet/unauthenticated
  Scenario: GET cabinet of not authenticated
    Given I am logged out
    When I GET "/cabinet"
    Then I get an authentication error

  @cabinet/empty
  Scenario: Success GET empty cabinet
    When I GET "/cabinet"
    Then I get the following cabinet
      | cabinet |

  @cabinet/addNonExisting
  Scenario: Try adding nonexisting ingredient to cabinet
    When I add the ingredient with id "666" to my cabinet
    Then I am informed that the resource doesn't exist

  @cabinet/add
  Scenario: Success with adding ingredient to favourites
    When I add the ingredient with id "1" to my cabinet
    And I add the ingredient with id "1" to my cabinet
    And I GET "/cabinet" 
    Then I get the following cabinet
      | cabinet |
      | 1, Gin  |

  @cabinet/remove
  Scenario: Success with removing ingredient to favourites
    When I add the ingredient with id "1" to my cabinet
    When I remove the ingredient with id "1" from my cabinet
    And I GET "/cabinet" 
    Then I get the following cabinet
      | cabinet |
