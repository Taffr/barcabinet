@favourite
Feature: Favourites
  Background:
    Given the following ingredients exist
      | name   |
      | Gin    |
      | Tonic  |
      | Coffee |
      | Vodka  |
    And the following recipes exist
      | name          | garnish          | preparation            | dosages                      |
      | Gin & Tonic   | ice, ice, baby   | Pour over ice          | (Gin:2 cl), (Tonic:4 cl)   |
      | Black Russian | Ice from Siberia | Mix, mix, swirl, swirl | (Coffee:6 cl), (Vodka:2 cl) |
    And the following users exists
      | id | name  | password  |
      | 1  | Alice | secret123 |
    And I login with the following credentials
      | name  | password  |
      | Alice | secret123 |

  @favourite/addNonExisting
  Scenario: Add non-existing recipe to favourites
    When I add "I don't exist" to my favourites
    Then I am informed that the resource doesn't exist

  @favourite/add
  Scenario: Add favourite to cabinet
    When I add "Gin & Tonic" to my favourites
    And I add "Gin & Tonic" to my favourites
    And I GET "/favourites" 
    Then I get the following favourites
      | favourites  |
      | Gin & Tonic |

  @favourite/remove
  Scenario: Remove recipe from favourites
    When I add "Gin & Tonic" to my favourites
    When I add "Black Russian" to my favourites
    And I GET "/favourites" 
    Then I get the following favourites
      | favourites    |
      | Gin & Tonic   |
      | Black Russian |
    When I remove "Black Russian" from my favourites
    And I GET "/favourites" 
    Then I get the following favourites
      | favourites  |
      | Gin & Tonic |
