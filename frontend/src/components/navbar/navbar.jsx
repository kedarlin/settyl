import './navbar.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className='navbar'>
            <div className='user-name navbar-reduced'>
                Hello {localStorage.getItem('userName')}!
            </div>
            <div className='navbar-name'>
                SETTYL
            </div>
            <div className='nav-items'>
                <div className='navbar-logout' onClick={handleLogout}>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Navbar