const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
var server = require("../server.js");


lab.experiment("Organizations", function () {


    let token;
    lab.before(async function () {

        let options = {
            method: 'POST',
            url: "/account/login",
            payload: {
                email: 'hapitest@pager.com',
                password: 'pass@word1'
            }
        };
        const response = await server.inject(options);
        token = response.result.token;
    });

    //Sample method to verify Testing is working as expected
    lab.test("Should return 200 OK", async function () {
        const options = {
            method: "GET",
            url: "/"
        };
        //server.inject lets you similate an http request
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")      
    });

    // //TODO This Test Case Needs To be defined for all Secured Endpoints 
    lab.test("Should return 401 if Token not supplied in Authorization Header", async function () {
        const options = {
            method: "GET",
            url: "/organizations"
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(401);
    });

    lab.test("Should return array of Organization objects", async function () {
        const options = {
            method: "GET",
            url: "/organizations",
            headers: {
                "Authorization": 'Bearer ' + token
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200
        Code.expect(response.result).to.contain('organizations'); //Expect organizations property in the response
        Code.expect(response.result.organizations).to.be.an.array(); //Expect Organizations as Array Object
    });

    lab.test("Should return 400 Bad Request If passed INVALID Params", async function () {
        const options = {
            method: "GET",
            url: "/organizations/NAME/val",
            headers: {
                "Authorization": 'Bearer ' + token
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(400);  //  Expect http response status code to be 400 Bad Request    
    });

    // lab.test("Should return 400 Bad Request If passed INCOMPLETE Params", async function () {
    //     const options = {
    //         method: "GET",
    //         url: "/organizations/name",
    //         headers: {
    //             "Authorization": 'Bearer ' + token
    //         }
    //     };
    //     const response = await server.inject(options)
    //     Code.expect(response.statusCode).to.equal(400);  //  Expect http response status code to be 400 Bad Request    
    // });

    lab.test("Should return 401 If passed CORRECT Filter Criteria but no Authorization Token", async function () {
        const options = {
            method: "GET",
            url: "/organizations?filter=name&value=someval"
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(401);

    });

    lab.test("Should return array of Organization If passed CORRECT Filter Criteria", async function () {
        const options = {
            method: "GET",
            url: "/organizations?filter=name&value=someval",
            headers: {
                "Authorization": 'Bearer ' + token
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200
        Code.expect(response.result).to.contain('organizations'); //Expect organizations property in the response
        Code.expect(response.result.organizations).to.be.an.array(); //Expect Organizations as Array Object
    });

    //POST TEST CASES
    lab.test("Should return 400 server error When empty object is Posted", async function () {
        const options = {
            method: "POST",
            url: "/organizations",
            headers: {
                "Authorization": 'Bearer ' + token
            }

        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(400);  //  Expect http response status code to be 400 ("Bad Request")
    });

    lab.test("Should return 400 When INCOMPLETE object is Posted", async function () {
        const options = {
            method: "POST",
            url: "/organizations",
            payload: {
                name: 'TestHost',
                description: 'Test description',
                code: 'THO101',
                url: 'http://thosp.com'
            },
            headers: {
                "Authorization": 'Bearer ' + token
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(400);
    });

    lab.test("Should return 400 When type is passed different than [employer, insurance, health system]", async function () {
        const options = {
            method: "POST",
            url: "/organizations",
            payload: {
                name: 'TestHost',
                description: 'Test description',
                code: 'THO101',
                url: 'http://thosp.com',
                type: 'playground'
            },
            headers: {
                "Authorization": 'Bearer ' + token
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(400);
    });

    lab.test("Should return 404 When id is not spllied", async function () {
        const options = {
            method: "PUT",
            url: "/organizations",
            payload: {
                name: 'TestHost',
                description: 'Test description',
                code: 'THO101',
                url: 'http://thosp.com',
                type: 'health system'
            },
            headers: {
                "Authorization": 'Bearer ' + token
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(404);
    });

    lab.test("Should return 400 When INCOMPLETE object is spllied", async function () {
        const options = {
            method: "PUT",
            url: "/organizations/5ab00c42c074e131f1088d55",
            payload: {
                name: 'TestHost',
                description: 'Test description',
                code: 'THO101',
                url: 'http://thosp.com',
            },
            headers: {
                "Authorization": 'Bearer ' + token
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(400);
    });

    lab.test("Should return 404 When id is not spllied", async function () {
        const options = {
            method: "DELETE",
            url: "/organizations",
            headers: {
                "Authorization": 'Bearer ' + token
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(404);
    });

});


lab.experiment("Account", function () {

    lab.test("Should return 400 When INCOMPLETE object is passed", async function () {
        const options = {
            method: "POST",
            url: "/account/register",
            payload: {
                email: '',
                password: ''
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(400);
    });

    lab.test("Should return 400 When Password is less than 8 character", async function () {
        const options = {
            method: "POST",
            url: "/account/register",
            payload: {
                email: 'hapitest@pager.com',
                password: 'pass'
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(400);
    });

    lab.test("Should return 400 When Password is greater than 12 character", async function () {
        const options = {
            method: "POST",
            url: "/account/register",
            payload: {
                email: 'hapitest@pager.com',
                password: 'pass123456789007'
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(400);
    });

    lab.test("Should return 200 OK and JWT Token", async function () {
        const options = {
            method: "POST",
            url: "/account/register",
            payload: {
                email: 'hapitest@pager.com',
                password: 'pass@word1'
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result).to.contain('token');
    });

    lab.test("Should return 400 When INCOMPLETE object is passed", async function () {
        const options = {
            method: "POST",
            url: "/account/login",
            payload: {
                email: '',
                password: ''
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(400);
    });

    lab.test("Should return 200 OK and JWT Token", async function () {
        const options = {
            method: "POST",
            url: "/account/login",
            payload: {
                email: 'hapitest@pager.com',
                password: 'pass@word1'
            }
        };
        const response = await server.inject(options)
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result).to.contain('token');
    });

});