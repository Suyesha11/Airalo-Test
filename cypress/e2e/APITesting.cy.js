describe('Airalo API Tests', () => {
  let accessToken;
  let orderId;
  let simIds;


  const clientId = '974d515d41f86868eccd2d22aae8d10e';
  const clientSecret = 'tILYEqQRq5PnZ5nccQZ1IiVugUWhZN2UveJZ9rVa';
  const baseUrl = Cypress.env('API_URL');


  it('Authentication Token', () => {
    cy.request({
          method: 'POST',
          url: `${baseUrl}/v2/token`,
          form: true,
          body: {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials'
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.have.property('access_token');
          accessToken = response.body.data.access_token;
        });
      });


  it('Submit an order for eSIMs with 6 merhaba-7days-1gb', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/v2/orders`,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      form: true,
      body: {
        quantity: 6,
        package_id: 'merhaba-7days-1gb',
        type: 'sim'

      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('id');
      expect(response.body.data).to.have.property('quantity',6);
      orderId = response.body.data.id;
      simIds = response.body.data.sims.map(sim => sim.id);

      // Log the extracted data
      cy.log('Order ID:', orderId);
      cy.log('SIM IDs:', simIds);
    });
  });

  it('Verify the eSim order details', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/v2/sims`,

      qs:{
      limit:6,
      package_id:'merhaba-7days-1gb',
      dataId:orderId

    },
    headers: {
            'Authorization': `Bearer ${accessToken}`
          }
    }).then((response) => {

              expect(response.status).to.eq(200);
              expect(response.body).to.have.property('data').and.be.an('array');
              expect(response.body.data).to.have.length(6);
});
});
})