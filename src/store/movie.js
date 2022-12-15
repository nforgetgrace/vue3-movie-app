import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default{
    namespaced: true,
    state: () => ({
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: {}
    }),
    getters:{
        getMovies: (state) => { 
            return state.movies
        }
    },
    mutations:{
        updateState(state, payload) {
            //인수로 들어온 payload의 키값을 빼내에 state 키값과 payload 키값을 이용 대입 
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        updateMovie: (state, payload) => {
            /*
                여기서는 payload를 객체로 받습니다.
                payload를 객체로 받으면, mutation를 조금더 유연하게 사용할 수 있기는 합니다.
            */
            state.movies = payload
        }
    },
    actions:{
        async searchMovies({ commit, state, getters }, payload){
            
            commit('updateState', {
                message: '',
                loading: true
            })

            try {
                const res = await _fetchMovies({
                    title : payload.title,
                    page : 1,
                    type : payload.type,
                    year : payload.year
                })
                commit('updateState', {
                    movies: _uniqBy(res.data.Search, 'imdbID')
                })
                const totalPage = Math.ceil(Number(res.data.totalResults) / 10) // 총페이지 길이

                // 추가 요청!
                if (totalPage > 1) {
                    for (let page = 2; page <= totalPage; page += 1) {
                        if (page > (payload.number / 10)) break
                        const res = await _fetchMovies({
                            title : payload.title,
                            page : page,
                            type : payload.type,
                            year : payload.year
                        })  
                        const { Search } = res.data
                        
                        //데이터 구조를 잘 보고 파악해야함.
                        commit('updateState', {
                            movies: [
                            ...state.movies,
                            ..._uniqBy(Search, 'imdbID')
                            ]
                        })
                    }
                }
            }catch (message) {
                commit('updateState', {
                    movies: [],
                    message
                })
                console.log(message)
            }finally {
                commit('updateState', {
                    loading: false
                })
            }
        }
    }
}

async function _fetchMovies(payload){
    console.log('inner _fetchMovies param ====> ', payload)
    const OMDB_API_KEY='ae898d58'
    const id = payload.id
    const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${payload.title}&type=${payload.type}&y=${payload.year}&page=${payload.page}`

    
    const result = await axios.get(url)
    console.log(' _fetchMovies return <===== ', result)
    return result
}