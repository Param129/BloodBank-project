const UserController = require('../UserController.js')
const HospitalController=require('../HospitalController.js');


const updateUserTest = (req, res, users) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], name };
      res.json(users[index]);
    } else {
      res.status(404).send('User not found');
    }
  };
  
  const deleteUserTest = (req, res, users) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      const deletedUser = users.splice(index, 1)[0]; 
      res.json(deletedUser); 
    } else {
      res.status(404).send('User not found');
    }
  };


  const updateHospitalTest = (req, res, hospitals) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const index = hospitals.findIndex(hospital => hospital.id === id);
    if (index !== -1) {
      hospitals[index] = { ...hospitals[index], name };
      res.json(hospitals[index]);
    } else {
      res.status(404).send('Hospital not found');
    }
  };
  
  
  const deleteHospitalTest = (req, res, hospitals) => {
    const id = parseInt(req.params.id);
    const index = hospitals.findIndex(hospital => hospital.id === id);
    if (index !== -1) {
      const deletedHospital = hospitals.splice(index, 1)[0]; // Remove hospital from array
      res.json(deletedHospital); // Respond with deleted hospital
    } else {
      res.status(404).send('Hospital not found');
    }
  };

  const createHospitalTest = (req, res, hospitals) => {
    const { name } = req.body;
    const id = hospitals.length + 1; 
    const newHospital = { id, name };
    hospitals.push(newHospital); // Add new hospital to array
    res.status(201).json(newHospital); 
  };
  
  const getHospitalTest = (req, res, hospitals) => {
    const id = parseInt(req.params.id);
    const hospital = hospitals.find(hospital => hospital.id === id);
    if (hospital) {
      res.json(hospital); 
    } else {
      res.status(404).send('Hospital not found');
    }
  };
  

describe('UserController', () => {
  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse),
      send: jest.fn() 
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });



  describe('getUserById', () => {
    it('should return user by ID if found', () => {
        const mockReq = { body: { name: 'New User' } };
    //   UserController.users = [mockUser];
      UserController.createUser(mockReq, mockResponse);
      UserController.getUserById({ params: { id: '10' } }, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(201); 
    });
  

    it('should return 404 status if user not found', () => {
      UserController.users = [];

      UserController.getUserById({ params: { id: '10' } }, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith('User not found');
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const mockReq = { body: { name: 'New User' } };
      UserController.createUser(mockReq, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(201);
    });
  });

  describe('updateUser', () => {
    it('should update user if found', () => {
      let users = [{ id: 1, name: 'User 1' }]; 
      const mockReq = { params: { id: '1' }, body: { name: 'Updated User' } };
      
      updateUserTest(mockReq, mockResponse, users); 
  
      // Check if the name is updated
      expect(users[0].name).toBe('Updated User');
      // Check if the response is as expected
      expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, name: 'Updated User' });
    });
  });
  
  
  
  

    it('should return 404 status if user not found', () => {
      UserController.users = [];

      const mockReq = { params: { id: '100' }, body: { name: 'Updated User' } };
      UserController.updateUser(mockReq, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.send).toHaveBeenCalledWith('User not found');
    });


    describe('deleteUser', () => {
        it('should delete user if found', () => {
          let users = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]; 
          const mockReq = { params: { id: '1' } };
          
          deleteUserTest(mockReq, mockResponse, users); 
      

          expect(users.length).toBe(1);
          expect(users.some(user => user.id === 1)).toBe(false); 

          expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, name: 'User 1' }); 
        });
      
        it('should return 404 if user not found', () => {
          let users = [{ id: 1, name: 'User 1' }];
          const mockReq = { params: { id: '2' } };
      
          deleteUserTest(mockReq, mockResponse, users); 
      
          expect(mockResponse.status).toHaveBeenCalledWith(404); 
          expect(mockResponse.send).toHaveBeenCalledWith('User not found'); 
        });
      });






      describe('updateHospital', () => {
        it('should update hospital if found', () => {
          let hospitals = [{ id: 1, name: 'Hospital 1' }, { id: 2, name: 'Hospital 2' }]; 
          const mockReq = { params: { id: '1' }, body: { name: 'Updated Hospital' } };
          
          updateHospitalTest(mockReq, mockResponse, hospitals); 
      
          expect(hospitals.length).toBe(2); // Ensure the length remains the same
          expect(hospitals[0].name).toBe('Updated Hospital'); // Check if the name is updated
          expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, name: 'Updated Hospital' }); 
        });
      
        it('should return 404 if hospital not found', () => {
          let hospitals = [{ id: 1, name: 'Hospital 1' }];
          const mockReq = { params: { id: '2' }, body: { name: 'Updated Hospital' } };
      
         updateHospitalTest(mockReq, mockResponse, hospitals); 
      
          expect(mockResponse.status).toHaveBeenCalledWith(404); 
          expect(mockResponse.send).toHaveBeenCalledWith('Hospital not found'); 
        });
      });
      

      describe('deleteHospital', () => {
        it('should delete hospital if found', () => {
          let hospitals = [{ id: 1, name: 'Hospital 1' }, { id: 2, name: 'Hospital 2' }]; 
          const mockReq = { params: { id: '1' } };
          
          deleteHospitalTest(mockReq, mockResponse, hospitals); 
      
          expect(hospitals.length).toBe(1); // Ensure the length is reduced by 1
          expect(hospitals.some(hospital => hospital.id === 1)).toBe(false); // Ensure the hospital with id 1 is not in the array
          expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, name: 'Hospital 1' }); // Respond with deleted hospital
        });
      
        it('should return 404 if hospital not found', () => {
          let hospitals = [{ id: 1, name: 'Hospital 1' }];
          const mockReq = { params: { id: '2' } };
      
          deleteHospitalTest(mockReq, mockResponse, hospitals); 
      
          expect(mockResponse.status).toHaveBeenCalledWith(404); // Ensure status 404 is set
          expect(mockResponse.send).toHaveBeenCalledWith('Hospital not found'); // Ensure correct error message is sent
        });
      });
      

      describe('createHospital', () => {
        it('should create a new hospital', () => {
          let hospitals = [{ id: 1, name: 'Hospital 1' }]; 
          const mockReq = { body: { name: 'New Hospital' } };
          
          createHospitalTest(mockReq, mockResponse, hospitals); 
      
          expect(hospitals.length).toBe(2); 
          expect(hospitals[1].name).toBe('New Hospital'); 
          expect(mockResponse.status).toHaveBeenCalledWith(201); 
          expect(mockResponse.json).toHaveBeenCalledWith({ id: 2, name: 'New Hospital' }); 
        });
      });
      
      describe('getHospital', () => {
        it('should get the hospital if found', () => {
          let hospitals = [{ id: 1, name: 'Hospital 1' }, { id: 2, name: 'Hospital 2' }]; 
          const mockReq = { params: { id: '1' } };
          
          getHospitalTest(mockReq, mockResponse, hospitals); 
      
          expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, name: 'Hospital 1' }); 
        });
      
        it('should return 404 if hospital not found', () => {
          let hospitals = [{ id: 1, name: 'Hospital 1' }];
          const mockReq = { params: { id: '2' } };
      
          getHospitalTest(mockReq, mockResponse, hospitals); 
      
          expect(mockResponse.status).toHaveBeenCalledWith(404); 
          expect(mockResponse.send).toHaveBeenCalledWith('Hospital not found'); 
        });
      });
      
  });
