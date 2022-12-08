
import axios from 'axios'
const _defaultMessage = 'Search for the movie title!'

export default{
    namespaced: true,
    state: () => ({
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: {}
    }),
    getter:{},
    mutations:{
        updateState(state, payload) {
            //인수로 들어온 payload의 키값을 빼내에 state 키값과 payload 키값을 이용 대입 
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        updateMovie: (state, payload) => {
            console.log('inner updateMovie')
            /*
                여기서는 payload를 객체로 받습니다.
                payload를 객체로 받으면, mutation를 조금더 유연하게 사용할 수 있기는 합니다.
            */
            state.movie = payload.data
        }
    },
    actions:{
        async searchMovies({commit}, payload){

            commit('updateState', {
                movie: '', 
                loading: true
            })

            try {
                const movies = await _fetchMovies(payload)
                commit('updateMovie', movies)
                console.log(movies)
            }catch (error) {
                console.log(error)
            }finally {
                commit('updateState', {
                    loading: false
                })
            }
        }
    }
}

async function _fetchMovies(payload){
    console.log('inner _fetchMovies')
    const OMDB_API_KEY='ae898d58'
    const id = payload.id
    const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${payload.title}&type=${payload.type}&y=${payload.year}&page=${payload.page}`

    
    
    return await axios.get(url)
}