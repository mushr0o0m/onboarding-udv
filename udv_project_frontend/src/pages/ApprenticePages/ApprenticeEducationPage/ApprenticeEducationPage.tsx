import React from 'react';
import { TitlePageComponent } from '../../../components/TitlePage/TitlePageComponent';
import { Projects } from '../../../modules/Projects/Projects';

export const ApprenticeEducationPage: React.FC = () => {
    return (
        <>
        <TitlePageComponent titleName='Продукты'/>
        <Projects isReadOnly={true} />
        </>
    );
};