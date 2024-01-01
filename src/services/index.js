import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'

const API_URL = import.meta.env.VITE_API_URL

export function getNowTheatre() {
  const {
    isLoading: isLoadingNowTheatre,
    data: resultNowTheatre,
    hasNextPage: hasNextPageNowTheatre,
    isFetchingNextPage: isFetchingNextPageNowTheatre,
    fetchNextPage: fetchNextPageNowTheatre
  } = useInfiniteQuery({
    queryKey: ['nowTheatre'],
    queryFn: async ({ pageParam = 1 }) => fetch(`${API_URL}movie/now_playing/${pageParam}`).then((r) => r.json()),
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
    cacheTime: 0
  })
  return {
    resultNowTheatre,
    isLoadingNowTheatre,
    hasNextPageNowTheatre,
    isFetchingNextPageNowTheatre,
    fetchNextPageNowTheatre
  }
}

export function getUpcomingMovie() {
  const { isLoading: isLoadingUpcomingMovie, data: upcomingMovie } = useQuery({
    queryKey: ['upcomingMovie'],
    queryFn: async () => fetch(`${API_URL}movie/upcoming`).then((r) => r.json())
  })
  return { upcomingMovie, isLoadingUpcomingMovie }
}

export function getMovieDetails(idFilm) {
  const { isLoading: isLoadingMovieDetails, data: movieDetails } = useQuery({
    queryKey: ['movieDetails', idFilm],
    queryFn: async () => fetch(`${API_URL}movie/details/${idFilm}`).then((r) => r.json())
  })
  return { movieDetails, isLoadingMovieDetails }
}

export function getTvShowDetails(idTvShow) {
  const { isLoading: isLoadingTvShowDetails, data: tvShowDetails } = useQuery({
    queryKey: ['tvShowDetails', idTvShow],
    queryFn: async () => fetch(`${API_URL}tv/details/${idTvShow}`).then((r) => r.json())
  })
  return { tvShowDetails, isLoadingTvShowDetails }
}

export function getMovieVideo(idFilm) {
  const { isLoading: isLoadingMovieVideo, data: movieVideo } = useQuery({
    queryKey: ['movieVideo', idFilm],
    queryFn: async () => fetch(`${API_URL}movie/videos/${idFilm}`).then((r) => r.json())
  })
  return { movieVideo, isLoadingMovieVideo }
}
export function getTvShowVideo(idTvShow) {
  const { isLoading: isLoadingTvShowVideo, data: tvShowVideo } = useQuery({
    queryKey: ['tvShowVideo', idTvShow],
    queryFn: async () => fetch(`${API_URL}tv/videos/${idTvShow}`).then((r) => r.json())
  })
  return { tvShowVideo, isLoadingTvShowVideo }
}

export function getMovieImage(idFilm) {
  const { isLoading: isLoadingMovieImage, data: movieImage } = useQuery({
    queryKey: ['movieImage', idFilm],
    queryFn: async () => fetch(`${API_URL}movie/images/${idFilm}`).then((r) => r.json())
  })
  return { movieImage, isLoadingMovieImage }
}

export function getTvShowImage(idTvShow) {
  const { isLoading: isLoadingTvShowImage, data: tvShowImage } = useQuery({
    queryKey: ['tvShowImage', idTvShow],
    queryFn: async () => fetch(`${API_URL}tv/images/${idTvShow}`).then((r) => r.json())
  })
  return { tvShowImage, isLoadingTvShowImage }
}

export function getMovieCredit(idFilm) {
  const { isLoading: isLoadingMovieCredit, data: movieCredit } = useQuery({
    queryKey: ['movieCredit', idFilm],
    queryFn: async () => fetch(`${API_URL}movie/credits/${idFilm}`).then((r) => r.json())
    // cacheTime: 0
  })
  return { movieCredit, isLoadingMovieCredit }
}
export function getTvShowCredit(idTvShow) {
  const { isLoading: isLoadingTvShowCredit, data: tvShowCredit } = useQuery({
    queryKey: ['tvShowCredit', idTvShow],
    queryFn: async () => fetch(`${API_URL}tv/credits/${idTvShow}`).then((r) => r.json())
  })
  return { tvShowCredit, isLoadingTvShowCredit }
}

