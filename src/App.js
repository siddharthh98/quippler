/*global chrome*/
import React, {Component} from 'react';
import './App.css';
import Header from './components/header/header.component';
import { Highlights } from './components/highlights/highlights.component';
import { auth, functions } from './firebase.utils';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      highlights: [],
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;


  componentDidMount() {

    chrome.runtime.sendMessage({type: 'requestData'}, (response) => {
      if (response) {
        this.setState({
          highlights: Object.assign(this.state.highlights, response)
        });
      }
    });

    this.unsubscribeFromAuth = auth.onAuthStateChanged( userAuth => {
      if  (userAuth) {
        const {displayName, email} = userAuth;
        this.setState({currentUser: {displayName: displayName, email: email}});
      } else {
        this.setState({
          currentUser: null
        });
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    
    const { highlights, currentUser} = this.state; 
    
    if (highlights.length === 10 && currentUser) {
      functions.sendMessage(currentUser, highlights);
    }

    return (
      <div className='app'>
        <Header currentUser={currentUser}/>
        <Highlights highlights={highlights} currentUser={currentUser} />
      </div>
    );
  }
}

export default App;