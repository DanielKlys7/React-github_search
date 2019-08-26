import React from 'react';
import './InputNickname.sass'

const InputNickname = (props) => {
    return (
        <form>
            <input placeholder="GitHub login..." type="text" value={props.inputValue} onChange={props.handleInputChange}></input>
            <button onClick={props.handleAddButton}>ADD</button>
        </form>
    );
}

export default InputNickname;