export function getMovieKeyword(idFilm) {
  const { isLoading: isLoadingMovieKeyword, data: movieKeyword } = useQuery({
    queryKey: ['movieKeyword', idFilm],
    queryFn: async () => fetch(`${API_URL}movie/keywords/${idFilm}`).then((r) => r.json())
  })
  return { movieKeyword, isLoadingMovieKeyword }
}

export function getTvShowKeyword(idTvShow) {
  const { isLoading: isLoadingTvShowKeyword, data: tvShowKeyword } = useQuery({
    queryKey: ['tvKeyword', idTvShow],
    queryFn: async () => fetch(`${API_URL}tv/keywords/${idTvShow}`).then((r) => r.json())
  })
  return { tvShowKeyword, isLoadingTvShowKeyword }
}

export function getMovieExternalId(idFilm) {
  const { isLoading: isLoadingMovieExternalId, data: movieExternalId } = useQuery({
    queryKey: ['movieExternalId', idFilm],
    queryFn: async () => fetch(`${API_URL}movie/externalsid/${idFilm}`).then((r) => r.json())
  })
  return { movieExternalId, isLoadingMovieExternalId }
}

export function getTvShowExternalId(idTvShow) {
  const { isLoading: isLoadingTvShowExternalId, data: tvShowExternalId } = useQuery({
    queryKey: ['tvShowExternalId', idTvShow],
    queryFn: async () => fetch(`${API_URL}tv/externalsid/${idTvShow}`).then((r) => r.json())
  })
  return { tvShowExternalId, isLoadingTvShowExternalId }
}

export function getMovieRecommendations(idFilm) {
  const { isLoading: isLoadingMovieRecommendations, data: movieRecommendations } = useQuery({
    queryKey: ['movieRecommendations', idFilm],
    queryFn: async () => fetch(`${API_URL}movie/recommendations/${idFilm}`).then((r) => r.json())
  })
  return { movieRecommendations, isLoadingMovieRecommendations }
}
export function getTvShowRecommendations(idTvShow) {
  const { isLoading: isLoadingTvShowRecommendations, data: tvShowRecommendations } = useQuery({
    queryKey: ['tvShowRecommendations', idTvShow],
    queryFn: async () => fetch(`${API_URL}tv/recommendations/${idTvShow}`).then((r) => r.json())
  })
  return { tvShowRecommendations, isLoadingTvShowRecommendations }
}

export function useSearchMulti(query) {
  const { isLoading: isLoadingSearchMulti, data: resultSearchQuery } = useQuery({
    queryKey: ['searchMulti', query],
    queryFn: async () => fetch(`${API_URL}search/multi/${query}`).then((r) => r.json())
  })
  return { resultSearchQuery, isLoadingSearchMulti }
}

export function getTrending() {
  const {
    isLoading: isLoadingTrending,
    data: resultTrending,
    hasNextPage: hasNextPageTrending,
    isFetchingNextPage: isFetchingNextPageTrending,
    fetchNextPage: fetchNextPageTrending
  } = useInfiniteQuery({
    queryKey: ['trending'],
    queryFn: async ({ pageParam = 1 }) => fetch(`${API_URL}trending/all/week/${pageParam}`).then((r) => r.json()),
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
    cacheTime: 0
  })
  return { resultTrending, isLoadingTrending, hasNextPageTrending, isFetchingNextPageTrending, fetchNextPageTrending }
}

export function getTrendingPerson() {
  const {
    isLoading: isLoadingTrendingPerson,
    data: resultTrendingPerson,
    hasNextPage: hasNextPageTrendingPerson,
    isFetchingNextPage: isFetchingNextPageTrendingPerson,
    fetchNextPage: fetchNextPageTrendingPerson
  } = useInfiniteQuery({
    queryKey: ['trendingPerson'],
    queryFn: async ({ pageParam = 1 }) => fetch(`${API_URL}trending/person/week/${pageParam}`).then((r) => r.json()),
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
    cacheTime: 0
  })
  return {
    resultTrendingPerson,
    isLoadingTrendingPerson,
    hasNextPageTrendingPerson,
    isFetchingNextPageTrendingPerson,
    fetchNextPageTrendingPerson
  }
}

