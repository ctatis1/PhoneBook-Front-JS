import { Button } from 'react-bootstrap';
import React, { useState } from 'react';

const Toggleable = (props) => {
    const [visible, setVisible] = useState(false);

    const hiddenWhenVisible = { display: visible? 'none': '' }
    const showWhenVisible = { display: visible? '': 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    
    return (
        <div>
            <div style={hiddenWhenVisible}>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button onClick={toggleVisibility}>Cancel</Button>
            </div>
        </div>
    );
}

export default Toggleable;
