import React from 'react'
import { ListGroup } from 'react-bootstrap'

interface AdaptationCriteriaListProps {
    tasks: Omit<Task,  'id'>[] | null;
}

export const AdaptationCriteriaList: React.FC<AdaptationCriteriaListProps> = ({ tasks }) => {

    if (!tasks || tasks.length === 0)
        return (<p>Для данного сотрудника критерии АП не добавлены.</p>)

    return (
        <ListGroup>
            {tasks.map((task) => (
                <ListGroup.Item
                    style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                    disabled
                >{task.name}</ListGroup.Item>
            ))}
        </ListGroup>
    )
}