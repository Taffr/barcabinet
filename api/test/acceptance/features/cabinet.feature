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
    Given I am logged out
    When I GET "/cabinet"
    Then I get an authentication error

  Scenario: Success GET empty cabinet
    When I GET "/cabinet"
    Then I get the following cabinet
      | ownerId | favourites | ingredients |
      | 1       |            |             |

  Scenario: Fail PUT Cabinet, missing data
    When I update my cabinet with missing data 
    Then I get a validation error
  
  Scenario: Fail PUT Cabinet, bad data
    When I update my cabinet with invalid data 
    Then I get a validation error

  @successPutCabinet
  Scenario: Success PUT cabinet 
    When I update my cabinet with the following 
      | favourites | ingredients   |
      | 0          | 1, 3          | 
    And I GET "/cabinet" 
    Then I get the following cabinet
      | ownerId | favourites      | ingredients                  |
      | 1       | (0:Gin & Tonic) | (1:Gin), (3:Hallands Fläder) |

  @addNonExistingToFavourites
  Scenario: Add non-existing recipe to favourites
    When I add the recipe with id "7" to my favourites
    Then I am informed that the resource doesn't exist

  @addFavouriteToCabinet
  Scenario: Add favourite to cabinet
    When I add the recipe with id "0" to my favourites
    And I add the recipe with id "0" to my favourites
    And I GET "/cabinet" 
    Then I get the following cabinet
      | ownerId | favourites      | ingredients |
      | 1       | (0:Gin & Tonic) |             |

  @removeFavouriteFromCabinet
  Scenario: Add to recipe to favourites
    When I add the recipe with id "0" to my favourites
    When I add the recipe with id "1" to my favourites
    And I GET "/cabinet" 
    Then I get the following cabinet
      | ownerId | favourites                            | ingredients |
      | 1       | (0:Gin & Tonic), (1:Hallands & Tonic) |             |
    When I remove the recipe with id "1" from my favourites
    And I GET "/cabinet" 
    Then I get the following cabinet
      | ownerId | favourites      | ingredients |
      | 1       | (0:Gin & Tonic) |             |

  @addNonExistingToIngredients
  Scenario: Try adding nonexisting ingredient to cabinet
    When I add the ingredient with id "666" to my cabinet
    Then I am informed that the resource doesn't exist

  @addIngredientToCabinet
  Scenario: Success with adding ingredient to favourites
    When I add the ingredient with id "1" to my cabinet
    And I add the ingredient with id "1" to my cabinet
    And I GET "/cabinet" 
    Then I get the following cabinet
      | ownerId | favourites      | ingredients |
      | 1       |                 | (1:Gin)     |

  @removeIngredientToCabinet
  Scenario: Success with removing ingredient to favourites
    When I add the ingredient with id "1" to my cabinet
    When I remove the ingredient with id "1" from my cabinet
    And I GET "/cabinet" 
    Then I get the following cabinet
      | ownerId | favourites      | ingredients |
      | 1       |                 |             |
