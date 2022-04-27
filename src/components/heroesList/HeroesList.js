import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { heroDeleted , fetchHeroes, filteredHeroesSelector} from './heroesSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
    }, []);

    const onDelete = useCallback((id) => {
        // Удаление персонажа по его id
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;




// import {useHttp} from '../../hooks/http.hook';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { heroesFetching, heroesFetched, heroesFetchingError, heroesDeleteHero, heroesAddHero } from '../../actions';
// import HeroesListItem from "../heroesListItem/HeroesListItem";
// import Spinner from '../spinner/Spinner';

// // Задача для этого компонента:
// // При клике на "крестик" идет удаление персонажа из общего состояния
// // Усложненная задача:
// // Удаление идет и с json файла при помощи метода DELETE

// const HeroesList = () => {
//     const {heroes, heroesLoadingStatus, filters} = useSelector(state => state);
//     const dispatch = useDispatch();
//     const {request} = useHttp();

//     useEffect(() => {
//         dispatch(heroesFetching());
//         request("http://localhost:3001/heroes")
//             .then(data => dispatch(heroesFetched(data)))
//             .catch(() => dispatch(heroesFetchingError()))

//         // eslint-disable-next-line
//     }, []);

//     if (heroesLoadingStatus === "loading") {
//         return <Spinner/>;
//     } else if (heroesLoadingStatus === "error") {
//         return <h5 className="text-center mt-5">Ошибка загрузки</h5>
//     }

//     const deleteHero = (id) => {
//         dispatch(heroesDeleteHero(id));
//         request(`http://localhost:3001/heroes/${id}`, "delete")
//     }

//     const renderHeroesList = (arr) => {

//         if (arr.length === 0) {
//             return <h5 className="text-center mt-5">Героев пока нет</h5>
//         }

//         return arr.map((props) => {
//             if (filters[0] === 'all' || !filters[0]) {
//                 return <HeroesListItem deleteHero={deleteHero} key={props.id} {...props}/>
//             } else if (props.element.includes(filters[0])) {
//                 return <HeroesListItem deleteHero={deleteHero} key={props.id} {...props}/>
//             }
//         })
//     }
    
//     const elements = renderHeroesList(heroes);

//     return (
//         <ul>
//             {elements}
//         </ul>
//     )
// }

// export default HeroesList;