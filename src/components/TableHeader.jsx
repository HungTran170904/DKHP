import React from "react";
const TableHeader = ({data}) => {
    return (
        <thead>
            <tr>
                {data.map((data) => {
                    return (
                        <th scope="col">{data}</th>
                    )
                })}
            </tr>
        </thead>
    );
}

export default TableHeader;