@favourites
Feature: Favourites
  Background:
    Given the following users exists
      | id | name  | password  |
      | 1  | Alice | secret123 |
    And I login with the following credentials
      | name  | password  |
      | Alice | secret123 |

  @favourites/addNonExisting
  Scenario: Add non-existing recipe to favourites
    When I add the recipe with id 999 to my favourites
    Then I am informed that the resource doesn't exist

  @favourites/add
  Scenario: Add favourite to cabinet
    When I add the recipe with id 0 to my favourites
    And I add the recipe with id 0 to my favourites
    And I GET "/favourites" 
    Then I get the following favourites
      | favourites |
      | 0          |

  @favourites/remove
  Scenario: Remove recipe from favourites
    When I add the recipe with id 0 to my favourites
    When I add the recipe with id 1 to my favourites
    And I GET "/favourites" 
    Then I get the following favourites
      | favourites |
      | 0          |
      | 1          |
    When I remove the recipe with id 1 from my favourites
    And I GET "/favourites" 
    Then I get the following favourites
      | favourites |
      | 0          |
