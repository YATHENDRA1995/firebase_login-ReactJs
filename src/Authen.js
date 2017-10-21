import React , {Component} from 'react';
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyA5cnXmkO-GdeksdD3OZ9snUdDwTA6rD50",
  authDomain: "login-4396c.firebaseapp.com",
  databaseURL: "https://login-4396c.firebaseio.com",
  projectId: "login-4396c",
  storageBucket: "login-4396c.appspot.com",
  messagingSenderId: "718476782037"
};
firebase.initializeApp(config);

class Authen extends Component {

  login(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email,password);

    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email,password);

    promise.then(user=>{
      var lout = document.getElementById("logout");
      lout.classList.remove('hide');
    });

    promise.catch(e=>{
      var err = e.message;
      console.log(err);
      this.setState({err:err});
    });
  }

  signup(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email,password);

    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email,password);

    promise.then(user=>{
      var err = "welcome"+user.email;
      firebase.database().ref('users/'+user.uid).set({
        email:user.email
      });
      console.log(user);
      this.setState({err:err});
    });

    promise
    .catch(e=>{
      var err = e.message;
      console.log(err);
      this.setState({err:err});
    });

  }
  google(){
    console.log("I am in google method");

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);

    promise.then( result => {
      var user = result.user;
      console.log(result);
      firebase.database().ref('users/'+user.uid).set({
        email: user.email,
        name: user.displayName
      });

    });
    promise.catch(e => {
      var msg = e.message;
      console.log(msg);
    });

  }

  logout(){
    firebase.auth().signOut();
    var lout = document.getElementById("logout");
    lout.classList.add('hide');

  }

  constructor(props){
    super(props);

    this.state = {
      err:''
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }
  render(){
    return(
      <div>
        <input id = "email" ref = "email" type = "email" placeholder = "Enter email"/><br />
        <input id = "pass" ref = "password" type = "password" placeholder = "Enter password"/><br />
        <p>{this.state.err}</p>
        <button onClick = {this.login}>LogIn</button>
        <button onClick = {this.signup}>SignUp</button>
        <button onClick = {this.logout} id = "logout" className = "hide">LogOut</button><br />
        <button onClick = {this.google} id = "google" className = "google">Sign Up With Google</button>
      </div>
    );
  }
}

export default Authen;
