describe('Guru99 Insurance Broker System', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // Prevent Cypress from failing the test
    return false;
  });
  let registrationEmail;
  let registrationPassword;
  let identificationNumber;
  beforeEach(() => {
    // Open the base URL
    cy.visit('https://demo.guru99.com/insurance/v1/index.php');
  });

  it('should perform registration', () => {
    cy.get('a.btn').click();

    // Fill out the registration form
    cy.get('#user_title').select('Mr');
    cy.get('#user_firstname').type('John');
    cy.get('#user_surname').type('Doe');
    cy.get('#user_phone').type('1234567890');
    
    // Select date of birth
    cy.get('#user_dateofbirth_1i').select('1990');
    cy.get('#user_dateofbirth_2i').select('January');
    cy.get('#user_dateofbirth_3i').select('15');

    registrationEmail = 'john.doe@example.com'; // Store the registration email
    cy.get('#user_user_detail_attributes_email').type(registrationEmail);

    registrationPassword = 'Password123'; // Store the registration password
    cy.get('#user_user_detail_attributes_password').type(registrationPassword);
    cy.get('#user_user_detail_attributes_password_confirmation').type(registrationPassword);

    // Click the "Create" button
    cy.get('input[name="submit"][value="Create"].btn.btn-default').click();
  });

  it('should perform successful login', () => {
    // Fill out the login form with the registration details
    cy.login(registrationEmail, registrationPassword);
  });

  it('should perform successful logout', () => {
    // Assume a successful login has occurred (you can reuse the login code from the first test)

    // Click the logout button
    cy.login(registrationEmail, registrationPassword);
    cy.get('input[type="submit"][value="Log out"].btn.btn-danger').click();
    cy.get('input.btn').should('exist');
    // Add assertions to verify successful logout
  });

  it('unsuccessful login scenario', () => {
    cy.get('#email').type('email');
    cy.get('#password').type('password');
    cy.get('input.btn').click();
    cy.get('input[type="submit"][value="Log out"].btn.btn-danger').should('not.exist');
  });

  it('should request a quotation', () => {
    cy.login(registrationEmail, registrationPassword);
  
    // Click on the 'Request Quotation' tab
    cy.get('#ui-id-2').click();
    
    // Provide the vehicle value (not providing other parameters for now)
    cy.get('#quotation_vehicle_attributes_value').type('100000');
    cy.get('#new_quotation > div.actions > input.btn.btn-default').click();
    
    // Add assertions to check if the calculated premium appears
    cy.get('#calculatedpremium').should('exist');
  
    // Click the button to save the quotation
    cy.get('#new_quotation > div.actions > input.btn.btn-success').click();
  
    // Verify the URL and presence of the success message
    cy.url().should('eq', 'https://demo.guru99.com/insurance/v1/new_quotation.php');
    cy.contains('You have saved this quotation!').should('exist');
  
    // Extract the identification number from the entire page
    cy.get('body').invoke('text').then((text) => {
      // Define the phrase to look for
      const phrase = "Your identification number is :";
      const startIndex = text.indexOf(phrase);
      if (startIndex !== -1) {
        // Extract the identification number as a substring after the phrase
        const identificationNumber = text.substring(startIndex + phrase.length).trim();
        const match = identificationNumber.match(/\d+/);
    
        if (match && match[0]) {
          const extractedNumber = match[0];
    
          if (extractedNumber) {
            cy.log(`Identification Number: ${extractedNumber}`);
            cy.wrap(extractedNumber).as('identificationNumber');
          } else {
            cy.log('Identification number is empty.');
          }
        } else {
          cy.log('Identification number not found on the page.');
        }
      }
    });
    cy.get('@identificationNumber').then((number) => {
      identificationNumber = number;
    });
  });

  it('should retrieve a quotation', () => {
    cy.login(registrationEmail, registrationPassword);
    // Click on "Retrieve Quotation"
    cy.get('#ui-id-3').click();

    // Retrieve the identification number
    cy.log(`Accessed Identification Number: ${identificationNumber}`);
    // Provide the identification number in the input field
    cy.get('#tabs-3 > form > input[type=text]:nth-child(1)').type(identificationNumber);
    // Click on "Retrieve"
    cy.get('#getquote').click();

    // Confirm the retrieval
    cy.get('body > table > tbody > tr:nth-child(4) > td:nth-child(1) > b').should('exist'); 
  });

  it('should view profile', () => {
    cy.login(registrationEmail, registrationPassword);
    // Click on the 'Profile' tab
    cy.get('#ui-id-4').click();
    // Ensure that the first name is displayed
    cy.get('#showfirstname').should('be.visible');
  });

  it('should update user profile and verify first name display', () => {
    cy.login(registrationEmail, registrationPassword);

    // Click on the '#ui-id-5' tab
    cy.get('#ui-id-5').click();

    // Type a random surname
    const randomSurname = 'RandomSurname' + Math.floor(Math.random() * 1000);
    cy.get('#user_surname').clear().type(randomSurname);

    // Type a random firstname
    const randomFirstname = 'RandomFirstname' + Math.floor(Math.random() * 1000);
    cy.get('#user_firstname').clear().type(randomFirstname);

    // Click on the 'Edit' button
    cy.get('#edit_user_ > div.actions > input').click();

    // Click on the 'Profile' tab
    cy.get('#ui-id-4').click();

    // Ensure that the first name is displayed
    cy.get('#showfirstname').should('be.visible');
  });
});

