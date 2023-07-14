Feature: Get Recipes and Ingredients
  Background:
    Given the following recipes exists
      | id | name              | garnish            | preparation    |  ingredients                     |
      | 0  | Gin & Tonic       | whole pepper corns | serve with ice | (1, Gin), (2, Tonic)             |
      | 1  | Hallands & Tonic |                    | serve with ice | (3, Hallands Fläder), (2, Tonic) |

  Scenario: Get Recipes
    When I GET '/recipes'
    Then I get recipes with the following names
      | name             |
      | Gin & Tonic      |
      | Hallands & Tonic |
