const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                // ЭТО МОЖНО СДЕЛАТЬ И ПО ДРУГОМУ
                // Я специально показываю вариант с действиями тут, но более правильный вариант
                // будет показан в следующем уроке
                filteredHeroes: state.activeFilter === 'all' ? 
                                action.payload : 
                                action.payload.filter(item => item.element === state.activeFilter),
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ? 
                                state.heroes :
                                state.heroes.filter(item => item.element === action.payload)
            }
        // Самая сложная часть - это показывать новые элементы по фильтрам
        // при создании или удалении
        case 'HERO_CREATED':
            // Формируем новый массив    
            let newCreatedHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newCreatedHeroList,
                // Фильтруем новые данные по фильтру, который сейчас применяется
                filteredHeroes: state.activeFilter === 'all' ? 
                                newCreatedHeroList : 
                                newCreatedHeroList.filter(item => item.element === state.activeFilter)
            }
        case 'HERO_DELETED': 
            // Формируем новый массив
            const newHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList,
                // Фильтруем новые данные по фильтру, который сейчас применяется
                filteredHeroes: state.activeFilter === 'all' ? 
                                newHeroList : 
                                newHeroList.filter(item => item.element === state.activeFilter)
            }
        default: return state
    }
}

export default reducer;












// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
//     filters: []
// }

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROES_DELETE_HERO':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload)
//             }
//         case 'HEROES_ADD_HERO':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//             }
//         case 'HEROES_CHANGE_FILTER':
//             return {
//                 ...state,
//                 filters: [action.payload],
//             }
//         default: return state
//     }
// }

// export default reducer;

////////////////////////////////////////////////////////////////////////////////////////////

// {
//   "heroes": [
//     {
//       "id": 1,
//       "name": "Первый герой",
//       "description": "Первый герой в рейтинге!",
//       "element": "fire"
//     },
//     {
//       "id": 2,
//       "name": "Неизвестный герой",
//       "description": "Скрывающийся в тени",
//       "element": "wind"
//     },
//     {
//       "id": 3,
//       "name": "Морской герой",
//       "description": "Как аквамен, но не из DC",
//       "element": "water"
//     },
//     {
//       "id": 4,
//       "name": "lolo",
//       "description": "d",
//       "element": "earth"
//     }
//   ],
//   "filters": [
//     "all",
//     "fire",
//     "water",
//     "wind",
//     "earth"
//   ]
// }