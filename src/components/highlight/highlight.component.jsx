import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

import './highlight.style.scss';

export const Highlight = ( { highlight } ) => {
    return (
        <Card className='highlight'>
            <CardContent>
                <Typography variant='body2' component='p'>
                    { highlight }
                </Typography>
            </CardContent>
        </Card>
    )
}
