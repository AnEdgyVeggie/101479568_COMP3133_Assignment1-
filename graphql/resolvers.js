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
            console.log("USERS DISPLAYED")
            return await User.find().sort()
        },

        async loginUserEmail(_, {userInput: {email, password}}) {
            
            const user = await User.findOne({email: email})
            let login = await bcrypt.compare(password, user['password'])
            if (!login) return "false";
            console.log("LOGGED IN: " + login)
            return user._id
            
        },

        async loginUserUsername(_, {userInput: {username, password}}) {

            const user = await User.findOne({username: username})
            let login = await bcrypt.compare(password, user['password'])
            if (!login) return "false";
            console.log("LOGGED IN: " + login)
            return user._id
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
            empData = {

            }

            // this checks for unincluded values and doesnt include them
            // in the update call to MONGO so that values arent changed to
            // empty

            if (first_name !== "" && first_name !== null) empData.first_name = first_name
            if (last_name !== "" && last_name !== null) empData.last_name = last_name
            if (email !== "" && email !== null) empData.email = email
            if (gender !== "" && gender !== null) empData.gender = gender
            if (designation !== "" && designation !== null) empData.designation = designation
            if (salary !== "" && salary !== null) empData.salary = parseFloat(salary).toFixed(2)
            if (department !== "" && department !== null) empData.department = department
            if (employee_photo !== "" && employee_photo !== null) empData.employee_photo = employee_photo

            empData.updated_at = new Date().toISOString()

            const successfulEdit = (await Employee.updateOne({_id: ID}, empData)).modifiedCount


            return successfulEdit
        },


    }
}