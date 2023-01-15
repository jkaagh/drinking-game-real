import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

        {/* <KeyboardAwareContainer offset={50} behavior="height"> */}

            <App />
        {/* </KeyboardAwareContainer> */}
  </React.StrictMode>
);



// const KeyboardAwareContainer = ({ children, offset = 0, behavior = 'position' }) => {
//   const { keyboardHeight, isOpen } = useKeyboard();

//   useEffect(() => {
//     const container = document.getElementById('keyboard-aware-container');
//     if (behavior === 'height') {
//       if (isOpen) {
//         container.style.height = `calc(100% - ${keyboardHeight}px)`;
//       } else {
//         container.style.height = '100%';
//       }
//     }
//     else if (behavior === 'position') {
//       if (isOpen) {
//         container.style.position = 'relative';
//         container.style.bottom = `${keyboardHeight}px`;
//       } else {
//         container.style.position = 'initial';
//         container.style.bottom = 'initial';
//       }
//     }
//   }, [isOpen, keyboardHeight]);

//   return (
//     <div id='keyboard-aware-container' style={{overflow:'auto'}}>
//       {children}
//     </div>
//   );
// };
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

