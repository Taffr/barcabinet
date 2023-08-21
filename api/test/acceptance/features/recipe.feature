@recipe
Feature: Get Recipes and Ingredients
  @recipe/get
  Scenario: Get Recipes
    When I GET '/recipes'
    Then I get recipes including the following
      | name         |
      | Yellow Bird  |
      | Paper Plane  |
      | Kir          |

  @getIngredients
  Scenario: Get Ingredients
    When I GET '/recipes/ingredients'
    Then I get ingredients including the following
      | name   |
      | Gin    |
      | Coffee |
