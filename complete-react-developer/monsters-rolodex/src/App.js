import { useState, useEffect } from 'react';

import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
  const [search, setSearch] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok)
          throw new Error('Something went wrong! Try again please.');

        return response.json();
      })
      .then(users => {
        setMonsters(users);
        setFilteredMonsters(users);
      })
      .catch(err => console.log(err.message));
  }, []);

  const searchHandler = e => {
    const searchStr = e.target.value.toLowerCase();
    const newFilteredMonster = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchStr)
    );

    setSearch(e.target.value);
    setFilteredMonsters(newFilteredMonster);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monster Rolodex</h1>

      <SearchBox
        className="monsters-search-box"
        placeholder="search monsters"
        search={search}
        onChangeHandler={searchHandler}
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       filteredMonster: [],
//       search: '',
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => {
//         if (!response.ok)
//           throw new Error('Something went wrong! Try again please.');

//         return response.json();
//       })
//       .then(users =>
//         this.setState(() => ({
//           monsters: users,
//           filteredMonster: users,
//         }))
//       )
//       .catch(err => console.log(err.message));
//   }

//   searchHandler = e => {
//     const { monsters } = this.state;

//     const searchStr = e.target.value.toLowerCase();
//     const newFilteredMonster = monsters.filter(monster =>
//       monster.name.toLowerCase().includes(searchStr)
//     );

//     this.setState(() => ({
//       filteredMonster: newFilteredMonster,
//       search: e.target.value,
//     }));
//   };

//   render() {
//     const { filteredMonster, search } = this.state;
//     const { searchHandler } = this;

//     return (
//       <div className="App">
//         <h1 className="app-title">Monster Rolodex</h1>

//         <SearchBox
//           className="monsters-search-box"
//           placeholder="search monsters"
//           search={search}
//           onChangeHandler={searchHandler}
//         />

//         <CardList monsters={filteredMonster} />
//       </div>
//     );
//   }
// }

export default App;

