import Head from 'next/head';
import Header from '../components/Header';

import "../styles/main.scss";

const Layout = props => (
  <div>
    <Header/>
    <section className="section">
      <div className="container">
        <h1 className="title">{props.title}</h1>
        {props.children}
      </div>
    </section>
  </div>
);

export default Layout;
