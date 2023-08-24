@recipe
Feature: Get Recipes and Ingredients
  Background:
    Given the following ingredients exist
      | name   |
      | Gin    |
      | Tonic  |
      | Coffee |
      | Vodka  |
    Given the following recipes exist
      | name          | garnish          | preparation            | dosages                      |
      | Gin & Tonic   | ice, ice, baby   | Pour over ice          | (Gin:2 cl), (Tonic:4 cl)   |
      | Black Russian | Ice from Siberia | Mix, mix, swirl, swirl | (Coffee:6 cl), (Vodka:2 cl) |

  @recipe/get
  Scenario: Get Recipes
    When I GET '/recipes'
    Then I get recipes including the following
      | name           |
      | Gin & Tonic    |
      | Black Russian  |

  @recipe/ingredients
  Scenario: Get Ingredients
    When I GET '/recipes/ingredients'
    Then I get ingredients including the following
      | name   |
      | Gin    |
      | Coffee |
      | Tonic  |
      | Vodka  |
