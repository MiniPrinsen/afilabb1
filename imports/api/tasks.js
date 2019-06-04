import { Mongo } from 'meteor/mongo';
 
export const Cats = new Mongo.Collection('tbl_cats');
export const Races = new Mongo.Collection('tbl_races');
export const Colors = new Mongo.Collection('tbl_colors');

Router.route('/');

if (Meteor.isServer) {
    Meteor.publish('tbl_cats', function subsPublication() {
        return Cats.find();
    });
    Meteor.publish('tbl_races', function racesPublication() {
        return Races.find();
    });
    Meteor.publish('tbl_colors', function colorsPublication() {
        return Colors.find();
    });

    Router.route('/get', {where: 'server'})
    .get(function(){
        var data = this.params.query.name;
        var res = Cats.find({name: data}).fetch()
        this.response.statusCode = 200;
        this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
        this.response.setHeader("Access-Control-Allow-Credentials", "true");
        this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        this.response.end(JSON.stringify(res));
    })
    Router.route('/post', {where: 'server'})
    .post(function(){
        console.log(this.request.body);

        var color = Colors.findOne({color: this.request.body.color})
        var race = Races.findOne({race: this.request.body.race})
        console.log("kattens färg: ", color._id);
        console.log("kattens ras: ", race._id);

        Cats.insert({
            name: this.request.body.name,
            race: race._id,
            color: color._id,
            createdAt: this.request.body.createdAt,
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
        var data = this.params.query.name;
        console.log("PUT: ", data);

        try {
            Cats.find({name: data}).forEach(function(singleDoc) {
                var searchId = singleDoc._id
                console.log("ID of the document: ", searchId);
                Cats.update({_id: searchId}, { $set: { createdAt: new Date() } })
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
        var data = this.params.query.name;
        try {
            Cats.find({name: data}).forEach(function(singleDoc) {
                var searchId = singleDoc._id
                console.log("ID of the document: ", searchId);
                Cats.remove({_id: searchId})
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