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

    Router.route('/cats',{where: 'server'})

        // GET /cats - returns all info from MongoDB collection.
        .get(function(){
            var response = Cats.find().fetch();

            this.response.setHeader('Content-Type', 'application/json');
            this.response.end(JSON.stringify(response));
        })

        // POST /cats - adds new info to MongoDB collection.
        .post(function(){
            var response;
            if(this.request.body.name === undefined || 
                this.request.body.race === undefined || 
                this.request.body.color === undefined ) {
                response = {
                    "error": true,
                    "message" : "invalid data"
                }
            } else {
                var race = Races.findOne({race : this.request.body.race});
                var color = Colors.findOne({color : this.request.body.color});

                if(race !== undefined && color !== undefined) {
                    Cats.insert({
                        name: this.request.body.name,
                        race: race._id,
                        color: color._id,
                    })
                    response = {
                        "error" : false,
                        "message" : "Cat added."
                    }
                }
                else {
                    if(race == undefined && color == undefined) {
                        response = {
                            "error" : true,
                            "message" : "Race and Color not found."
                        }
                    }
                    else if(race == undefined) {
                        response = {
                            "error" : true,
                            "message" : "Race not found."
                        }
                    }
                   else {
                        response = {
                            "error" : true,
                            "message" : "Color not found."
                        }
                    }   
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
                var data = Cats.findOne({_id : this.params.id});

                if(data !== undefined) {
                    race = Races.findOne({race : this.request.body.race})
                    color = Colors.findOne({color : this.request.body.color})

                    if(race == undefined) {
                        Races.insert({race: this.request.body.race})
                        race = Races.findOne({race : this.request.body.race})
                    }
                    if(color == undefined){
                        Colors.insert({color: this.request.body.color})
                        color = Colors.findOne({color : this.request.body.color})
                    }
                    if(Cats.update({_id : data._id},{$set : {name : this.request.body.name,race : race._id,color : color._id}}) === 1) {
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

        //DELETE /cats/:id delete specific record.

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

        Router.route('/cats/getrace/:race', {where: 'server'})

        //GET /cats/getrace/:race - returns specific records
        .get(function(){
            var response;
            if(this.params.race !== undefined) {
                var data = Cats.find({race : this.params.race}).fetch();
                if(data.length > 0) {
                    response = data
                } else {
                    response = {
                        "error" : true,
                        "message" : "Cat with that race not found."
                    }
                }
            }
            this.response.setHeader('Content-Type','application/json');
            this.response.end(JSON.stringify(response));
        })
}