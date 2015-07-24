//
// test/test.js
//

var request = require('request'),
    expect = require('chai').expect,
    baseUrl = 'http://localhost:3000';

// DESCRIBE WHAT WE ARE TESTING
  // SAY WHAT BEHAVIOR 'IT' AUGHT TO HAVE
    // SEND THE REQUEST
      // USE CHAI-EXPECT TO EXPECT THE STATUS RESULT
      // CHECK FALSE VALUE TO SEE IF WE CAN MAKE TEST FAIL
      // CALL DONE();

describe('GET /', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('GET /api/cities', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl + '/api/cities', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});

describe('GET /api/sfNabes', function() {
  it('should return statusCode 200', function(done) {
    request(baseUrl + '/api/sfNabes', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});


describe('POST /api/sfNabes', function() {
  it('should return statusCode 200', function(done) {
    request.post(
      {
        url: baseUrl + '/api/sfNabes',
        nabesName: 'Marina',
        nabesTags: 'Awesome'
      },
      function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });
});

describe('PUT /api/sfNabes/:id', function() {
  it('should return statusCode 200', function(done) {
    request.put(
      {
        url: baseUrl + '/api/sfNabes/55aec9caa57af7f53bd6c8cd',
        sfNabes: {
          nabesName: 'North Beach',
          nabesTags: 'Italian Food'
        }
      },
      function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });
});

describe('DELETE /api/sfNabes/:id', function() {
  it('should return statusCode 200', function(done) {
    request.del(baseUrl + '/api/nyNabes/55aec9caa57af7f53bd6c8cd', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});



describe('DELETE /api/nyNabes/:id', function() {
  it('should return statusCode 200', function(done) {
    request.del(baseUrl + '/api/nyNabes/55b15b270401b4d43d8bc2c5', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});