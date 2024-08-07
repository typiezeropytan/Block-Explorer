import { useState } from 'react';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Transaction from './Pages/Transaction';
import TransactionList from './Pages/TransactionList';
import Address from './Pages/Address';
import Block from './Pages/Block';
import { getBlock } from './utils';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const searchData = async (event) => {
    event.preventDefault();
    if (searchTerm.startsWith('0x')) {
      if (searchTerm.length === 42) {
        window.location.replace(`/address/${searchTerm}`);
      } else if (searchTerm.length === 66) {
        if (await getBlock(searchTerm)) window.location.replace(`/block/${searchTerm}`);
        else window.location.replace(`/tx/${searchTerm}`);
      }
    } else {
      window.location.replace(`/block/${searchTerm}`);
    }
  };

  return (
    <BrowserRouter>
      <div className='w-5/6 mx-auto mt-8'>
        <header className='center-header'>
          <h1 className='font-bold text-2xl mb-4'>
            <Link to='/' title=''>Ethereum Block Explorer</Link>
          </h1>
        </header>
        <div className='form-container'>
          <form className='search-form' onSubmit={searchData}>
            <div>
              <label htmlFor='searchTerm'>Insert a block number, transaction hash or an address...</label>
              <input
                id='searchTerm'
                type='text'
                placeholder='Insert here...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button type='submit'>Search</button>
          </form>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tx/:hash' element={<Transaction />} />
          <Route path='/address/:hash' element={<Address />} />
          <Route path='/block/:hash' element={<Block />} />
          <Route path='/block/:hash/tx' element={<TransactionList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
