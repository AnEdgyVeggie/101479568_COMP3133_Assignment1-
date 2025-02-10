const { gql } = require('apollo-server-express');

module.exports = gql`

# // USERS //////////////////////////////////////////////
# ///////////////////////////////////////////////////////
type User {
    username: String
    email: String,
    password: String,
    created_at: String,
    updated_at: String
}

input UserInput {
    username: String,
    email: String,
    password: String,
}

input UserLoginEmail {
    email: String,
    password: String,
},

input UserLoginUsername {
    username: String,
    password: String,
}

# // EMPLOYEES //////////////////////////////////////////
# ///////////////////////////////////////////////////////

type Employee {
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    designation: String,
    salary: Float,
    date_of_joining: String
    department: String,
    employee_photo: String
    created_at: String,
    updated_at: String
}

input EmployeeInput {
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    designation: String,
    salary: Float,
    department: String,
    employee_photo: String
}

input EmployeeDesignation {
    designation: String,
}

input EmployeeDepartment {
    department: String,
}


# // QUERIES ////////////////////////////////////////////
# /////////////////////////////////////////////////////// 


type Query {
    user(ID: ID!): User!
    getUsers(amount: Int): [User]
    loginUserEmail(userInput: UserLoginEmail): Boolean
    loginUserUsername(userInput: UserLoginUsername): Boolean

    employee(ID: ID!): Employee!
    getEmployees(amount: Int): [Employee]
    getEmployeesDepartment(empDepartment: EmployeeDepartment): [Employee]
    getEmployeesDesignation(empDesignation: EmployeeDesignation): [Employee]
}


# // MUTATIONS //////////////////////////////////////////
# /////////////////////////////////////////////////////// 
type Mutation {
    createUser(userInput: UserInput): User!
    deleteUser(ID: ID!): Boolean
    editUser(ID: ID!, userInput: UserInput): Boolean

    createEmployee(employeeInput: EmployeeInput): Employee!
    deleteEmployee(ID: ID!): Boolean
    editEmployee(ID: ID!, employeeInput: EmployeeInput): Boolean
}
`