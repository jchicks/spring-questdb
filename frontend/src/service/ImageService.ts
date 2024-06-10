
export interface PhotoProps {
  album: string;
  name: string;
  width: number;
  height: number;
  category: string[];
}

export interface GalleryPhotoProps {
  src: string;
  width: number;
  height: number;
  category: string[];
  categorySet: Set<string>;
  slugSet: Set<string>;
  // srcSet: GalleryPhotoPropsSrcSet[];
}

export interface GalleryPhotoPropsSrcSet {
  src: string;
  width: number;
  height: number;
}

// const UNSPLASH_PHOTOS: PhotoProps[] = [
//   { id: "8gVv6nxq6gY", width: 1080, height: 800, category: ["All", "Business"] },
//   { id: "Dhmn6ete6g8", width: 1080, height: 1620, category: ["All", "Life Style"] },
//   { id: "RkBTPqPEGDo", width: 1080, height: 720, category: ["All", "Entertaimment"] },
//   { id: "Yizrl9N_eDA", width: 1080, height: 721, category: ["All", "Technology"] },
//   { id: "KG3TyFi0iTU", width: 1080, height: 1620, category: ["All", "Other"] },
//   { id: "Jztmx9yqjBw", width: 1080, height: 607, category: ["All", "Business"] },
//   { id: "-heLWtuAN3c", width: 1080, height: 608, category: ["All", "Life Style"] },
//   { id: "xOigCUcFdA8", width: 1080, height: 720, category: ["All", "Entertaimment"] },
//   { id: "1azAjl8FTnU", width: 1080, height: 1549, category: ["All", "Technology"] },
//   { id: "ALrCdq-ui_Q", width: 1080, height: 720, category: ["All", "Other"] },
//   { id: "twukN12EN7c", width: 1080, height: 694, category: ["All", "Life Style"] },
//   { id: "9UjEyzA6pP4", width: 1080, height: 1620, category: ["All", "Entertaimment"] },
//   { id: "sEXGgun3ZiE", width: 1080, height: 720, category: ["All", "Technology"] },
//   { id: "S-cdwrx-YuQ", width: 1080, height: 1440, category: ["All", "Other"] },
//   { id: "q-motCAvPBM", width: 1080, height: 1620, category: ["All", "Life Style"] },
//   { id: "Xn4L310ztMU", width: 1080, height: 810, category: ["All", "Entertaimment"] },
//   { id: "iMchCC-3_fE", width: 1080, height: 610, category: ["All", "Technology"] },
//   { id: "X48pUOPKf7A", width: 1080, height: 160, category: ["All", "Other"] },
//   { id: "GbLS6YVXj0U", width: 1080, height: 810, category: ["All", "Life Style"] },
//   { id: "9CRd1J1rEOM", width: 1080, height: 720, category: ["All", "Business"] },
//   { id: "xKhtkhc9HbQ", width: 1080, height: 1440, category: ["All", "Other"] },
// ];

const BREAKPOINTS: number[] = [1080, 640, 384, 256, 128, 96, 64, 48];

class ImageServiceImpl {

  photoCache: GalleryPhotoProps[] = [];
  tagsCache: string[] = [];

  private unsplashLink(name: string): string {
    // return `https://source.unsplash.com/${id}/${width}x${height}`;
    return `/api/albums/image?name=${name}`;
  }

  async getList(albumName: string): Promise<PhotoProps[]> {
    const url = `/api/albums/list?name=${albumName}`;
    const pathList: string[] = await (await fetch(url)).json();

    return pathList.map(path => ({
      album: albumName,
      name: path,
      width: 1620,
      height: 1620,
      category: ["All", "Other"]
    }));
  }

  async getPhotos(): Promise<[ GalleryPhotoProps[], string[] ]> {
    const UNSPLASH_PHOTOS = await this.getList('jerry');

    return new Promise((resolve, reject) => {
      if (this.photoCache.length > 0 && this.tagsCache.length > 0) {
        resolve([this.photoCache, this.tagsCache]);
        return;
      }

      const tags = Array.from(
        new Set(
          UNSPLASH_PHOTOS
            .map(photoProps => photoProps.category)
            .flat())
      );

      const photos = UNSPLASH_PHOTOS.map((photo) => ({
        src: this.unsplashLink(photo.name),
        width: photo.width,
        height: photo.height,
        category: photo.category,
        categorySet: new Set(photo.category),
        slugSet: new Set<string>(photo.category.map(str => str.split(' ').join('-'))),
        // srcSet: BREAKPOINTS.map((breakpoint) => {
        //   const height = Math.round((photo.height / photo.width) * breakpoint);
        //   return {
        //     src: this.unsplashLink(photo.id, breakpoint, height),
        //     width: breakpoint,
        //     height,
        //   };
        // }),
      }));

      console.debug("photos & tags", photos);

      this.photoCache = photos;
      this.tagsCache = tags;

      resolve([photos, tags]);
    });
  }

  async filter(category: string | undefined): Promise<GalleryPhotoProps[]> {
    const [photoCache, tags] = await this.getPhotos();

    if (category === undefined)
      return photoCache;

    return photoCache.filter(photo => photo.slugSet.has(category));
  }
}

export const ImageService = new ImageServiceImpl();