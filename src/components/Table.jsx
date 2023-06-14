import React from 'react'

export default function Table({ pokemon, data, getAbilities }) {

    
    const getSecondType = (types) => {
        if (types && types.length >=2){
            return '/' + types[1].type.name;
        }
        return '';
    };
    
  return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Abilities</th>
                </tr>
                {data.map((result)=>(
                    <tr key={'table-' + result.name}>
                    <td>{result.name}</td>
                    <td>{result.id}</td>
                    <td>{result.types[0].type.name + getSecondType(result.types)}</td>
                    <td>{getAbilities(result.abilities)}</td>
                    {/* {console.log(result)} */}
                </tr>
                ))}
            </tbody>
        </table>
  )
}
