//////////////////
// Coffee.js
// William Hotch
// September 2024
//////////////////

import './Coffee.css';

// HTML for Buy Me a Coffee button
function Coffee() {
    return (
    <a
      className="buyButton"
      target="_blank"
      href="https://www.buymeacoffee.com/whotch"
    >
      <img
        className="coffeeImage"
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Buy me a coffee"
      />
      <span className="coffeeButtonText">Buy me a coffee</span>
    </a>
     );
    }

    export default Coffee;
