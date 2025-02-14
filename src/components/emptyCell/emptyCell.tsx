import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface EmptyCellProps {
  emptyCustomIcon?: string,
  emptyItems?: any[];
  noDataTitle?: string;
  noDataDesc?: string;
  noDataAddButton?: VoidFunction;
  noDataAddButtonTitle?: string;
  clearButton?: VoidFunction;

  // FOR EMPTY DATA
  emptyDataTitle?: string;
  emptyDataDesc?: string;
}

/**
 * Functional component that represents an empty cell in a table.
 * @param {EmptyCellProps} props - The properties passed to the component.
 * @returns JSX element representing the empty cell.
 */
const EmptyCell: React.FC<EmptyCellProps> = (props) => {

  const {
    emptyCustomIcon, 
    emptyItems,
    noDataTitle, 
    noDataDesc, 
    noDataAddButton, 
    noDataAddButtonTitle, 
    clearButton,
    //FOR EMPTY DATA
    emptyDataTitle,
    emptyDataDesc

  } = props;
  const {t} =useTranslation()
  const emptyItemsLength: any = emptyItems?.length;
  const noDataRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const noDataElement = noDataRef.current;
    const nearestTr = noDataElement?.closest("tr");
    if (nearestTr) {
      nearestTr.classList.add("emptyRow");
    }
  }, []);

  return (
    <div ref={noDataRef} className="noDataFoound">
      <div className="noData">
        <div className="iconBack">
        {(emptyItemsLength === 0 && emptyCustomIcon) ? 
          <i className={`icon icon-${emptyCustomIcon}`} />:
          <i className="icon icon-search"/>
        }
        </div>
        {emptyItemsLength === 0 ?
        <>
          <p className="noDataText">{emptyDataTitle}</p>
          <p className="noDesc">{emptyDataDesc}</p>
        </>
        :
        <>
          <p className="noDataText">{noDataTitle}</p>
          <p className="noDesc">{noDataDesc}</p>
        </>
        }
      </div>
      <div className="emptyButtonInline">
        {noDataAddButtonTitle &&
        <>
        {  emptyItemsLength > 0 &&
          <button className="btn btnClear" onClick={clearButton}>{t('CLEAR_SEARCH')}</button>
        }
          <button className="btn btnEptyAdd" onClick={noDataAddButton}>{noDataAddButtonTitle}</button>
        </>
        }
      </div>
    </div>
  );
};

export default EmptyCell;
