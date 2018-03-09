import { createStore } from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            {
                var maxIndex = Math.max.apply(Math, state.map(o => o._id));
                var id = maxIndex + 1;
                var array = action.payload;
                array._id = id;
                state.push(array);
                console.log("Contact add completed successfully");
                break;
            }

        case 'DELETE':
            {

                var index = state.map(function (item) { return item._id; })
                    .indexOf(parseInt(action.payload._id) ? parseInt(action.payload._id) : 0);
                state.splice(index, 1);
                if (index == -1) {
                    console.log("delete index not valid");
                }
                else {
                    console.log("Contact delete completed successfully");
                }
                break;
            }
        case 'UPDATE':
            {


                var index = state.map(item => item._id)
                    .indexOf(parseInt(action.payload._id) ? parseInt(action.payload._id) : 0);

                if (index == -1) {
                    console.log("update index not valid");
                }
                else {
                    var obj = {
                        _id: action.payload._id,
                        name: action.payload.name == '' ? state[index].name : action.payload.name,
                        company: action.payload.company == '' ? state[index].company : action.payload.company,
                        designation: action.payload.designation == '' ? state[index].designation : action.payload.designation,
                        age: action.payload.age == '' ? state[index].age : action.payload.age,
                        location: action.payload.location == '' ? state[index].location : action.payload.location,
                        image: '../images/upload.jpg'
                    }
                    state[index] = action.payload;
                    console.log("Contact updation completed successfully");
                }


                break;
            }
        case 'SHOWALL': {
            console.log(state);
        }
        default:
    }
    return state;
}
const contactList = [
    { _id: 1, name: 'Debopoma Chaudhury', company: 'Netwoven', designation: 'Senior Engineer', age: '32 yrs', location: 'Kolkata', image: '../images/dc.png' },
    { _id: 2, name: 'Sanjukta Das', company: 'JP Morgan', designation: 'Project Lead', age: '31 yrs', location: 'Singapore', image: '../images/upload.jpg' },
    { _id: 3, name: 'Suhit Saha', company: 'Prana', designation: 'Technical Producer', age: '31 yrs', location: 'Mumbai', image: '../images/upload.jpg' },
    { _id: 4, name: 'Kumaresh Roy', company: 'Royal Chem', designation: 'CEO', age: '32 yrs', location: 'Kolkata', image: '../images/upload.jpg' }
];
const store = createStore(reducer, contactList);

store.subscribe(() => {
    recursiveAsyncReadLine();
    //console.log(store.getState());
})

// store.dispatch({
//     type: 'ADD',
//     payload: { _id: 5, name: 'Parag Basak', company: 'Kolkata Police', designation: 'SI', age: '32 yrs', location: 'Kolkata', image: '../images/upload.jpg' }
// });

// store.dispatch({
//     type: 'DELETE',
//     payload: { _id: 3 }
// });

// store.dispatch({
//     type: 'UPDATE',
//     payload: { _id: 2, name: 'Sanjukta Das Saha', company: 'JP Morgan', designation: 'Project Lead', age: '31 yrs', location: 'Singapore', image: '../images/upload.jpg' },
// });

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const recursiveAsyncReadLine = () => {
    rl.question('What action do you want to perform on ContactList?(Please enter : ADD/UPDATE/DELETE/SHOWALL/EXIT) ', (answer) => {
        // TODO: Log the answer in a database
        switch (answer.toString().toUpperCase()) {
            case 'ADD':
                {
                    rl.question(`To enter new contact press enter key`, (answer) => {
                        var name;
                        var company;
                        var designation;
                        var age;
                        var location;
                        rl.question(`Name:`, (answer) => {
                            name = answer;
                            rl.question(`Company:`, (answer) => {
                                company = answer;
                                rl.question(`Designation:`, (answer) => {
                                    designation = answer;
                                    rl.question(`Age:`, (answer) => {
                                        age = answer;
                                        rl.question(`Location:`, (answer) => {
                                            location = answer;

                                            var array = { _id: 0, name: name, company: company, designation: designation, age: age, location: location, image: '../images/upload.jpg' }
                                            store.dispatch({
                                                type: 'ADD',
                                                payload: array
                                            });

                                        });
                                    });
                                });
                            });

                        });

                    });
                    break;
                }

            case 'DELETE':
                {
                    rl.question(`To enter delete contact press enter key`, (answer) => {
                        rl.question(`Id:`, (answer) => {
                            store.dispatch({
                                type: 'DELETE',
                                payload: { _id: answer }
                            });
                        })
                    })
                    break;
                }
            case 'UPDATE':
                {
                    rl.question(`To update contact press enter key(in case you dont want to change any property leave it blank)`, (answer) => {
                        var _id;
                        var name;
                        var company;
                        var designation;
                        var age;
                        var location;
                        rl.question(`Id:`, (answer) => {
                            _id = answer;
                            rl.question(`Name:`, (answer) => {
                                name = answer;
                                rl.question(`Company:`, (answer) => {
                                    company = answer;
                                    rl.question(`Designation:`, (answer) => {
                                        designation = answer;
                                        rl.question(`Age:`, (answer) => {
                                            age = answer;
                                            rl.question(`Location:`, (answer) => {
                                                location = answer;

                                                var array = { _id: _id, name: name, company: company, designation: designation, age: age, location: location, image: '../images/upload.jpg' }
                                                store.dispatch({
                                                    type: 'UPDATE',
                                                    payload: array
                                                });
                                            });
                                        });
                                    });
                                });

                            });
                        });

                    });

                    break;

                }
            case 'SHOWALL':
                {
                    store.dispatch({
                        type: 'SHOWALL',
                        payload: {}
                    });

                    break;
                }
            case 'EXIT':
                {
                    rl.close();
                    break;
                }

            default:
                {
                    console.log("Enter valid operation");
                    recursiveAsyncReadLine();
                }
        }
    });
}

recursiveAsyncReadLine();
