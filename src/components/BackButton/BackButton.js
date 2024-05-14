import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function BackButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/', { replace: true });
        window.location.reload();
    };

    return (
        <Button onClick={handleClick}>Volver atrás</Button>
    );
}

export default BackButton;