import { Mongo } from 'meteor/mongo';
 
export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
    Meteor.publish('tasks', function subsPublication() {
        return Tasks.find();
    });

    Router.route('/get', {where: 'server'})
    .get(function(){
        console.log("/GET HEYOOOO");
        var data = this.params.query.text;
        var res = Tasks.find({text: data}).fetch()
        this.response.statusCode = 200;
        this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
        this.response.setHeader("Access-Control-Allow-Credentials", "true");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.response.end(JSON.stringify(res));
    })
    Router.route('/post/:text', {where: 'server'})
    .post(function(){
        var params = this.params; // { _id: "5" }
        var id = params.text; // "5"
        var res = Tasks.insert({ text: id,
        createdAt: new Date()})

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
        // var data = this.params.query.text;
        // var res = Tasks.find({text: data}).fetch()
        this.response.statusCode = 200;
        this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
        this.response.setHeader("Access-Control-Allow-Credentials", "true");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.response.end(JSON.stringify("Hey from put"));
    })
    Router.route('/delete', {where: 'server'})
    .delete(function(){
        console.log("/DELETE HEYOOOO");
        console.log("/POST HEYOOOO");
        // var data = this.params.query.text;
        // var res = Tasks.find({text: data}).fetch()
        this.response.statusCode = 200;
        this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        this.response.setHeader("Access-Control-Allow-Credentials", "true");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.response.end(JSON.stringify("Hey from delete"));
    })
}