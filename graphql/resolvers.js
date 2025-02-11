const User = require("../models/User")
const Employee = require("../models/Employee")
const bcrypt = require("bcrypt");

// Validation is handled within the Mongoose Schemas

module.exports = {
    Query: {
        // USERS //////////////////////////////////////////////
        ///////////////////////////////////////////////////////
        async user(_, { ID }) { // get single user
            return await User.findById(ID)
        },

        async getUsers(_) { // get all users
            return await User.find().sort()
        },

        async loginUserEmail(_, {userInput: {email, password}}) {
            const user = await User.findOne({email: email})
            if (!user) return false;
            let login = await bcrypt.compare(password, user['password'])
            console.log(login)
            return login
            
        },

        async loginUserUsername(_, {userInput: {username, password}}) {
            const user = await User.findOne({username: username})
            if (!user) return false;
            let login = await bcrypt.compare(password, user['password'])
            console.log(login)
            return login
        },

        // EMPLOYEES //////////////////////////////////////////
        ///////////////////////////////////////////////////////
        async employee(_, { ID }) { // get single user
            return await Employee.findById(ID)
        },
        async getEmployees(_) { // get all users
            return await Employee.find().sort()
        },
        async getEmployeesDepartment(_, { empDepartment: {department} }) { // get single user
            const res = await Employee.find({department: department})
            console.log(res)
            return res
        },
        async getEmployeesDesignation(_, { empDesignation: {designation} }) { // get single user
            const res =  await Employee.find({designation: designation})
            return res
        },
    },
    Mutation: {
        // USERS //////////////////////////////////////////////
        ///////////////////////////////////////////////////////
        async createUser(_, {userInput: {username, email, password}}) {
            const salt = 10
            const user = await new Promise((resolve, reject) => {

                bcrypt.hash(password, salt, async (error, hashedPass) => {
                    if (error) {
                        return {
                            status: 400,
                            error: "There was an error in the hashing of the provided password"
                        }
                    }
                    
                    const createdUser = new User({
                        username: username,
                        email: email,
                        password: hashedPass,
                        created_at: new Date().toISOString()
                    })
                    
                    resolve(createdUser.save());
                    
                })
            })

            console.log(user)

            return {
                id: user.id,
                ...user._doc
            }

        },
        async deleteUser(_, {ID}) {
            const successfulDelete = (await User.deleteOne({_id: ID})).deletedCount
            return successfulDelete 
        },
        async editUser(_, {ID, userInput: {username, email, password}}) {
            const successfulEdit = (await User.updateOne({_id: ID}, {
                username: username,
                email: email,
                password: password
            })).modifiedCount

            return successfulEdit
        },

        // EMPLOYEES //////////////////////////////////////////
        ///////////////////////////////////////////////////////

        async createEmployee(_, {employeeInput: {
            first_name, last_name, email, gender, 
            designation, salary, department, employee_photo
        }}) {

            const createdEmployee = new Employee({
                first_name: first_name, 
                last_name: last_name, 
                email: email, 
                gender: gender, 
                designation: designation, 
                salary: salary, 
                date_of_joining: new Date().toISOString(),
                department: department, 
                employee_photo: employee_photo,
                created_at: new Date().toISOString(),
            })

            const res = await createdEmployee.save()
            console.log(res)

            return {
                id: res.id,
                ...res._doc
            }

        },
        async deleteEmployee(_, {ID}) {
            const successfulDelete = (await Employee.deleteOne({_id: ID})).deletedCount
            return successfulDelete 
        },
        async editEmployee(_, {ID, employeeInput: {
            first_name, last_name, email, gender, 
            designation, salary, department, employee_photo
        }}) {
            const successfulEdit = (await Employee.updateOne({_id: ID}, {
                first_name: first_name, 
                last_name: last_name, 
                email: email, 
                gender: gender, 
                designation: designation, 
                salary: salary, 
                department: department, 
                employee_photo: employee_photo,
                updated_at: new Date().toISOString()
            })).modifiedCount

            return successfulEdit
        },


    }
}