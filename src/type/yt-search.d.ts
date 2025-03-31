declare module 'yt-search' {
    interface Video {
        title: string;
        url: string;
        timestamp: string;
        ago: string;
        views: number;
        author: { name: string };
    }

    interface SearchResult {
        videos: Video[];
        playlists: any[];
        accounts: any[];
    }

    function search(query: string): Promise<SearchResult>;

    const ytSearch: {
        search: typeof search;
    };
    
    export default ytSearch;
}