export function getTvShowSeason(idTvShow, seasonNumber) {
  const { isLoading: isLoadingTvShowSeason, data: tvShowSeason } = useQuery({
    queryKey: ['tvShowSeason', idTvShow, seasonNumber],
    queryFn: async () => fetch(`${API_URL}tv/season/${idTvShow}/${seasonNumber}`).then((r) => r.json())
  })
  return { tvShowSeason, isLoadingTvShowSeason }
}

export function getAggregateCredits(idTvShow) {
  const { isLoading: isLoadingAggregateCredits, data: aggregateCredits } = useQuery({
    queryKey: ['aggregateCredits', idTvShow],
    queryFn: async () => fetch(`${API_URL}tv/aggregatecredits/${idTvShow}`).then((r) => r.json())
  })
  return { aggregateCredits, isLoadingAggregateCredits }
}

export function getPersonDetails(idPerson) {
  const { isLoading: isLoadingPersonDetails, data: personDetails } = useQuery({
    queryKey: ['personDetails]', idPerson],
    queryFn: async () => fetch(`${API_URL}person/details/${idPerson}`).then((r) => r.json())
  })
  return { personDetails, isLoadingPersonDetails }
}

export function getPersonCredits(idPerson) {
  const { isLoading: isLoadingPersonCredits, data: personCredits } = useQuery({
    queryKey: ['personCredits]', idPerson],
    queryFn: async () => fetch(`${API_URL}person/combinedcredits/${idPerson}`).then((r) => r.json())
  })
  return { personCredits, isLoadingPersonCredits }
}
export function getPersonExternalsCredits(idPerson) {
  const { isLoading: isLoadingPersonExternalsCredits, data: personExternalsCredits } = useQuery({
    queryKey: ['personExternalsCredits]', idPerson],
    queryFn: async () => fetch(`${API_URL}person/externalsid/${idPerson}`).then((r) => r.json())
  })
  return { personExternalsCredits, isLoadingPersonExternalsCredits }
}

export function getPopularMovies() {
  const {
    isLoading: isLoadingPopularMovies,
    data: resultPopularMovies,
    hasNextPage: hasNextPagePopularMovies,
    isFetchingNextPage: isFetchingNextPagePopularMovies,
    fetchNextPage: fetchNextPagePopularMovies
  } = useInfiniteQuery({
    queryKey: ['popularMovies'],
    queryFn: async ({ pageParam = 1 }) => fetch(`${API_URL}movie/popular/${pageParam}`).then((r) => r.json()),
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
    cacheTime: 0
  })
  return {
    resultPopularMovies,
    isLoadingPopularMovies,
    hasNextPagePopularMovies,
    isFetchingNextPagePopularMovies,
    fetchNextPagePopularMovies
  }
}

export function getPopularTvShows() {
  const {
    isLoading: isLoadingPopularTvShows,
    data: resultPopularTvShows,
    hasNextPage: hasNextPagePopularTvShows,
    isFetchingNextPage: isFetchingNextPagePopularTvShows,
    fetchNextPage: fetchNextPagePopularTvShows
  } = useInfiniteQuery({
    queryKey: ['popularTvShows'],
    queryFn: async ({ pageParam = 1 }) => fetch(`${API_URL}tv/popular/${pageParam}`).then((r) => r.json()),
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
    cacheTime: 0
  })
  return {
    resultPopularTvShows,
    isLoadingPopularTvShows,
    hasNextPagePopularTvShows,
    isFetchingNextPagePopularTvShows,
    fetchNextPagePopularTvShows
  }
}

export function getMovieGenres() {
  const { isLoading: isLoadingMovieGenres, data: movieGenres } = useQuery({
    queryKey: ['movieGenres]'],
    queryFn: async () => fetch(`${API_URL}genre/movie`).then((r) => r.json())
  })
  return { movieGenres, isLoadingMovieGenres }
}

export function getTvShowGenres() {
  const { isLoading: isLoadingTvShowGenres, data: tvShowGenres } = useQuery({
    queryKey: ['tvShowGenres]'],
    queryFn: async () => fetch(`${API_URL}genre/tv`).then((r) => r.json())
  })
  return { tvShowGenres, isLoadingTvShowGenres }
}
