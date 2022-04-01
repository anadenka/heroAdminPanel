import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from '../../actions';
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active

const HeroesFilters = () => {

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    // Запрос на сервер для получения фильтров и последовательной смены состояния
    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        // Данные в json-файле я расширил классами и текстом
        return arr.map(({name, className, label}) => {

            // Используем библиотеку classnames и формируем классы динамически
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            
            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(name))}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;






// // Задача для этого компонента:
// // Фильтры должны формироваться на основании загруженных данных
// // Фильтры должны отображать только нужных героев при выборе
// // Активный фильтр имеет класс active
// // Изменять json-файл для удобства МОЖНО!

// import { useDispatch } from "react-redux";
// import { heroesChangeFilter } from "../../actions";

// // Представьте, что вы попросили бэкенд-разработчика об этом

// const HeroesFilters = () => {
//     const dispatch = useDispatch();

//     const handleChangeFilter = (e) => {
//         dispatch(heroesChangeFilter(e.target.value))
//     }

//     const elements = [
//         {
//             text: 'Все',
//             style: 'btn btn-outline-dark',
//             value: 'all'
//         },
//         {
//             text: 'Огонь',
//             style: 'btn btn-danger',
//             value: 'fire'
//         },
//         {
//             text: 'Вода',
//             style: 'btn btn-primary',
//             value: 'water'
//         },
//         {
//             text: 'Ветер',
//             style: 'btn btn-success',
//             value: 'wind'
//         },
//         {
//             text: 'Земля',
//             style: 'btn btn-secondary',
//             value: 'earth'
//         },

//     ]

//     return (
//         <div className="card shadow-lg mt-4">
//             <div className="card-body">
//                 <p className="card-text">Отфильтруйте героев по элементам</p>
//                 <div className="btn-group">
//                     {elements.map(({ text, value, style }) => {
//                         return (
//                             <button className={style} value={value} onClick={handleChangeFilter}>{text}</button>
//                         )
//                     })}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HeroesFilters;