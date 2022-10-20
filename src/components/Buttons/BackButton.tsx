import { useNavigate } from 'react-router-dom';

function BackButton() {
    const navigate = useNavigate();

    return (
        <div className='container mt-7'>
            <button onClick={() => navigate(-1)} type='button' className='clear-button'>
                Back
            </button>
        </div>
    );
}

export default BackButton;
