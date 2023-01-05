import { useState, useEffect, ChangeEvent } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

import { getData } from './utils/data.utils';

export type Monster = {
  id: string;
  name: string;
  email: string;
};

const App = () => {
  const [search, setSearch] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => {
    //     if (!response.ok)
    //       throw new Error('Something went wrong! Try again please.');
    //     return response.json();
    //   })
    //   .then(users => {
    //     setMonsters(users);
    //     setFilteredMonsters(users);
    //   })
    //   .catch(err => console.log(err.message));

    const fetchUsers = async () => {
      const users = await getData<Monster[]>(
        'https://jsonplaceholder.typicode.com/users'
      );

      setMonsters(users);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const searchStr = search.toLowerCase();

    const newFilteredMonster = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchStr)
    );

    setFilteredMonsters(newFilteredMonster);
  }, [monsters, search]);

  const searchHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
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

