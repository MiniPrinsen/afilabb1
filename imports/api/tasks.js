import { Mongo } from 'meteor/mongo';
 
export const Tasks = new Mongo.Collection('tasks');

Router.route('/');

if (Meteor.isServer) {
    Meteor.publish('tasks', function subsPublication() {
        return Tasks.find();
    });

    Router.route('/get', {where: 'server'})
    .get(function(){
        var data = this.params.query.text;
        var res = Tasks.find({text: data}).fetch()
        this.response.statusCode = 200;
        this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
        this.response.setHeader("Access-Control-Allow-Credentials", "true");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.response.end(JSON.stringify(res));
    })
    Router.route('/post', {where: 'server'})
    .post(function(){
        console.log(this.request.body);

        Tasks.insert({
            text: this.request.body.text,
            createdAt: this.request.body.createdAt,
            test: this.request.body.test,
        })

        this.response.statusCode = 200;
        this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
        this.response.setHeader("Access-Control-Allow-Credentials", "true");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.response.end(JSON.stringify("Success"));
    })
    Router.route('/put', {where: 'server'})
    .put(function(){

        console.log("/PUT HEYOOOO");
        console.log("/POST HEYOOOO");
        var data = this.params.query.text;
        console.log("PUT: ", data);

        try {
            Tasks.find({text: data}).forEach(function(singleDoc) {
                var searchId = singleDoc._id
                console.log("ID of the document: ", searchId);
                Tasks.update({_id: searchId}, { $set: { createdAt: new Date() } })
            })  
        } catch(e) {
                console.log("error: ", e);
            }
        this.response.statusCode = 200;
        this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
        this.response.setHeader("Access-Control-Allow-Credentials", "true");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.response.end(JSON.stringify("Hey from put"));
    })
    Router.route('/delete', {where: 'server'})
    .delete(function(){
        var data = this.params.query.text;
        try {
            Tasks.find({text: data}).forEach(function(singleDoc) {
                var searchId = singleDoc._id
                console.log("ID of the document: ", searchId);
                Tasks.remove({_id: searchId})
            })  
        } catch(e) {
                console.log("error: ", e);
            }
        this.response.statusCode = 200;
        this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        this.response.setHeader("Access-Control-Allow-Credentials", "true");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.response.end(JSON.stringify("Hey from delete"));
    })
}