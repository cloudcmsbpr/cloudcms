import axios from "axios";


const path = "http://localhost:5000";

// test("get all projects", () => {
//     expect.assertions(1);
//     return axios.get(path + "/portfolio/projects", {headers: {auth: "1234"}}).catch((err: any) => {
//         expect(err.response.status).toEqual(401);
//     });
// });

test("add tech", () => {
    expect.assertions(1);
    return axios.post(path + "/portfolio/add_tech", {
        'name': 't1', 'description': 'some_tech', 'image_url': 'http://some_image'
    }).then((res: any) => {
        console.log(res);
        expect(res.status).toEqual(200);
    }).catch(err => console.log(err));
});
