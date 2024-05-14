import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function BackButtonGeneral() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <Button onClick={handleClick}>Volver atrás</Button>
    );
}

export default BackButtonGeneral;