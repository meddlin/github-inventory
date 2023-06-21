Feature: Call API
    Be able to call backend (.NET) API

    Scenario: User starts application
        Given I have started the application
        Then data should automatically load
        Then I should see the table populate with data
