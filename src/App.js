import { Component } from 'react';
import styled from 'styled-components'

import './App.css';
import Person from './Person/Person'

const Joy = () => {
  return <div><h1> 😂 </h1><h1> 😂 </h1></div>
}

const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red': 'green'};
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  curosr: pointer;

  &:hover {
    background-color: ${props => props.alt ? 'salmon': 'lightgreen'};
    color: black;
  }
`

class App extends Component {
  state = {
    persons: [
      {id: 'asd', name: 'Max', age: 28},
      {id: '1231', name: 'Alex', age: 30},
      {id: 'dasda', name: 'Stephanie', age: 26}
    ],
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        {name: newName, age: 28},
        {name: 'Alex', age: 30},
        {name: 'Stephanie', age: 10}
      ]
    })
  }

  nameChangeHandler = (event, id) => {
    let personIndex = this.state.persons.findIndex( person => {
      return person.id === id
    })
    const person = {...this.state.persons[personIndex]}
    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] =  person

    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({
      showPersons: !doesShow
    })
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons]
    persons.splice(index, 1)
    this.setState({ persons: persons})
  }

  render() {
    // const style = {
    //   backgroundColor: 'green',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   curosr: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // }

    let persons = null

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person
                key={person.id}
                click={() => {this.deletePersonHandler(index) }}
                change={(event) => this.nameChangeHandler(event, person.id)}
                name={person.name}
                age={person.age} />
              })
          }
        </div>
      )

      // style.backgroundColor = 'red' // WHY!!!!!, przecież to const
      // style[':hover'] =  {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    const classes = []
    if(this.state.persons.length <= 2 ) {
      classes.push('red') // WHY!!!!!, przecież to const
    }
    if(this.state.persons.length <= 1 ) {
      classes.push('bold') // WHY!!!!!, przecież to const
    }

    return (
      <div className="App">
        <h1> Hi, I'm React App </h1>
        <p className={classes.join(' ')}> This is really working! </p>
        <Joy/>
        {/* <button onClick={() => this.switchNameHandler('Maximilian')}>Switch name!</button> */}
        <StyledButton
          alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}>Toggle persons!
        </StyledButton>

        { persons }
      </div>
    );
  }
}

// const App = props => {
//   const [personsState, setPersonFunction] = useState({
//     persons: [
//       {name: 'Max', age: 28},
//       {name: 'Alex', age: 30},
//       {name: 'Stephanie', age: 26}
//     ],
//     otherState: 'Oh fuck'
//   })

//   const switchNameHandler = () => {
//     setPersonFunction({
//       persons: [
//         {name: 'Maximilian', age: 28},
//         {name: 'Alex', age: 30},
//         {name: 'Stephanie', age: 10}
//       ]
//     })
//   }

//   return (
//     <div className="App">
//       <h1> Hi </h1>
//       <Joy/>

//       <button onClick={switchNameHandler}>Switch name!</button>
//       <Person
//         name={personsState.persons[0].name}
//         age={personsState.persons[0].age}
//       />
//       <Person
//         name={personsState.persons[1].name}
//         age={personsState.persons[1].age}
//       > My Hobbies: Racing
//       </Person>
//       <Person
//         name={personsState.persons[2].name}
//         age={personsState.persons[2].age}
//       />
//     </div>
//   );
// }

export default App;
