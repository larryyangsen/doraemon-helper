import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import 'normalize.css';
const itemMaps = {
    0: '土',
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
    const selectedIndex = useRef(0);
    const [bed, setBed] = useState(() => Array(49).fill(0));
    const onClick = index => {
        selectRef.current.style.opacity = 1;
        selectRef.current.focus();
        selectedIndex.current = index;
    };
    const onItemChange = e => {
        const index = selectedIndex.current;
        const newBed = bed.slice();
        newBed[index] = +e.target.value;
        setBed(newBed);
        selectRef.current.selectedIndex = '0';
        selectRef.current.style.opacity = 0;
        selectRef.current.blur();
        bedRef.current.focus();
    };
    const reset = () => setBed(() => Array(49).fill(0));

    return (
        <>
            <div ref={bedRef} className="bed">
                {bed.map((a, i) => (
                    <button onClick={() => onClick(i)} key={i}>
                        <span>{itemMaps[a]}</span>
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
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
