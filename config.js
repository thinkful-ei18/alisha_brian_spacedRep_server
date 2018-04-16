'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://localhost/thinkful-backend',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'mongodb://Alisha_Brian:pass123@ds013931.mlab.com:13931/alisha_brian_spaced_repetition',
       
JWT_EXPIRY: '8d',
JWT_SECRET: process.env.JWT_SECRET || 'belle',
};

	


		
};
