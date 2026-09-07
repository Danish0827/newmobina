/**
 * Hero carousel data.
 *
 * Every slide is a *pair*: the carousel renders `before` as the slide itself,
 * and the showcase frame around the active slide reveals the matching `after`.
 * The pairing is positional — `transformations[activeIndex]` drives both — so a
 * new case is added by appending one object here and dropping two files into
 * `public/images/hero/`. Nothing else needs to change.
 */
export type Transformation = {
  id: number;
  /** Patient-facing label for the case, used in the slide's accessible name. */
  name: string;
  before: string;
  after: string;
  /** Clinical summary rendered in the showcase meta row, as in the comp. */
  meta: {
    norwoodScale: string;
    norwoodAchieved: string;
    graftCount: string;
    timeFrame: string;
  };
};

export const transformations: Transformation[] = [
  {
    id: 1,
    name: "Case 01",
    before: "/images/hero/1before.webp",
    after: "/images/hero/1after.webp",
    meta: {
      norwoodScale: "5",
      norwoodAchieved: "1",
      graftCount: "3,400",
      timeFrame: "9 Months",
    },
  },
  {
    id: 2,
    name: "Case 02",
    before: "/images/hero/2before.webp",
    after: "/images/hero/2after.webp",
    meta: {
      norwoodScale: "6",
      norwoodAchieved: "2",
      graftCount: "4,800",
      timeFrame: "10 Months",
    },
  },
  {
    id: 3,
    name: "Case 03",
    before: "/images/hero/3before.webp",
    after: "/images/hero/3after.webp",
    meta: {
      norwoodScale: "7",
      norwoodAchieved: "1",
      graftCount: "7,000",
      timeFrame: "12 Months",
    },
  },
  {
    id: 4,
    name: "Case 04",
    before: "/images/hero/4before.webp",
    after: "/images/hero/4after.webp",
    meta: {
      norwoodScale: "4",
      norwoodAchieved: "1",
      graftCount: "2,600",
      timeFrame: "8 Months",
    },
  },
  {
    id: 5,
    name: "Case 05",
    before: "/images/hero/5before.webp",
    after: "/images/hero/5after.webp",
    meta: {
      norwoodScale: "6",
      norwoodAchieved: "1",
      graftCount: "5,200",
      timeFrame: "11 Months",
    },
  },
  {
    id: 6,
    name: "Case 06",
    before: "/images/hero/6before.webp",
    after: "/images/hero/6after.webp",
    meta: {
      norwoodScale: "5",
      norwoodAchieved: "2",
      graftCount: "3,900",
      timeFrame: "9 Months",
    },
  },
  {
    id: 7,
    name: "Case 07",
    before: "/images/hero/7before.webp",
    after: "/images/hero/7after.webp",
    meta: {
      norwoodScale: "3",
      norwoodAchieved: "1",
      graftCount: "2,100",
      timeFrame: "7 Months",
    },
  },
];
