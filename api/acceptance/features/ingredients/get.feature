Feature: Get Ingredients

  Scenario: List all ingredients
    When I get all ingredients
    Then the following ingredients are included in the result
      | name    |
      | Whiskey | 
      | Vodka   |
      | Gin     |

