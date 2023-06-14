Feature: Get recipes

  Scenario: Getting all recipes
    When I get all recipes
    Then I then the following recipes are included in the result
      | name          |
      | Lemon Drop    |
      | Mojito        |
      | Manhattan     |
      | John Collins  |
