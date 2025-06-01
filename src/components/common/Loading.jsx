import './Loading.css';
import loadingGif from '../../assets/анимация-загрузки.gif';

export default function Loading() {
    return (
        <div className="loading-wrapper">
            <img src={loadingGif} alt="Загрузка..." className="loading-img" />
            <p>Загрузка данных...</p>
        </div>
    );
}
