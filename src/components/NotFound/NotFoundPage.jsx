import lostdesert from '../../../public/lost-desert.jpg'
import { Link } from 'react-router-dom';

function NotFoundPage(){
    return (<div className='not-found-page'>
            <Link to="/">Return to searching</Link>
            <img src={lostdesert} alt="404 lost in the desert"/>
            <p>404 Page Not Found</p>
        </div>
    )
}

export default NotFoundPage