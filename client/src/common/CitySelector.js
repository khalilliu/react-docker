import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  createRef,
  memo
} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './CitySelector.css';

//component
import Loading from './Loading';

const cityList = createRef(); // create-* 只能放到全局上面

const CityItem = ({ onSelect, name }) => (
  <li
    className='city-li'
    onClick={() => {
      onSelect(name);
    }}
  >
    {name}
  </li>
);

CityItem.propTypes = {
  onSelect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

const CitySection = ({ title, cities = [], onSelect }) => (
  <ul className='city-ul'>
    <li className='city-li' key='title' data-cate={title}>
      {title}
    </li>
    {cities.map(city => (
      <CityItem key={city.name} name={city.name} onSelect={onSelect}></CityItem>
    ))}
  </ul>
);

CitySection.propTypes = {
  title: PropTypes.string.isRequired,
  cities: PropTypes.array,
  onSelect: PropTypes.func.isRequired
};

const AlphaIndex = ({ alpha, onClick }) => (
  <i className='city-index-item' onClick={() => onClick(alpha)}>
    {alpha}
  </i>
);

AlphaIndex.propTypes = {
  alpha: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const alphabet = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index);
});

const CityList = React.forwardRef(({ sections, toAlpha, onSelect }, ref) => (
  <div className='city-list' ref={ref}>
    <div className='city-cate'>
      {sections.map(
        section =>
          !!section.citys && (
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            ></CitySection>
          )
      )}
    </div>
    <div className='city-index'>
      {alphabet
        .filter(
          i =>
            !!sections.find(section => section.title === i.toUpperCase()).citys
        )
        .map(alpha => (
          <AlphaIndex key={alpha} alpha={alpha} onClick={toAlpha}></AlphaIndex>
        ))}
    </div>
  </div>
));

CityList.propTypes = {
  sections: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  toAlpha: PropTypes.func.isRequired
};

const SuggestItem = ({ name, onClick }) => (
  <li className='city-suggest-li' onClick={() => onClick(name)}>
    {name}
  </li>
);

SuggestItem.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const Suggest = props => {
  const { searchKey, onSelect } = props;
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch(`/rest/search?key=` + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data;
        if (sKey === searchKey) {
          setResult(result);
        }
      });
  }, [searchKey]);
  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [
        {
          display: searchKey
        }
      ];
    }

    return result;
  }, [result, searchKey]);

  return (
    <div className='city-suggest'>
      <ul className='city-suggest-ul'>
        {fallBackResult.map(item => (
          <SuggestItem
            key={item.display}
            name={item.display}
            onClick={onSelect}
          ></SuggestItem>
        ))}
      </ul>
    </div>
  );
};

Suggest.propTypes = {
  searchKey: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const CitySelector = props => {
  const { show, cityData, isLoading, onBack, fetchCityData, onSelect } = props;

  const [searchKey, setSearchKey] = useState('');

  const key = useMemo(() => searchKey.trim(), [searchKey]);

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return;
    }
    fetchCityData();
  }, [isLoading, cityData, show]);

  const toAlpha = useCallback(alpha => {
    const cityEl = cityList.current;

    const offsetTop = document.querySelector(`[data-cate='${alpha}']`)
      .offsetTop;
    // document.querySelector(`[data-cate='${alpha}']`).scrollIntoView(true);
    cityEl.scroll({
      top: offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  const outputCitySections = () => {
    if (isLoading) {
      return (
        <div className='loading'>
          <Loading size={60} color='#1ba9ba'></Loading>
        </div>
      );
    }
    if (cityData) {
      return (
        <CityList
          ref={cityList}
          sections={cityData.cityList}
          onSelect={onSelect}
          toAlpha={toAlpha}
        ></CityList>
      );
    }
    return <div>error</div>;
  };

  return (
    <div className={classnames('city-selector', { hidden: !show })}>
      <div className='city-search'>
        <div className='search-back' onClick={() => onBack()}>
          <svg width='42' height='42'>
            <polyline
              points='25,13 16,21 25,29'
              stroke='#fff'
              strokeWidth='2'
              fill='none'
            ></polyline>
          </svg>
        </div>
        <div className='search-input-wrapper'>
          <input
            type='text'
            value={searchKey}
            className='search-input'
            placeholder='城市、车站的中文或拼音'
            onChange={e => setSearchKey(e.target.value)}
          ></input>
        </div>
        <i
          onClick={() => setSearchKey('')}
          className={classnames('search-del', { hidden: key.length === 0 })}
        >
          &#xf063;
        </i>
      </div>
      {!!key && (
        <Suggest
          searchKey={searchKey}
          onSelect={key => onSelect(key)}
        ></Suggest>
      )}
      {outputCitySections()}
    </div>
  );
};

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  fetchCityData: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CitySelector;
