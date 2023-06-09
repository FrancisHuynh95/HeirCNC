// frontend/src/components/Navigation/index.js
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useState } from 'react';
import { getSpotThunk } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SocialsModal from '../socialsModal';
import OpenModalButton from '../OpenModalButton';

function Navigation({ isLoaded }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [search, setSearch] = useState("")

  async function handleSearchSubmit() {
    if (search.length === 0) return

    await dispatch(getSpotThunk())
    const newSearch = search.split(" ").join("_")

    history.push(`/search/${newSearch}`)
    setSearch("")
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }
  }

  return (
    <div id="navContainer">
      {isLoaded && (
        <>
          <NavLink className='NavLink' exact to="/"><img id='logo' src='/heir-cnc-logo.png'></img></NavLink>
          <div className='searchbarcontainer'>
            <input
              className="searchBar"
              type='text'
              placeholder='Search'
              onKeyPress={e => handleEnter(e)}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            >
            </input>
            <button className='searchButton' onClick={() => handleSearchSubmit()}><i class="fas fa-search"></i></button>
          </div>
          <div className='createSpotAndUser'>
            <div id='button-createspot'>
              {sessionUser && <NavLink id='createANewSpotNav' exact to={`/spots/new`}>Create A New Spot</NavLink>}
            </div>
            <div className='socialsButton'>
              <OpenModalButton
              buttonText={"Contact Me"}
              modalComponent={SocialsModal}
               />
            </div>
            <div id='profileUserButton'>
              <ProfileButton className='userButton' user={sessionUser} />
            </div>
          </div>
        </>
      )}
    </div>

  );
}

export default Navigation;
