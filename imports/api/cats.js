import { Mongo } from 'meteor/mongo';
 
export const Cats = new Mongo.Collection('tbl_cats');

Router.route('/');

if (Meteor.isServer) {
    Meteor.publish('tbl_cats', function subsPublication() {
        return Cats.find();
    });

    // GET /cats - returns all info from MongoDB collection.

    Router.route('/cats',{where: 'server'})
        .get(function(){
            var response = Cats.find().fetch();
            this.response.setHeader('Content-Type', 'application/json');
            this.response.end(JSON.stringify(response));
        })

        // POST /cats - adds new info to MongoDB collection.
        .post(function(){
            var response;
            if(this.request.body.name === undefined || this.request.body.race === undefined) {
                response = {
                    "error": true,
                    "messege" : "invalid data"
                };
            } else {
                Cats.insert({
                    name: this.request.body.name,
                    race: this.request.body.race
                });
                response = {
                    "error" : false,
                    "message" : "Cat added."
                }
            }
            this.response.setHeader('Content-Type', 'application/json');
            this.response.end(JSON.stringify(response));
        });

    Router.route('/cats/:id', {where: 'server'})

        //GET /cats/:id - returns specific records

        .get(function(){
            var response;
            if(this.params.id !== undefined) {
                var data = Cats.find({_id : this.params.id}).fetch();
                if(data.length > 0) {
                    response = data
                } else {
                    response = {
                        "error" : true,
                        "message" : "Cat not found."
                    }
                }
            }
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(response));
        })

        //PUT /cats/:id - update specific records.
        .put(function(){
            var response;
            if(this.params.id !== undefined) {
                var data = Cats.find({_id : this.params.id}).fetch();   
                if(data.length > 0) {
                    if(Cats.update({_id : data[0]._id},{$set : {name : this.request.body.name,race : this.request.body.race}}) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Cat information updated."
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Cat information not updated."
                        }
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "Cat not found."
                    }
                }
            }
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(response));
        })

        //DELETE /message/:id delete specific record.

        .delete(function(){
            var response;
            if(this.params.id !== undefined) {
                var data = Cats.find({_id : this.params.id}).fetch();
                if(data.length > 0) {
                    if(Cats.remove(data[0]._id) === 1) {
                        response = {
                            "error" : false,
                            "message" : "Cat deleted."
                        }
                    } else {
                        response = {
                            "error" : true,
                            "message" : "Cat not deleted."
                        }
                    }
                } else {
                    response = {
                        "error" : true,
                        "message" : "Cat not found."
                    }
                }
            }
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(response));
        });


    // Router.route('/get', {where: 'server'})
    // .get(function(){
    //     var data = this.params.query.text;
    //     var res = Cats.find({text: data}).fetch()
    //     this.response.statusCode = 200;
    //     this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    //     this.response.setHeader("Access-Control-Allow-Credentials", "true");
    //     this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     this.response.end(JSON.stringify(res));
    // })

    // Router.route('/post', {where: 'server'})
    // .post(function(){
    //     console.log(this.request.body);

    //     Cats.insert({
    //         text: this.request.body.text,
    //         createdAt: this.request.body.createdAt,
    //         test: this.request.body.test,
    //     })

    //     this.response.statusCode = 200;
    //     this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    //     this.response.setHeader("Access-Control-Allow-Credentials", "true");
    //     this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     this.response.end(JSON.stringify("Success"));
    // })
    // Router.route('/put', {where: 'server'})
    // .put(function(){

    //     console.log("/PUT HEYOOOO");
    //     console.log("/POST HEYOOOO");
    //     var data = this.params.query.text;
    //     console.log("PUT: ", data);

    //     try {
    //         Cats.find({text: data}).forEach(function(singleDoc) {
    //             var searchId = singleDoc._id
    //             console.log("ID of the document: ", searchId);
    //             Cats.update({_id: searchId}, { $set: { createdAt: new Date() } })
    //         })  
    //     } catch(e) {
    //             console.log("error: ", e);
    //         }
    //     this.response.statusCode = 200;
    //     this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    //     this.response.setHeader("Access-Control-Allow-Credentials", "true");
    //     this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     this.response.end(JSON.stringify("Hey from put"));
    // })
    // Router.route('/delete', {where: 'server'})
    // .delete(function(){
    //     var data = this.params.query.text;
    //     try {
    //         Cats.find({text: data}).forEach(function(singleDoc) {
    //             var searchId = singleDoc._id
    //             console.log("ID of the document: ", searchId);
    //             Cats.remove({_id: searchId})
    //         })  
    //     } catch(e) {
    //             console.log("error: ", e);
    //         }
    //     this.response.statusCode = 200;
    //     this.response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    //     this.response.setHeader("Access-Control-Allow-Credentials", "true");
    //     this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     this.response.end(JSON.stringify("Hey from delete"));
    // })
}