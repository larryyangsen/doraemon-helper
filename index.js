import React, { useRef, useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import 'normalize.css';
const itemMaps = {
    0: '',
    1: '石',
    2: '銅',
    3: '鐵',
    4: '銀',
    5: '金',
    6: '破',
    7: '化',
    8: '琥',
    9: '紅',
    10: '藍',
    11: '綠',
    12: '鑽',
    13: '下'
};

const App = () => {
    const selectRef = useRef();
    const bedRef = useRef();
    const selectedBedIndex = useRef(0);
    const [bed, setBed] = useState(() => Array(49).fill(0));
    const onBedClick = (index, item) => {
        selectRef.current.style.opacity = 1;
        selectRef.current.focus();
        selectedBedIndex.current = index;
        selectRef.current.selectedIndex = item;
    };
    const onItemChange = useCallback(
        e => {
            const index = selectedBedIndex.current;
            const newBed = bed.slice();
            newBed[index] = +e.target.value;
            setBed(newBed);
            selectRef.current.style.opacity = 0;
            selectRef.current.blur();
            bedRef.current.focus();
        },
        [bed]
    );

    const reset = () => setBed(() => Array(49).fill(0));

    return (
        <>
            <div ref={bedRef} className="bed">
                {bed.map((item, i) => (
                    <button onClick={() => onBedClick(i, item)} key={i}>
                        <span>{itemMaps[item]}</span>
                    </button>
                ))}
            </div>
            <div className="controls">
                <button onClick={reset}>Reset</button>
                <select onChange={e => onItemChange(e)} ref={selectRef}>
                    {Object.keys(itemMaps).map(key => (
                        <option key={key} value={key}>
                            {itemMaps[key]}
                        </option>
                    ))}
                </select>
            </div>
            <p>化：化石類</p>
            <p>下：下一層</p>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
