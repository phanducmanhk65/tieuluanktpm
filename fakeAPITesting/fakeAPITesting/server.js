let express = require('express');
let app = express();
var bodyParser = require('body-parser');
let port = 8080;

app.listen(port);
var users = [
	{
		id: "1",
		username: "linhnv",
		name: "Nguyen Van Linh",
		age: "19",
		class: "K65CD"
	},
	{
		id: "2",
		username: "huydh",
		name: "Đao Quang Huy",
		age: "20",
		class: "K65CD"
	},
	{
		id: "3",
		username: "manhpd",
		name: "Phan Duc Manh",
		age: "20",
		class: "K65CD"
	},
	{
		id: "4",
		username: "duonghm",
		name: "Hoang Minh Duong",
		age: "20",
		class: "K65CD"
	},
	{
		id: "5",
		username: "anv",
		name: "Nguyen Van A",
		age: "22",
		class: "K63CD"
	},
	{
		id: "6",
		username: "lihnv",
		name: "Nguyen Van ",
		age: "29",
		class: "K65CD"
	},
	{
		id: "7",
		username: "hydh",
		name: "Đao Quang",
		age: "3",
		class: "K65CD"
	},
	{
		id: "8",
		username: "mahpd",
		name: "Phan Duc ",
		age: "17",
		class: "K65CD"
	},
	{
		id: "9",
		username: "duoghm",
		name: "ABC DEF",
		age: "30",
		class: "K65CD"
	},
	{
		id: "10",
		username: "auv",
		name: "Nguyen Van B",
		age: "22",
		class: "K63CD"
	}
];


app.use(bodyParser.json());

app.get('/api/user/:id(\\d+)', function(req, res){
	var id = req.params.id;
	if(id >= 0 && id < users.length)
		res.json(users[id-1]);
	else
		res.json({message: "Not found"});
});

app.get('/api/users', function(req, res){
	var age = req.body.age;
	const arr = users.filter((value, index, array) => {
		return age === undefined || value.age === age;
	})
	res.json(arr);
});

app.post('/api/user', (req, res) => {
	var body = req.body;
	if(body.username === undefined || body.name === undefined || body.age === undefined)
		return res.json({message: "Can dien day du thong tin"});
	const arr = users.filter((value, index, array) => {
		return value.username === body.username;
	})
	if(arr.length > 0)
		return res.json({message: "User da ton tai"});
	var user = {
		id: users.length,
		username: body.username,
		name: body.name,
		age: body.age,
		class: body.class === undefined ? "" : body.class
	}
	users.push(user);
	return res.json(users[users.length - 1]);
})

app.delete('/api/user', (req, res) => {
	var id = req.body.id;
	if(id.undefined)
		return res.json({message: "Can dien ID nguoi dung"});
		var count = 0;
	id.map((value, index, array) => {
		for(var i = 0; i < users.length; i++){
			if(users[i].id == value){
				users.splice(i, 1); 
				count++;
			}
		}
	})
	return res.json({message: "Delete success " + count + " uses"});
})

app.put('/api/user', (req, res) => {
	
	var body = req.body;
	var id = body.id;
	var index = -1;
	for(var i = 0; i < users.length; i++){
		if(users[i].id == id){
			index = i;
			break;
		}
	}
	if(index == -1)
		return res.json({message: "User khong ton tai"});
	var user = users[index];
	user.username = body.class === undefined ? user.username : body.username;
	user.age = body.class === undefined ? user.age : body.age;
	user.name = body.class === undefined ? user.name : body.name;
	user.class = body.class === undefined ? user.class : body.class;
	users[index] = user;
	return res.json(users[index]);
})