# Test Plan: Guru99 Insurance Broker System

## Scope

The scope of this testing plan encompasses the functionality of Guru99's Insurance Broker System. The testing focuses on the following key features:

- User Registration
- User Login and Logout
- Quotation Management (Request and Retrieve)
- User Profile Management (View and Edit)

## Assumptions

The following assumptions are made for testing:

1. The application is accessible.
2. Test environments, including test data, are properly set up.
3. Testers have access to the preferred testing technologies and frameworks (e.g., Cypress and Cucumber).

## Test Cases

## Test Cases

### User Registration

**Scenario: Successful User Registration**

- When the user clicks on the "Register" button
- And the user provides valid registration information
- And the user clicks the "Create" button
- Then the user should be successfully registered

### User Login and Logout

**Scenario: Successful User Login**
- Given the user is registered
- When the user logs in with valid credentials
- Then the user should be successfully logged in

**Scenario: Successful User Logout**
- Given the user is logged in
- When the user logs out
- Then the user should be successfully logged out

**Scenario: Unsuccessful User Login**
- When the user enters invalid login credentials
- And the user clicks the login button
- Then the user should not be logged in

### Quotation Management

**Scenario: Request a Quotation**
- Given the user is logged in
- When the user requests a quotation
- And the quotation is successfully calculated
- And an identification number is provided
- Then the user should receive an identification number

**Scenario: Retrieve a Quotation**
- Given the user is logged in
- When the user retrieves a quotation using a valid identification number
- Then the quotation should be retrieved successfully

### User Profile Management

**Scenario: View User Profile**
- Given the user is logged in
- When the user clicks on the "Profile" tab
- Then the user's profile information, including the first name, should be displayed

**Scenario: Update User Profile and Verify First Name**
- Given the user is logged in
- When the user updates the user profile with a new first name
- And the user clicks the "Edit" button
- And the user views the profile
- Then the updated first name should be displayed

## Test Execution

To execute the test cases for Guru99 Insurance Broker System, follow these steps:

### Prerequisites

1. Ensure that you have the following software and dependencies installed:

   - [Cypress](https://www.cypress.io/): The testing framework used for these tests.
   - [Node.js](https://nodejs.org/): Required for running Cypress.

2. Clone this repository to your local machine:

   ```shell
   git clone (https://github.com/thakkarsaurabh/finclear)
   cd finclear
   ./node_modules/cypress/bin/cypress open
