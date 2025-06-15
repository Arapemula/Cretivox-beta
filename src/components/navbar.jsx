import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/navbar.css';

function Navbar() {
  return (
    <div className='wrapper'>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="teks nav-link active" aria-current="page" href="#containerpertama">Home</a>
        </li>
        <li className="nav-item">
          <a className="teks nav-link" href="#containerketiga">Aboutme</a>
        </li>
        <li className="nav-item">
          <a className="teks nav-link" href="#containerkeempat">Favsong</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;