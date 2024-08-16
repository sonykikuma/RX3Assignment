import {NavLink} from 'react-router-dom'


const Header = ()=>(
<header>
<nav className='navbar navbar-expand-lg bg-body-tertiary'>
<div className="container">
<NavLink to="/" className="navbar-brand">Student Management System</NavLink>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
<div className="collapse navbar-collapse" id="navbarNav">
<ul className="navbar-nav">
<li className="nav-item"><NavLink to="/" className="nav-link">Students</NavLink></li>
  <li className="nav-item"><NavLink to="/students" className="nav-link">Classes</NavLink></li>
  <li className="nav-item"><NavLink to="/school" className="nav-link">School</NavLink></li>


</ul>
 </div>
</div>
</nav>

</header>
  
)
export default Header