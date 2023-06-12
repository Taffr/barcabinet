Feature: POC Cucumber tests
  Scenario: Executing the PING command
    When I ping the server with message "Hello"
    Then I receive the following response
      | code | message              |
      | 200  | PONG: You sent Hello |
