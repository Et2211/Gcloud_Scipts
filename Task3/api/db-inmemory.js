//Initilise data
let users = [{
        email: "e.sharkey@live.com",
        roles: ["admin", "user"]
    },
    {
        email: "up817427@myport.ac.uk",
        roles: []
    }
]
let requests = []

//if user is authenticated, generate and return a random number
module.exports.getRandom = (user) => {
    if (isAuthorised(user)) return Math.random()
    throw new Error("Not Authenticated")

};

//if logged in, return a user's roles
module.exports.getRoles = (user) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == user) return users[i].roles //check if user exists in data
    }
    users.push({
        email: user,
        roles: []
    })
    return users[users.length - 1].roles
};

//If user isn't already a user or admin, requests to be a user
module.exports.requestRoles = (user) => {
    if (isAdmin(user) || isAuthorised(user)) return 202
    requests.push(user)
};

//if user is admin, returns list of users
module.exports.getUsers = (user) => {
    if (isAdmin(user)) return users
    throw new Error("Not Authenticated")
};

//if user is admin, returns all requests
module.exports.getRequests = (user) => {
    if (isAdmin(user)) return requests
    throw new Error("Not Authenticated")
};

//if user is admin, approves the request of a user
module.exports.approveRole = (admin, user) => {
    if (!isAdmin(admin)) {
        throw new Error("Not Authenticated")
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == user) {
                users[i].roles.push("user");
                requests = requests.filter(function(e) {
                    return e !== user
                })
                return users[i]
            }
        }
    }
};

//if user is admin, deletes the user. 
module.exports.deleteUser = (admin, user) => {
    if (!isAdmin(admin)) {
        throw new Error("Not Authenticated")
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == user) {
                users = users.filter(function(e) {
                    return e !== users[i]
                })
            }
        }
    }
};

//returns true if user is admin
function isAdmin(user) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == user) {
            return (users[i].roles.includes("admin"))
        }
    }
}

//returns true if user is authenticated
function isAuthorised(user) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == user) {
            return (users[i].roles.includes("user"))
        }
    }
}