var express = require('express');
var router = express.Router();

Customer = require('../models/customer.js');
Invoice = require('../models/invoice.js');

// GET ALL CUSTOMERS
router.get('/', function(req, res){
      Customer.getCustomers(function(err, customers){
        if(err){
          res.send(err);
        }
        res.json(customers);
      });
});

// GET SINGLE CUSTOMER
router.get('/:id', function(req, res){
      Customer.getCustomerById(req.params.id, function(err, customer){
        if(err){
          res.send(err);
        }
        res.json(customer);
      });
});

// ADD CUSTOMER
router.post('/', function(req, res){
      var customer = req.body;
      Customer.addCustomer(customer, function(err, customer){
        if(err){
          res.send(err);
        }
        res.json(customer);
      });
});

// UPDATE CUSTOMER
router.put('/:id', function(req, res){
	var id = req.params.id;
	var customer = req.body;
	Customer.updateCustomer(id, customer, {}, function(err, customer){
		if(err){
			res.send(err);
		}
		res.json(customer);
	});
});

// DELETE CUSTOMER 
router.delete('/:id', function(req, res){
	var id = req.params.id;
	Customer.removeCustomer(id, function(err, customer){
		if(err){
			res.send(err);
		}
		res.json(customer);
	});
});


module.exports = router;
