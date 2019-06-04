import React, { Component } from 'react';
 
import { Cats } from '../api/cats.js';
// Cat component - represents a single todo item
export default class Cat extends Component {

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Cats.update(this.props.cat._id, {
          $set: { checked: !this.props.cat.checked },
        });
      }
     
      deleteThisCat() {
        Cats.remove(this.props.cat._id);
      }
  render() {
    // Give cats a different className when they are checked off,
    // so that we can style them nicely in CSS
    const catClassName = this.props.cat.checked ? 'checked' : '';
 
    return (
      <li className={catClassName}>
        <button className="delete" onClick={this.deleteThisCat.bind(this)}>
          &times;
        </button>
 
        <input
          type="checkbox"
          readOnly
          checked={!!this.props.cat.checked}
          onClick={this.toggleChecked.bind(this)}
        />
 
        <span className="text">{this.props.cat.text}</span>
      </li>
    );
  }
}