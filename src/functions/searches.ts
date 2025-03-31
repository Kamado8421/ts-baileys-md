import ytSearch from 'yt-search';

export type VideoDataType = {
    title: string;
    url: string;
    timestamp: string;
    ago: string;
    views: number;
    author: { name: string };
}

async function searchYouTube(query: string): Promise<VideoDataType | undefined> {
    const result = await ytSearch.search(query);

    if (result.videos.length > 0) {
        return result.videos[0]
    } else {
        return undefined;
    }
}

export { searchYouTube };
