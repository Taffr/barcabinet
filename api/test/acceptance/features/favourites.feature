@favourites
Feature: Favourites
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
  

  @favourites/addNonExisting
  Scenario: Add non-existing recipe to favourites
    When I add the recipe with id "7" to my favourites
    Then I am informed that the resource doesn't exist

  @favourites/add
  Scenario: Add favourite to cabinet
    When I add the recipe with id "0" to my favourites
    And I add the recipe with id "0" to my favourites
    And I GET "/favourites" 
    Then I get the following favourites
      | favourites     |
      | 0, Gin & Tonic |

  @favourites/remove
  Scenario: Remove recipe from favourites
    When I add the recipe with id "0" to my favourites
    When I add the recipe with id "1" to my favourites
    And I GET "/favourites" 
    Then I get the following favourites
      | favourites           |
      | 0, Gin & Tonic       |
      | 1, Hallands & Tonic  |
    When I remove the recipe with id "1" from my favourites
    And I GET "/favourites" 
    Then I get the following favourites
      | favourites      |
      | 0, Gin & Tonic  |
