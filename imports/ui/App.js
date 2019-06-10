import React, { Component } from 'react';
import Cat from './Cat.js';
import { withTracker } from 'meteor/react-meteor-data';
import  DbSearch  from './DbSearch.js';
import CatTableHead from './CatTableHead.js';
import { Cats, Races, Colors } from '../api/cats.js';
 
// App component - represents the whole app
class App extends Component {

    state = {
        hideCompleted: true,
        showTable: false,
        catList: []
    }

    constructor(props) {
        super(props);
    }

    handleInputChange = (form, event) => {
        this.setState({
            [form]: {
                ...this.state[form],
                [event.target.name]: event.target.value,
            } 
        }, () => {console.log(this.state[form])})
    }

    getRace = () => { 
        return new Promise((resolve, reject) => {
            var race = Races.findOne({race: this.state.catSearch.catRace});

            if(race !== undefined) {
            fetch(`http://localhost:3000/cats/getrace/${race._id}`, {
                method: 'GET',
                credentials: 'include',
            })
            .then(res => res.json()
            .then(json => {
                if(json != '') {
                    json.map(cat => {
                        this.setState({
                            catData: {
                                cat_id: cat._id,
                                cat_name: cat.name,
                                cat_color: cat.color,
                                cat_race: cat.race,
                            }
                        }, () => resolve())
                }) 
            } else {
                alert("A cat with that race is not in the database.")
            }
            }))
            .catch(err => {reject(err)})
            }
            else {
                alert("A cat with that race is not in the database.")
            }
        })
       
    }

    toggleHideCompleted() {
        this.setState({
            hideCompleted: !this.state.hideCompleted,
        });
    }

    renderCats = () => {
        let catList = []
        Cats.find({race: this.state.catData.cat_race}).forEach(function(singleDoc) {
            catList.push(singleDoc)
        })
        this.setState({
            showTable: true,
            catList: catList
        }, () => {console.log(this.state.catList)})
    }
    
    render() {
        return (
        <div className="container">
            <header>
            <h1>Kattraser</h1>
            </header>
    
            <ul>
            </ul>
        { this.state.hideCompleted && <DbSearch renderCats={this.renderCats} inputChange={this.handleInputChange} submitForm={this.getRace} /> }
        <table>
            { this.state.showTable && < CatTableHead /> }   
            <tbody>
                { this.state.showTable && 
                    this.state.catList.map(cat => <Cat key={cat._id} cat={cat}/>)}
            </tbody>
        </table>
        </div>
        );
    }
}
export default withTracker(() => {
    Meteor.subscribe('tbl_cats');
    Meteor.subscribe('tbl_races');
    Meteor.subscribe('tbl_colors');
    return {
        cats: Cats.find({}).fetch(),
    };
  })(App);