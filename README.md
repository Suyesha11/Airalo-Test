# Airalo Cypress Tests

This repository contains Cypress tests for the Airalo application, including both API and UI tests.

## Setup Instructions

1. Clone this repository to your local machine.
2. Install Node.js and npm if you haven't already.
3. Navigate to the project directory and run `npm install` to install dependencies.


## Running Tests

1. To run the tests, use the following command:
    ```
   npx cypress run --browser chrome

2. For opening the Cypress Test Runner:
    ```
    npx cypress open
    ```

## Test Case Overview

### API Tests (APITesting.cy.js)

1. **Authentication Token**: Obtains an access token using client credentials.
2. **Submit eSIM Order**: Places an order for 6 eSIMs with a specific package.
3. **Verify eSIM Order Details**: Retrieves and verifies the details of the placed order.

### UI Tests (UITest.cy.js)

1. **Verify Airalo eSIM Plan for Japan**: Navigates through the UI to select and verify details of a Japan eSIM plan.


## Test Implementation Approach

### API Tests (APITesting.cy.js)

The API testing strategy focuses on verifying key backend functionalities of the Airalo system. The approach for each test case is as follows:

1. **TC_001 - Authentication Token**
   - Utilizes `cy.request()` to send a POST request to the authentication endpoint
   - Sends client credentials to obtain an access token
   - Verifies response status and presence of access token in the response body
   - Stores the access token for use in subsequent tests
   

2. **TC_002 -Submit eSIM Order Test**
   - Uses `cy.request()` to send a POST request to the order endpoint
   - Applies the previously obtained access token for authorization
   - Submits an order for 6 eSIMs with a specific package ID
   - Verifies response status and correctness of order details (ID and quantity)
   - Extracts and logs order ID and SIM IDs for potential future use


3. **TC_003 -Verify eSIM Order Details Test**
   - Sends a GET request to retrieve SIM details based on the previous order
   - Applies query parameters to filter results by package ID and order ID
   - Verifies response status and checks for the correct number of returned SIMs

### UI Test (UITest.cy.js)

The UI testing approach focuses on simulating user interactions and verifying the correctness of displayed information. The strategy for the UI test case is as follows:

1. **Verify Airalo eSIM Plan for Japan**
   - Handles initial UI elements (cookie consent, popups)
   - Utilizes the search functionality to locate and select Japan
   - Selects the first available eSIM package for Japan
   - Verifies package details (title, coverage, data, validity, price) against expected values from a fixture file

### General Testing Approach

Our overall testing strategy incorporates the following elements:

1. **Test Structure**: Utilizes Cypress's `describe` and `it` blocks for organized test grouping
2. **Environment Variables**: Employs `Cypress.env()` for managing environment-specific configurations
3. **Data Management**: Uses fixture files for storing and managing test data
4. **Assertions**: Leverages Cypress's built-in assertion library for validating expected outcomes


