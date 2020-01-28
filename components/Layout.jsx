import Head from 'next/head';
import Header from '../components/Header';

import "../styles/main.scss";

const Layout = props => (
  <div>
    <Head>
       <script data-ad-client="ca-pub-6251499797161261" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> 
    </Head>
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
