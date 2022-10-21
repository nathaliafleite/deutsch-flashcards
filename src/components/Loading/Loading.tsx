import LoadingIcon from '../svgs/LoadingIcon';

type Props = {
    extraClass?: string;
};

const Loading: React.FC<Props> = ({ extraClass }) => {
    return (
        <div className={`container flex flex-ac flex-jc flex-dc ${extraClass || ''}`}>
            <LoadingIcon />
            <p className='small mt-4 text-color'>Loading...</p>
        </div>
    );
};

export default Loading;
