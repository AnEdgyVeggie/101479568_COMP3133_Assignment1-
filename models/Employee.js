const { model, Schema } = require("mongoose")

const EmployeeSchema = new Schema({
    id: {
        type: String,
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    designation: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true,
        min: 1000
    },
    date_of_joining: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    employee_photo: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
})

const Employee = model('Employee', EmployeeSchema)

module.exports =  Employee;