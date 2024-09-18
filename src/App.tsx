import React from 'react';
import Products from './components/products/Products';
import Toast from './components/toast/Toast';

function App() {
  return (
    <div className="App wrapper">
        {/* Component using for Loading & Toast message globally */}
        <Toast />

        {/* Products Component */}
        <div className='container'>
          <Products />
        </div>
    </div>
  );
}

export default App;
