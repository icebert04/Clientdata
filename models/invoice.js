var mongoose = require('mongoose');

// INVOICE SCHEMA
var invoiceSchema = mongoose.Schema({
  customer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  service:{
    type: String,
    required: true
  },
  price:{
    type: String,
  },
  due:{
    type: String,
  },
  status:{
    type: String,
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
});

var Invoice = module.exports = mongoose.model('Invoice', invoiceSchema);

// GET INVOICES
module.exports.getInvoices = function(callback, limit){
  Invoice.find(callback).limit(limit).populate('customer').sort([['createdAt', 'descending']]);
}

// GET SINGLE INVOICE
module.exports.getInvoiceById = function(id, callback){
  var query = {_id: id};
  Invoice.findOne(query, callback).populate('customer');
}

// ADD INVOICE
module.exports.addInvoice = function(invoice, callback){
	var add = {
		customer: invoice.customer_id,
		service: invoice.service,
		price: invoice.price,
		due: invoice.due,
		status: invoice.status
	}
	Invoice.create(add, callback);
}

// UPDATE INVOICE
module.exports.updateInvoice = function(id, invoice, options, callback){
	var query = {_id: id};
	var update = {
		service: invoice.service,
		price: invoice.price,
		due: invoice.due,
		status: invoice.status
	}
	Invoice.findOneAndUpdate(query, update, options, callback);
}

// REMOVE INVOICE
module.exports.removeInvoice = function(id, callback){
	var query = {_id: id};
	Invoice.remove(query, callback);
}

// GET CUSTOMER INVOICES
module.exports.getCustomerInvoices = function(customer_id, callback, limit){
	var query = {customer: customer_id};
	Invoice.find(query, callback).limit(limit).populate('customer').sort([['createdAt', 'ascending']]);
}
