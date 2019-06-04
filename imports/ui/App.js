import React, { Component } from 'react';
import Cat from './Cat.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import  DbSearch  from './DbSearch.js';
import CatTableHead from './CatTableHead.js';
import { Cats, Races, Colors } from '../api/cats.js';
 
// App component - represents the whole app
class App extends Component {

    state = {
        hideCompleted: true,
        showTable: false,

        catData: {
            catSearch: '',
            cat_name: '',
            cat_race: '',
            cat_color: '',
        }
    }

    constructor(props) {
        super(props);
     
        // this.state = {
        //   hideCompleted: true,
         
         
        // };
    }

    handleSubmit(event) {
        event.preventDefault();
     
        // Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
     
        Cats.insert({
          text,
          createdAt: new Date(), // current time
        });
     
        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    handleInputChange = (form, event) => {
        this.setState({
            [form]: {
                ...this.state[form],
                [event.target.name]: event.target.value,
            } 
        }, () => {console.log(this.state[form])})
    }

    getData = () => {
       // Colors.findOne({})
       var race = Races.findOne({race: this.state.catSearch.catRace});
    //    console.log("Rasens id: ", race._id);
        fetch(`http://localhost:3004/cats/${race._id}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(res => res.json()
        .then(json => {
            console.log("JSON: ", json)
            if(json != '') {
            json.map(cat => {
                this.setState({
                    showTable: true,

                    catData: {
                        cat_name: cat.name,
                        cat_color: cat.color,
                        cat_race: cat.race,
                    }
                })
                //console.log("Kattens RIKTIGA färg: ", Colors.findOne({color: this.state.catData.cat_color}));
                console.log('Kattens namn: ', this.state.catData.cat_name);
                console.log('Kattens ras: ', this.state.catData.cat_race);
                console.log('Kattens färg: ', this.state.catData.cat_color);

            }) 
        } else {
            alert("Prenumerationsnumret finns inte registrerat i systemet.")
        }
        }))
        .catch(err => console.log(err))
    }

    toggleHideCompleted() {
        this.setState({
        hideCompleted: !this.state.hideCompleted,
        });
    }

    renderCats = () => {
        return this.props.cats.map((cat) => (
            <Cat key={cat._id} cat={cat}/>
        ));
        
    }
    
    render() {
        return (
        <div className="container">
            <header>
            <h1>Todo List ({this.props.incompleteCount})</h1>

            <label className="hide-completed">
                <input
                type="checkbox"
                readOnly
                checked={this.state.hideCompleted}
                onClick={this.toggleHideCompleted.bind(this)}
                />
                Hide Completed Cats
            </label>


            <form className="new-cat" onSubmit={this.handleSubmit.bind(this)} >
                <input
                type="text"
                ref="textInput"
                placeholder="Type to add new cats"
                />
            </form>
            </header>
    
            <ul>
            </ul>
        { this.state.hideCompleted && <DbSearch inputChange={this.handleInputChange} submitForm={this.getData} /> }
        <table>
            { this.state.showTable && < CatTableHead /> }   
            <tbody>
                {/* Show Cats */}
                { this.state.showTable && this.renderCats() }
            </tbody>
        </table>
        {/* { <DbSearch inputChange={this.handleInputChange} submitForm={this.getData} /> } */}
        </div>
        );
    }
}
export default withTracker(() => {
    Meteor.subscribe('tbl_cats');
    Meteor.subscribe('tbl_races');
    Meteor.subscribe('tbl_colors');
    return {
      cats: Cats.find({}, { sort: { createdAt: -1 } }).fetch(),
      incompleteCount: Cats.find({ checked: { $ne: true } }).count(),
    };
  })(App);