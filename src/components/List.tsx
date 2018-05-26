import * as React from 'react';
import { Info } from '../store/modules/list';

interface ListProps {
    input: string;
    list: Info[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInsert: () => void;
    onCheck: (id: number) => void;
    onRemove: (id: number) => void;
}

const List: React.SFC<ListProps> = ({ input, list, onChange, onInsert, onCheck, onRemove }) => {
    const handleCheck = (e: any) => {
        const { id } = e.target;
        onCheck(parseInt(id, 10));
    };

    const handleRemove = (e: any) => {
        const { id } = e.target;
        onRemove(parseInt(id, 10));
    };

    return (
        <div>
            <input value={input} onChange={onChange}/>
            <button onClick={onInsert}>INSERT</button>
            <ul>
                {
                    list.map(
                        info => <li key={info.id} >
                                    <b id={String(info.id)} 
                                    onClick={handleCheck} 
                                    style={{textDecoration: info.done ? "line-through" : "underline"}}>
                                    {info.text}
                                    </b>
                                    <span style={{marginLeft: "1.5rem", cursor: "pointer"}} onClick={handleRemove}>X</span>
                                </li>
                    )
                }
            </ul>
        </div>
    );
};

export default List;