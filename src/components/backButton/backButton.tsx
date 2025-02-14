import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Constant from '../../utils/constant';

interface BackButtonProps {
    pageNameShow: boolean;
    pageName: string
}

/**
 * Functional component for a back button that navigates back in the history.
 * @param {BackButtonProps} props - The properties passed to the BackButton component.
 * @returns JSX element representing the back button.
 */
const BackButton: React.FC<BackButtonProps> = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleClick = () => {
        window.sessionStorage.setItem(Constant.SESSIONSTORAGEKEYS.REFETCH_PAGE_DATA, 'false');
        navigate(-1);
    };
    const { pageNameShow, pageName } = props;
    return (
        <div className="back-row-style">
            <button className="back-button-style" onClick={handleClick}>
                <i className='icon icon-arrow_long_left'></i> {t("BACK")}
            </button>
            {pageNameShow && <h1>{pageName}</h1>}
        </div>
    );
};
export default BackButton;
