import { useContext } from 'react'
import { HrProjectsContext } from './HrProjectsContext' 

export const useHrProjects = () => {
    const context = useContext(HrProjectsContext);
    if (!context) {
        throw new Error('useAuth must be used within a HrProjectsProvider');
    }
    return context;
}