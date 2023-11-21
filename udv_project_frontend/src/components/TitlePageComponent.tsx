import React from 'react';

interface TitlePageComponentProps{
    titleName: string;
}

export const TitlePageComponent: React.FC<TitlePageComponentProps> = ({titleName}) => {
    return (
        <div className="bg-white border-bottom py-4 mb-3">
            <div className="container bg-white p-0">
                <h1 className='display-6 fw-bold'>{titleName}</h1>
            </div>
        </div>
    );
};