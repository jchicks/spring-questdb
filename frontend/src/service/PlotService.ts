

class PlotServiceImpl {

  async fetch(start: Date, end: Date, threshold: number): Promise<[Date,number][]> {
    const baseUrl = window.location.origin + '/api/plot';
    const url = new URL(baseUrl);
    const searchParams = new URLSearchParams();

    if (start !== undefined) {
      searchParams.append("start", start.toISOString());
    }
    if (end !== undefined) {
      searchParams.append("end", end.toISOString());
    }
    if (threshold !== undefined) {
      searchParams.append("threshold", Number(threshold).toString());
    }

    url.search = searchParams.toString();

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json() as [number, number][];

      return data.map(([x,y]) => [new Date(x), y]);
    }
    catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  }
}

export const PlotService: PlotServiceImpl = new PlotServiceImpl();