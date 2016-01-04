var express = require('express');
var router = express.Router();

Customer = require('../models/customer.js');
Invoice = require('../models/invoice.js');

// GET ALL CUSTOMERS
router.get('/', function(req, res){
      Invoice.getInvoices(function(err, invoices){
        if(err){
          res.send(err);
        }
        res.json(invoices);
      });
});

// GET SINGLE INVOICE
router.get('/:id', function(req, res){
      Invoice.getInvoiceById(req.params.id, function(err, invoice){
        if(err){
          res.send(err);
        }
        res.json(invoice);
      });
});

// ADD INVOICE
router.post('/', function(req, res){
	var invoice = req.body;
	Invoice.addInvoice(invoice, function(err, invoice){
		if(err){
			res.send(err);
		}
		res.json(invoice);
	});
});

// UPDATE INVOICE
router.put('/:id', function(req, res){
	var id = req.params.id;
	var invoice = req.body;
	Invoice.updateInvoice(id, invoice, {}, function(err, invoice){
		if(err){
			res.send(err);
		}
		res.json(invoice);
	});
});

// DELETE INVOICE
router.delete('/:id', function(req, res){
	var id = req.params.id;
	Invoice.removeInvoice(id, function(err, invoice){
		if(err){
			res.send(err);
		}
		res.json(invoice);
	});
});

// GET All INVOICES FOR A SINGLE CUSTOMER
router.get('/customer/:customer_id', function(req, res){
	var customer_id = req.params.customer_id;
	Invoice.getCustomerInvoices(customer_id, function(err, invoices){
		if(err){
			res.send(err);
		}
		res.json(invoices);
	});
});

module.exports = router;
