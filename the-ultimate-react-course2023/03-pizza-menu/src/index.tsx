import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

type PizzaData = {
  name: string;
  ingredients: string;
  price: number;
  photoName: string;
  soldOut: boolean;
};

const pizzaData: PizzaData[] = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
];

function App(): JSX.Element {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header(): JSX.Element {
  // const style: CSSProperties = {
  //   color: 'red',
  //   fontSize: '3rem',
  //   textTransform: 'uppercase',
  // };
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu(): JSX.Element {
  const pizzas = pizzaData;

  return (
    <main className="menu">
      <h2>Our menu</h2>

      {pizzas.length > 0 ? (
        <>
          <p>Authentic Italian pizzas</p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza
                {...pizza}
                key={pizza.name}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please comeback later.</p>
      )}
    </main>
  );
}

function Pizza({
  name,
  ingredients,
  photoName,
  price,
  soldOut,
}: PizzaData): JSX.Element {
  return (
    <li className={`pizza ${soldOut ? 'sold-out' : ''}`.trim()}>
      <img
        src={photoName}
        alt={name}
      />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <span>{soldOut ? 'SOLD OUT' : price}</span>
      </div>
    </li>
  );
}

function Footer(): JSX.Element {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour < closeHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order
          closeHour={closeHour}
          openHour={openHour}
        />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  );
  // return React.createElement('footer', null, "We're currently open!");
}

function Order({
  closeHour,
  openHour,
}: {
  closeHour: number;
  openHour: number;
}) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 until {closeHour}:00. Come visit us to
        order online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
