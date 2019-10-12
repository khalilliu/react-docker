import { useCallback } from 'react';
import { h0 } from './fp';
import { prevState } from '../query/actions';

const useNav = (departDate, dispatch, prevDate, nextDate) => {
  const isPrevDisabled = h0(departDate) <= h0();
  const isNextDisabled = h0(departDate) - h0() > 20 * 86400 * 1000;

  const prev = useCallback(() => {
    if (isPrevDisabled) {
      return;
    }

    dispatch(prevDate());
  }, [isPrevDisabled]);

  const next = useCallback(() => {
    if (isNextDisabled) {
      return;
    }

    dispatch(nextDate());
  }, [isPrevDisabled]);

  return {
    isPrevDisabled,
    isNextDisabled,
    prev,
    next
  };
};

export default useNav;
