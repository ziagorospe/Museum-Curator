import { Link } from 'react-router-dom'

function Navbar(){
    return (
        <nav>
            <Link to="/">Search Page</Link>
            <Link to="/saved">Saved Collection</Link>
        </nav>
    )
}

export default Navbar;