const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
    {
        amount: { 
            type: Number, 
            required: true,
            min: [0, 'Amount must be a positive number']  
        },
        description: { 
            type: String, 
            required: true,
            maxlength: [500, 'Description cannot exceed 500 characters'] 
        },
        date: { 
            type: Date, 
            required: true,
            default: Date.now 
        },
        category: { 
            type: String, 
            required: true,
            enum: ['Food', 'Transport', 'Entertainment', 'Bills', 'Health'], 
        },
        paymentMethod: { 
            type: String, 
            required: true,
            enum: ['Cash', 'Credit Card', 'Debit Card', 'Online'], 
        },
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true
        },
    },
    { 
        timestamps: true 
    }
);
expenseSchema.index({ user: 1 });

module.exports = mongoose.model('Expense', expenseSchema);
