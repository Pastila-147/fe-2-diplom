import PropTypes from 'prop-types';
import './ProgressBar.css';
import arrowIcon from '../../assets/img/stepArrow.png';

const steps = ['Билеты', 'Пассажиры', 'Оплата', 'Проверка'];

const ProgressBar = ({ currentStep }) => {
    return (
        <div className="progress-bar">
            {steps.map((label, index) => {
                const stepIndex = index + 1;
                const isActive = stepIndex === currentStep;
                const isCompleted = stepIndex < currentStep;

                let stepClass = 'progress-bar__step';
                if (isActive) stepClass += ' progress-bar__step_active';
                else if (isCompleted) stepClass += ' progress-bar__step_completed';

                return (
                    <div className={stepClass} key={stepIndex}>
                        <div className="progress-bar__number">{stepIndex}</div>
                        <div className="progress-bar__label">{label}</div>
                        {stepIndex < steps.length && (
                            <img
                                className="progress-bar__arrow"
                                src={arrowIcon}
                                alt="arrow"
                                width="37"
                                height="98"
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

ProgressBar.propTypes = {
    currentStep: PropTypes.number.isRequired,
};

export default ProgressBar;
