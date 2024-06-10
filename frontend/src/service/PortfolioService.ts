
function slugify(text: {toString(): string}) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export interface PortfolioInfo {
  id: number;
  type: string;
  image: string;
  title: string;
  excerpt: string;
  videoUrl?:string;
  categories: string[];
  client: string;
  date: string;
  team: string;
  services: string;
  body: string[];
  pageUrl: PageUrlInfo;
  gallery: GalleryInfo;
}

export interface GalleryInfo {
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  imageFour: string;
  imageFive: string;
}

export interface PageUrlInfo {
  text: string;
  link: string;
}


export const PORTFOLIO_DATA_NAME: PortfolioInfo[] = [
  {
    id: 1,
    type: "image",
    image: "img/portfolio/portfolio-1.jpg",
    title: "Daniel Raclift",
    excerpt: "Mango Fashion Lookbook Campaign",
    categories: ["featured", "new added"],
    client: "Archo Architecture <br />Bureau, SG",
    date: "September 25th <br />2020",
    team: "Nindia H. - Editor <br />Kate E. - Photographer",
    services: "Natural, Studio, Commercial, <br />Portrait",
    body: [
      "<p>Updated portraits of all Instrument employees for the new Instrument site. A unified look and background allows photos to mesh seamlessly online. To see it live check out:</p>",
      ""
    ],
    pageUrl: {
      text: "https://yourwebsite.com",
      link: "/"
    },
    gallery: {
      imageOne: "./img/portfolio/s1.jpg",
      imageTwo: "./img/portfolio/s2.jpg",
      imageThree: "./img/portfolio/s3.jpg",
      imageFour: "./img/portfolio/sv1.jpg",
      imageFive: "./img/portfolio/s4.jpg"
    }
  },
  {
    id: 2,
    type: "image",
    image: "img/portfolio/portfolio-2.jpg",
    title: "Designer Linocut",
    excerpt: "Mango Fashion Lookbook Campaign",
    categories: ["popular", "nature"],
    client: "Archo Architecture <br />Bureau, SG",
    date: "September 25th <br />2020",
    team: "Nindia H. - Editor <br />Kate E. - Photographer",
    services: "Natural, Studio, Commercial, <br />Portrait",
    body: [
      "<p>Updated portraits of all Instrument employees for the new Instrument site. A unified look and background allows photos to mesh seamlessly online. To see it live check out:</p>",
      ""
    ],
    pageUrl: {
      text: "https://yourwebsite.com",
      link: "/"
    },
    gallery: {
      imageOne: "./img/portfolio/s1.jpg",
      imageTwo: "./img/portfolio/s2.jpg",
      imageThree: "./img/portfolio/s3.jpg",
      imageFour: "./img/portfolio/sv1.jpg",
      imageFive: "./img/portfolio/s4.jpg"
    }
  },
  {
    id: 3,
    type: "video",
    image: "img/portfolio/portfolio-3.jpg",
    videoUrl: "https://www.youtube.com/embed/KzhSW1Ztq1w",
    title: "Designer Collagraph",
    excerpt: "Mango Fashion Lookbook Campaign",
    categories: ["background", "old"],
    client: "Archo Architecture <br />Bureau, SG",
    date: "September 25th <br />2020",
    team: "Nindia H. - Editor <br />Kate E. - Photographer",
    services: "Natural, Studio, Commercial, <br />Portrait",
    body: [
      "<p>Updated portraits of all Instrument employees for the new Instrument site. A unified look and background allows photos to mesh seamlessly online. To see it live check out:</p>",
      ""
    ],
    pageUrl: {
      text: "https://yourwebsite.com",
      link: "/"
    },
    gallery: {
      imageOne: "./img/portfolio/s1.jpg",
      imageTwo: "./img/portfolio/s2.jpg",
      imageThree: "./img/portfolio/s3.jpg",
      imageFour: "./img/portfolio/sv1.jpg",
      imageFive: "./img/portfolio/s4.jpg"
    }
  },
  {
    id: 4,
    type: "image",
    image: "img/portfolio/portfolio-4.jpg",
    title: "Designer Engraving",
    excerpt: "Mango Fashion Lookbook Campaign",
    categories: ["sport", "design"],
    client: "Archo Architecture <br />Bureau, SG",
    date: "September 25th <br />2020",
    team: "Nindia H. - Editor <br />Kate E. - Photographer",
    services: "Natural, Studio, Commercial, <br />Portrait",
    body: [
      "<p>Updated portraits of all Instrument employees for the new Instrument site. A unified look and background allows photos to mesh seamlessly online. To see it live check out:</p>",
      ""
    ],
    pageUrl: {
      text: "https://yourwebsite.com",
      link: "/"
    },
    gallery: {
      imageOne: "./img/portfolio/s1.jpg",
      imageTwo: "./img/portfolio/s2.jpg",
      imageThree: "./img/portfolio/s3.jpg",
      imageFour: "./img/portfolio/sv1.jpg",
      imageFive: "./img/portfolio/s4.jpg"
    }
  },
  {
    id: 5,
    type: "image",
    image: "img/portfolio/portfolio-5.jpg",
    title: "Working Remotely",
    excerpt: "Mango Fashion Lookbook Campaign",
    categories: ["human", "cities"],
    client: "Archo Architecture <br />Bureau, SG",
    date: "September 25th <br />2020",
    team: "Nindia H. - Editor <br />Kate E. - Photographer",
    services: "Natural, Studio, Commercial, <br />Portrait",
    body: [
      "<p>Updated portraits of all Instrument employees for the new Instrument site. A unified look and background allows photos to mesh seamlessly online. To see it live check out:</p>",
      ""
    ],
    pageUrl: {
      text: "https://yourwebsite.com",
      link: "/"
    },
    gallery: {
      imageOne: "./img/portfolio/s1.jpg",
      imageTwo: "./img/portfolio/s2.jpg",
      imageThree: "./img/portfolio/s3.jpg",
      imageFour: "./img/portfolio/sv1.jpg",
      imageFive: "./img/portfolio/s4.jpg"
    }
  },
  {
    id: 6,
    type: "image",
    image: "img/portfolio/portfolio-7.jpg",
    title: "White Paper",
    excerpt: "Mango Fashion Lookbook Campaign",
    categories: ["colors", "products"],
    client: "Archo Architecture <br />Bureau, SG",
    date: "September 25th <br />2020",
    team: "Nindia H. - Editor <br />Kate E. - Photographer",
    services: "Natural, Studio, Commercial, <br />Portrait",
    body: [
      "<p>Updated portraits of all Instrument employees for the new Instrument site. A unified look and background allows photos to mesh seamlessly online. To see it live check out:</p>",
      ""
    ],
    pageUrl: {
      text: "https://yourwebsite.com",
      link: "/"
    },
    gallery: {
      imageOne: "./img/portfolio/s1.jpg",
      imageTwo: "./img/portfolio/s2.jpg",
      imageThree: "./img/portfolio/s3.jpg",
      imageFour: "./img/portfolio/sv1.jpg",
      imageFive: "./img/portfolio/s4.jpg"
    }
  },
  {
    id: 7,
    type: "image",
    image: "img/portfolio/portfolio-8.jpg",
    title: "Connect Online",
    excerpt: "Mango Fashion Lookbook Campaign",
    categories: ["featured", "new added"],
    client: "Archo Architecture <br />Bureau, SG",
    date: "September 25th <br />2020",
    team: "Nindia H. - Editor <br />Kate E. - Photographer",
    services: "Natural, Studio, Commercial, <br />Portrait",
    body: [
      "<p>Updated portraits of all Instrument employees for the new Instrument site. A unified look and background allows photos to mesh seamlessly online. To see it live check out:</p>",
      ""
    ],
    pageUrl: {
      text: "https://yourwebsite.com",
      link: "/"
    },
    gallery: {
      imageOne: "./img/portfolio/s1.jpg",
      imageTwo: "./img/portfolio/s2.jpg",
      imageThree: "./img/portfolio/s3.jpg",
      imageFour: "./img/portfolio/sv1.jpg",
      imageFive: "./img/portfolio/s4.jpg"
    }
  },
  {
    id: 8,
    type: "image",
    image: "img/portfolio/portfolio-6.jpg",
    title: "Dog With Fun",
    excerpt: "Mango Fashion Lookbook Campaign",
    categories: ["popular", "nature"],
    client: "Archo Architecture <br />Bureau, SG",
    date: "September 25th <br />2020",
    team: "Nindia H. - Editor <br />Kate E. - Photographer",
    services: "Natural, Studio, Commercial, <br />Portrait",
    body: [
      "<p>Updated portraits of all Instrument employees for the new Instrument site. A unified look and background allows photos to mesh seamlessly online. To see it live check out:</p>",
      ""
    ],
    pageUrl: {
      text: "https://yourwebsite.com",
      link: "/"
    },
    gallery: {
      imageOne: "./img/portfolio/s1.jpg",
      imageTwo: "./img/portfolio/s2.jpg",
      imageThree: "./img/portfolio/s3.jpg",
      imageFour: "./img/portfolio/sv1.jpg",
      imageFive: "./img/portfolio/s4.jpg"
    }
  },
  {
    id: 9,
    type: "image",
    image: "img/portfolio/portfolio-9.jpg",
    title: "Salfe Made",
    excerpt: "Mango Fashion Lookbook Campaign",
    categories: ["background", "old"],
    client: "Archo Architecture <br />Bureau, SG",
    date: "September 25th <br />2020",
    team: "Nindia H. - Editor <br />Kate E. - Photographer",
    services: "Natural, Studio, Commercial, <br />Portrait",
    body: [
      "<p>Updated portraits of all Instrument employees for the new Instrument site. A unified look and background allows photos to mesh seamlessly online. To see it live check out:</p>",
      ""
    ],
    pageUrl: {
      text: "https://yourwebsite.com",
      link: "/"
    },
    gallery: {
      imageOne: "./img/portfolio/s1.jpg",
      imageTwo: "./img/portfolio/s2.jpg",
      imageThree: "./img/portfolio/s3.jpg",
      imageFour: "./img/portfolio/sv1.jpg",
      imageFive: "./img/portfolio/s4.jpg"
    }
  }
];

export interface PortfolioSummary {
  title: string;
  slug: string;
}

class PortfolioServiceImpl {

  async fetch(): Promise<PortfolioInfo[]> {
    return new Promise((resolve, reject) => {
      resolve(PORTFOLIO_DATA_NAME);
    });
  }

  async getPhotos(): Promise<PortfolioSummary[]> {
    const data = await this.fetch();

    const tags = Array.from(
      new Set(
        data
          .map(portfolioInfo => portfolioInfo.categories)
          .flat()
      )
    );

    return tags.map(val => ({
      title: val,
      slug: slugify(val)
    }));
  }
}

export const PortfolioService = new PortfolioServiceImpl();