export default function PokemonCard({ pokemon, data, query, gen, bg }) {
  const playCry = (pokemonID) => {
    const player = document.getElementById("audio-player");
    const cry = "PokemonCries/" + pokemonID + ".ogg";
    player.src = cry;
    player.play();
  };

  const getGenerations = (sprites, gen) => {
    if (gen === "0") {
      return sprites.versions["generation-i"]["red-blue"]["front_transparent"];
    } else if (gen === "1") {
      return sprites.versions["generation-ii"]["crystal"]["front_transparent"];
    } else if (gen === "2") {
      return sprites.versions["generation-iii"]["emerald"]["front_default"];
    } else if (gen === "3") {
      return sprites.versions["generation-iv"]["platinum"]["front_default"];
    } else if (gen === "4") {
      return sprites.versions["generation-v"]["black-white"]["front_default"];
    } else if (gen === "5") {
      return sprites.versions["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    } else if (gen === "6") {
      return sprites.versions["generation-vi"]["omegaruby-alphasapphire"][
        "front_default"
      ];
    } else if (gen === "7") {
      return sprites.versions["generation-vii"]["ultra-sun-ultra-moon"][
        "front_default"
      ];
    } else if (gen === "8") {
      return sprites.front_default;
    }
  };

  const changeBG = (v, art) => {
    if (v === "environment") {
      return { backgroundImage: `url(CardBG/${art}bg.png)` };
    } else if (v === "color") {
      return { backgroundImage: "linear-gradient(#fffa, #1113" };
    } else if (v === "black") {
      return { backgroundColor: "#111" };
    } else if (v === "white") {
      return { backgroundColor: "#eee" };
    }
  };

  const getSecondAbility = (abilities) => {
    if (abilities && abilities.length >= 2) {
      return abilities[1].ability.name;
    }
    return "";
  };

  const getSecondType = (types) => {
    if (types && types.length >= 2) {
      return "/pokemon-vite/CardType/" + types[1].type.name;
    }
    return "";
  };

  const getTypeIcon = (icon) => {
    return '/pokemon-vite/CardType/'+icon+'.png';
  };

  const newGetSecondTypeIcon = (types) => {
    if (types && types.length >= 2) {
      let secondType = getSecondType(types);
      let secondIcon = getTypeIcon(types[1].type.name);
      return <img width="16" height="16" src={secondIcon} />;
    }
    return "";
  };

const frontInfoOptions = () => {
  const frontInfo = document.querySelectorAll('.front-info')
  frontInfo.forEach(cardInfo => {
    cardInfo.addEventListener('click', () => {
      cardInfo.firstChild.classList.add('hidden')
      cardInfo.lastChild.classList.remove('hidden')
    cardInfo.addEventListener('mouseleave', ()=>{

      cardInfo.firstChild.classList.remove('hidden')
      cardInfo.lastChild.classList.add('hidden')
    })
    });
    // cardInfo.addEventListener('mouseleave', () => {
    //   cardInfo.firstChild.classList.remove('hidden')
    //   cardInfo.lastChild.classList.add('hidden')
    // })
  })
}

  // #region Get Card Color

  const getCardColor = (type) => {
    if (type === "bug") {
      return "#90C12C";
    } else if (type === "dark") {
      return "#5A5366";
    } else if (type === "dragon") {
      return "#096DC4";
    } else if (type === "electric") {
      return "#F3D23B";
    } else if (type === "fairy") {
      return "#EC8FE6";
    } else if (type === "fighting") {
      return "#CE4069";
    } else if (type === "fire") {
      return "#FF9C54";
    } else if (type === "flying") {
      return "#92AADE";
    } else if (type === "ghost") {
      return "#5269AC";
    } else if (type === "grass") {
      return "#63BB5B";
    } else if (type === "ground") {
      return "#D97746";
    } else if (type === "ice") {
      return "#74CEC0";
    } else if (type === "normal") {
      return "#9099A1";
    } else if (type === "poison") {
      return "#AB6AC8";
    } else if (type === "psychic") {
      return "#F97176";
    } else if (type === "rock") {
      return "#C7B78B";
    } else if (type === "steel") {
      return "#5A8EA1";
    } else if (type === "water") {
      return "#4D90D5";
    } else {
      return "#888";
    }
  };

  // #endregion

  // #region Paginated Pokemon

  const pokeCard = pokemon.map((p) => (
    <div
      className="pokemon-card"
      style={{ backgroundColor: getCardColor(p.types[0].type.name) }}
      key={p.name}
    >
      <div className="name-and-type">
        <h4 className="pokemon-name">
          {p.name.toUpperCase().slice(0, 1) + p.name.slice(1)}
        </h4>
        <div className="pokemon-type">
          <img width="16" height="16" src={getTypeIcon(p.types[0].type.name)} />
          {newGetSecondTypeIcon(p.types)}
        </div>
      </div>

      <div className="pokemon-pic-div">
        <div className="pokemon-pic-wrapper">
          <img
            className="pokemon-pic"
            src={getGenerations(p.sprites, gen)}
            style={changeBG(bg, p.types[0].type.name)}
            onClick={() => playCry(p.id)}
          />
        </div>
      </div>

      <div className="front-info" onMouseEnter={frontInfoOptions}>
        <div className="pokemon-abilities">
          <h4 className="pokemon-ability-title">Base Stats</h4>
          {/* <h5>{p.effect_entries.short_effect}</h5> */}
          {/* <h5>{console.log(p)}</h5> */}
          {/* <h6>{p.stats.map(s=>(s.stat.name + '/' + s.base_stat))}</h6> */}
          <div className="stat-tables">
          <table>
          <tbody>
            <tr>
              <td>HP</td>
              <td>{p.stats[0].base_stat}</td>
            </tr>
            <tr>
              <td>ATK</td>
              <td>{p.stats[1].base_stat}</td>
            </tr>
            <tr>
              <td>S.ATK</td>
              <td>{p.stats[3].base_stat}</td>
            </tr>
            </tbody>
          </table>
          <table>
          <tbody>
            <tr>
              <td>SPD</td>
              <td>{p.stats[5].base_stat}</td>
            </tr>
            <tr>
              <td>DEF</td>
              <td>{p.stats[2].base_stat}</td>
            </tr>
            <tr>
              <td>S.DEF</td>
              <td>{p.stats[4].base_stat}</td>
            </tr>
            </tbody>
          </table>
          </div>
          {/* <h5>
            {p.abilities[0].ability.name.toUpperCase().slice(0, 1) +
              p.abilities[0].ability.name.slice(1)}
          </h5>
          <h5>
            {getSecondAbility(p.abilities).toUpperCase().slice(0, 1) +
              getSecondAbility(p.abilities).slice(1)}
          </h5> */}
        </div>
        <div className="flip-compare-container hidden" id="flip-compare">
          <div className="flip flip-compare"><i className="fa-solid fa-up-right-and-down-left-from-center"></i><h3>Expand</h3></div>
          <div className="compare flip-compare"><div><i className="fa-solid fa-arrow-right-from-bracket"></i><i className="fa-solid fa-arrow-right-from-bracket fc-right"></i></div><h3>Compare</h3></div>
        </div>
      </div>
    </div>
  ));

  // #endregion

  // #region Queried Pokemon

  const queryCard = data.map((p) => (
    <div
      className="pokemon-card"
      style={{ backgroundColor: getCardColor(p.types[0].type.name) }}
      key={p.name}
    >
      <div className="name-and-type">
        <h4 className="pokemon-name">
          {p.name.toUpperCase().slice(0, 1) + p.name.slice(1)}
        </h4>
        <div className="pokemon-type">
          <img width="16" height="16" src={getTypeIcon(p.types[0].type.name)} />
          {newGetSecondTypeIcon(p.types)}
        </div>
      </div>

      <div className="pokemon-pic-div">
        <div className="pokemon-pic-wrapper">
          <img
            className="pokemon-pic"
            src={getGenerations(p.sprites, gen)}
            style={changeBG(bg, p.types[0].type.name)}
            onClick={() => playCry(p.id)}
          />
        </div>
      </div>

      <div className="front-info">
        <div className="pokemon-abilities">
          <h4 className="pokemon-ability-title">Abilities</h4>
          <h5>
            {p.abilities[0].ability.name.toUpperCase().slice(0, 1) +
              p.abilities[0].ability.name.slice(1)}
          </h5>
          <h5>
            {getSecondAbility(p.abilities).toUpperCase().slice(0, 1) +
              getSecondAbility(p.abilities).slice(1)}
          </h5>
        </div>
      </div>
    </div>
  ));

  // #endregion

  const defaultCards = () => {
    if (query.length === 0) {
      return pokeCard;
    } else if (query.length > 0) {
      return queryCard;
    }
  };

  // frontInfoOptions()

  return <>{defaultCards()}</>;
}
