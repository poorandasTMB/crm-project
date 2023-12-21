import './App.css';
import React from 'react';
import Routing from './routing';
import { BrowserRouter } from 'react-router-dom';
import CustomTheme from "./theme";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <CustomTheme>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </CustomTheme>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
      />
    </>
  );
}

export default App;
