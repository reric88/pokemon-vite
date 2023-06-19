import React from 'react'
import Chart from 'chart.js/auto';

export default function Graphs({ pokemon }) {
    // console.log(pokemon)
    const getPokemon = (p) => {
        let data =  [
          { year: 'HP', count: p.stats[0].base_stat },
          { year: 'ATK', count: p.stats[1].base_stat },
          { year: 'SATK', count: p.stats[3].base_stat },
          { year: 'SPD', count: p.stats[5].base_stat },
          { year: 'DEF', count: p.stats[4].base_stat },
          { year: 'SDEF', count: p.stats[2].base_stat },
        ];
        new Chart(
          document.getElementById('stat-tables-'+p.name),
        //   document.getElementById('graphs'),
          {
            type: 'radar',
            data: {
              labels: data.map(row => row.year),
              datasets: [
                {
                  label: 'Base',
                  data: data.map(row => row.count)
                }
              ]
            },
            options: {
              borderWidth: 1,
              pointRadius: 2,
              scales: {
                r: {
                  backgroundColor: '#0002',
                  beginAtZero: true,
                  suggestedMax: 100,
                  // ticks: {
                  //   stepSize: 10,
                  // }
                  // angleLines: true,
                  grid: false,
                  ticks: {
                    display: false
                  }
                }
              }
            }
          }
        );
      }
const testfunc = (p) =>{
console.log(p.stats[0].base_stat)
}

  return (
    <>
    {/* {console.log(pokemon[0].stats)} */}
    {/* {console.log(pokemon.map(p=>p.stats.map(s=>s.base_stat)))} */}
        {/* {getPokemon(pokemon[0])} */}
        {/* {testfunc(pokemon[0])} */}
    </>
  )
}
