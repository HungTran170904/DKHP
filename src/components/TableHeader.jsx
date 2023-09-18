import React from "react";
const TableHeader = ({data}) => {
    return (
        <thead>
            <tr>
                {data.map((data) => {
                    return (
                        <th scope="col" key={data}>{data}</th>
                    )
                })}
            </tr>
        </thead>
    );
}

export default TableHeader;