@cabinet
Feature: Cabinet
  Background:
    Given the following users exists
      | id | name  | password  |
      | 1  | Alice | secret123 |
    And the following ingredients exist
      | name   |
      | Gin    |
      | Tonic  |
      | Coffee |
      | Vodka  |
    And the following recipes exist
      | name          | garnish          | preparation            | dosages                      |
      | Gin & Tonic   | ice, ice, baby   | Pour over ice          | (Gin:2 cl), (Tonic:4 cl)   |
      | Black Russian | Ice from Siberia | Mix, mix, swirl, swirl | (Coffee:6 cl), (Vodka:2 cl) |
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
    When I add "I don't exist" to my cabinet
    Then I am informed that the resource doesn't exist

  @cabinet/add
  Scenario: Success with adding ingredient to favourites
    When I add "Coffee" to my cabinet
    And I add "Coffee" to my cabinet
    And I GET "/cabinet" 
    Then I get the following cabinet
      | cabinet |
      | Coffee  |

  @cabinet/remove
  Scenario: Success with removing ingredient to favourites
    When I add "Gin" to my cabinet
    And I remove "Gin" from my cabinet
    And I GET "/cabinet" 
    Then I get the following cabinet
      | cabinet |
