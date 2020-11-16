import React from 'react';
import { Highlight } from '../highlight/highlight.component';
import './highlights.style.scss';

export const Highlights = ({ highlights }) => {
    
    return (
        <div className='highlights'>
            {
                highlights.map(({id, ...otherProps}) => (
                    <Highlight key={id} {...otherProps} />
                ))
            }
        </div>
    );
}
