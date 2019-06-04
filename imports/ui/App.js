import React, { Component } from 'react';
import Cat from './Cat.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Cats } from '../api/cats.js';
import ReactDOM from 'react-dom';
 
// App component - represents the whole app
class App extends Component {

    constructor(props) {
        super(props);
     
        this.state = {
          hideCompleted: false,
        };
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
//   getCats() {
//     return [
//       { _id: 1, text: 'This is cat 1' },
//       { _id: 2, text: 'This is cat 2' },
//       { _id: 3, text: 'This is cat 3' },
//     ];
//   }

    toggleHideCompleted() {
        this.setState({
        hideCompleted: !this.state.hideCompleted,
        });
    }
    
    renderCats() {
        let filteredCats = this.props.cats;
        if (this.state.hideCompleted) {
            filteredCats = filteredCats.filter(cat => !cat.checked);
        }
        return filteredCats.map((cat) => (
                <Cat key={cat._id} cat={cat} />
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
            {this.renderCats()}
            </ul>
        </div>
        );
    }
}
export default withTracker(() => {
    Meteor.subscribe('tbl_cats');
    return {
      cats: Cats.find({}, { sort: { createdAt: -1 } }).fetch(),
      incompleteCount: Cats.find({ checked: { $ne: true } }).count(),
    };
  })(App);